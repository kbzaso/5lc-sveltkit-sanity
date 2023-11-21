import type { RequestHandler } from "./$types";
import { client } from "$lib/server/prisma";
import { Buffer } from "buffer";
import jwt from "jsonwebtoken";
import { error } from "@sveltejs/kit";
import {
  VITE_SANITY_PROJECT_ID as projectId,
  VITE_SANITY_DATASET as datasetName,
  SANITY_API_WRITE_TOKEN as tokenWithWriteAccess,
  RESEND_API_KEY,
} from "$env/static/private";
import {
  nextEventQuery,
} from "$lib/config/sanity/queries";
import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

function subtractObjects(obj1, obj2) {
  let ticket = { ...obj1 }; // Copy obj1 to avoid modifying the original object

  for (let key in obj2) {
    if (ticket[key]) {
      ticket[key].amount -= obj2[key].amount;
    }
  }

  return ticket;
}

export const POST: RequestHandler = async (event) => {
  const nextEvent = await getSanityServerClient(false).fetch(nextEventQuery);
  const body = await event.request.json();
  const token = body.payment;

  const payloadBase64Url = token.split(".")[1];
  const payloadBase64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payloadJson = Buffer.from(payloadBase64, "base64").toString();
  const payload = JSON.parse(payloadJson);

  const prePayment = await client.payment.findUnique({
    where: {
      id: payload.session_token,
    },
  });

  if (!prePayment) {
    throw error(500, "El pago no fue encontrado");
  }

  try {
    const payloadDecoded = jwt.verify(token, prePayment.signature_token);
  } catch (e) {
    throw error(500, "JWT no valido");
  }

  try {
    const paymentWithProduct = await client.payment.update({
      where: {
        id: payload.session_token,
      },
      data: {
        payment_status: payload.payment_status,
        payment_token: payload.payment_token,
        rut: payload.user_rut,
      },
      include: {
        product: true, // Include the related product
      },
    });

    let ticket = subtractObjects(nextEvent.ticket, paymentWithProduct.buys);

    console.log(ticket, 'new tickets after mutation');

    // MUTATION PARA ACTUALIZAR EL STOCK DEL STUDIO
    if (paymentWithProduct.product && payload.payment_status === "success") {
      const mutations = [{
        patch: {
          id: nextEvent._id, // replace with your document ID
          set: {
            ticket: ticket,
          },
        },
      }];

      // Enviamos email de confirmación
      (async function () {
        try {
          const data = await resend.emails.send({
            from: 'Bovedin <delivered@resend.dev>',
            to: paymentWithProduct.customer_email,
            // to: 'alejandro.saez@rendalomaq.com',
            subject: 'Nos vemos en la Bóveda Secreta',
            html: `Hola ${paymentWithProduct.customer_name}, </br> Tu adhesión fue existosa, ${paymentWithProduct.ticketAmount} entradas para ${paymentWithProduct.product.name}. </br>Solo debes mecionar tu nombre y rut a los chiquillos de la puerta. </br></br> <strong>Siempre Buena Onda!</strong> `,
            tags: [
              {
                name: 'category',
                value: 'confirm_email',
              },
            ],
          });
      
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      })();
      
      fetch(`https://${projectId}.api.sanity.io/v2022-08-08/data/mutate/${datasetName}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${tokenWithWriteAccess}`
        },
        body: JSON.stringify({mutations})
      })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.error(error))

        
        
      }
    }
 catch (e) {
    throw error(500, "El pago no pudo ser actualizado");
  }

  return new Response("ok");
};
