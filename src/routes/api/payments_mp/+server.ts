import type { RequestHandler } from "./$types";
import { client } from "$lib/server/prisma";
import { Buffer } from "buffer";
import jwt from "jsonwebtoken";
import { error } from "@sveltejs/kit";
import {
  VITE_SANITY_API_WRITE_TOKEN as tokenWithWriteAccess,
  RESEND_API_KEY,
  ACCESS_TOKEN_MP,
} from "$env/static/private";
import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { Resend } from 'resend';
import groq from "groq";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const datasetName = import.meta.env.VITE_SANITY_DATASET;
import { MercadoPagoConfig, Payment } from 'mercadopago';


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

export const POST: RequestHandler = async ({ request }) => {
    
    const body = await request.json().then((data) => data as {data: {id: string}});
    
    const client_mp = new MercadoPagoConfig({
        accessToken: ACCESS_TOKEN_MP,
    });
    
    const payment = await new Payment(client_mp).get({id: body.data.id});

    console.log(payment, 'payment')

//   const payloadBase64Url = token.split(".")[1];
//   const payloadBase64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const payloadJson = Buffer.from(payloadBase64, "base64").toString();
//   const payload = JSON.parse(payloadJson);
//   console.log(payload)

  const Query = groq`
  *[_type == "event" && _id == $merchantOrderId && active == true]{
    _id,
    slug,
    ticket,
    total_tickets,
  }
`

// //   // const nextEvent = await getSanityServerClient(false).fetch(Query);
  const nextEvent = await getSanityServerClient(false).fetch(Query, {merchantOrderId: payment?.additional_info?.items[0]?.id});
  console.log(nextEvent[0], 'nextEvent')

  const prePayment = await client.payment.findUnique({
    where: {
      id: payment?.additional_info?.items[0]?.description,
    },
  });

  if (!prePayment) {
    throw error(500, "El pago no fue encontrado");
  }

  try {
    const paymentWithProduct = await client.payment.update({
      where: {
        id: payment?.additional_info?.items[0]?.description,
      },
      data: {
        payment_status: payment?.status,
        rut: payment?.payer?.identification?.number,
      },
      include: {
        product: true, // Include the related product
      },
    });
    console.log(paymentWithProduct, 'paymentWithProduct')

    let ticket = subtractObjects(nextEvent[0].ticket, paymentWithProduct.buys);
    console.log(ticket, 'ticket')
    // MUTATION PARA ACTUALIZAR EL STOCK DEL STUDIO
    if (payment?.status === "approved") {
      
        // Enviamos email de confirmación
        (async function () {
          try {
            const data = await resend.emails.send({
              from: '5 Luchas Clandestino <hola@5luchas.cl>',
              to: paymentWithProduct.customer_email,
              // to: 'alejandro.saez@rendalomaq.com',
              subject: `✅ Tú adhesión para ${paymentWithProduct.product.name} fue existosa!`,
              html: `Hola ${paymentWithProduct.customer_name}, </br> ¡Tu adhesión fue existosa!, ${paymentWithProduct.ticketAmount} entradas para ${paymentWithProduct.product.name}. </br>Solo debes mecionar tu nombre, rut o email a los chiquillos de la puerta. </br></br>Nos vemos en la Bóveda Secreta - <strong>Siempre Buena Onda!</strong> `,
              tags: [
                {
                  name: 'category',
                  value: 'confirm_email',
                },
              ],
            });
          } catch (error) {
            console.error(error);
          }
        })();
      
      const mutations = [{
        patch: {
          id: nextEvent[0]._id, // replace with your document ID
          set: {
            ticket: ticket,
          },
        },
      }];

      console.log(mutations, 'mutations')

      await fetch(`https://${projectId}.api.sanity.io/v2022-08-08/data/mutate/${datasetName}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${tokenWithWriteAccess}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({mutations})
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(result => console.log(result))
        .catch(error => console.error(error))
      }

    }
 catch (e) {
    throw error(500, "El pago no pudo ser actualizado");
  }

  return new Response("ok");
};
