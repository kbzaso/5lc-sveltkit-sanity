import type { RequestHandler } from "./$types";
import { client } from "$lib/server/prisma";
import { Buffer } from "buffer";
import jwt from "jsonwebtoken";
import { error } from "@sveltejs/kit";
import {
  VITE_SANITY_API_WRITE_TOKEN as tokenWithWriteAccess,
  RESEND_API_KEY,
} from "$env/static/private";
import { PUBLIC_TOKEN_PAYKU } from "$env/static/public";
import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { Resend } from "resend";
import groq from "groq";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const datasetName = import.meta.env.VITE_SANITY_DATASET;

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
  const body = await event.request.json();

  const payment_id = body.payment_key;

  const Query = groq`
  *[_type == "event" && _id == $merchantOrderId && active == true]{
    _id,
    slug,
    ticket,
    total_tickets,
  }
`;

  const prePayment = await client.payment.findUnique({
    where: {
      payment_id_service: payment_id,
    },
  });

  if (!prePayment) {
    throw error(500, "El pago no fue encontrado");
  }

  try {
    const response = await fetch(
      `https://app.payku.cl/api/transaction/${payment_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PUBLIC_TOKEN_PAYKU}`,
        },
      }
    );
    const result = await response.json();

    const paymentWithProduct = await client.payment.update({
      where: {
        payment_id_service: payment_id,
      },
      data: {
        payment_status: result.status,
      },
      include: {
        product: true, // Include the related product
      },
    });

    const nextEvent = await getSanityServerClient(false).fetch(Query, {
      merchantOrderId: result.payment.additional_parameters.event_id,
    });

    let ticket = subtractObjects(nextEvent[0].ticket, paymentWithProduct.buys);

    // MUTATION PARA ACTUALIZAR EL STOCK DEL STUDIO
    if (result.status === "success") {

      // Enviamos email de confirmación
      (async function () {
        try {
          const data = await resend.emails.send({
            from: "5 Luchas Clandestino <hola@5luchas.cl>",
            to: paymentWithProduct.customer_email,
            // to: 'alejandro.saez@rendalomaq.com',
            subject: `✅ Tú adhesión para ${paymentWithProduct.product.name} fue existosa!`,
            html: `Hola ${paymentWithProduct.customer_name}, </br> ¡Tu adhesión fue existosa!, ${paymentWithProduct.ticketAmount} entradas para ${paymentWithProduct.product.name}. </br>Solo debes mecionar tu nombre, rut o email a los chiquillos de la puerta. </br></br>Nos vemos en la Bóveda Secreta - <strong>Siempre Buena Onda!</strong> </br></br>
            Tú numero de orden es ${paymentWithProduct.payment_id_service} (No se lo compartas a nadie, te lo pediremos al ingresar) </br></br> <strong>¡Gracias por tu apoyo!</strong> </br></br> <strong>5 Luchas Clandestino</strong>
            `,
            tags: [
              {
                name: "category",
                value: "confirm_email",
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      })();

      const mutations = [
        {
          patch: {
            id: nextEvent[0]._id, // replace with your document ID
            set: {
              ubication: ticket,
            },
          },
        },
      ];

      await fetch(
        `https://${projectId}.api.sanity.io/v2022-08-08/data/mutate/${datasetName}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${tokenWithWriteAccess}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          body: JSON.stringify({ mutations }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
  } catch (e) {
    throw error(500, "El pago no pudo ser actualizado");
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
};
