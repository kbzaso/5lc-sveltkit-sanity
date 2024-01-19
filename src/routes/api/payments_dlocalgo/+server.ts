import type { RequestHandler } from "./$types";
import { client } from "$lib/server/prisma";
import { Buffer } from "buffer";
import jwt from "jsonwebtoken";
import { error } from "@sveltejs/kit";
import {
  VITE_SANITY_API_WRITE_TOKEN as tokenWithWriteAccess,
  RESEND_API_KEY,
  API_KEY_DL,
  SECRET_KEY_DL,
  URL_DL,
} from "$env/static/private";
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

  const payment_id = body.payment_id;

  const Query = groq`
  *[_type == "event" && _id == $merchantOrderId && active == true]{
    _id,
    slug,
    ticket,
    total_tickets,
  }
`;
  // URL A LA CUAL SE HACE LA PETICIÓN
  let url = `${URL_DL}${payment_id}`;

  // TRAIGO LA INFO DEL PAGO DESDE DLOCAL
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY_DL}:${SECRET_KEY_DL}`,
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      // BUSCO LA INFO DEL PAGO EN SUPABASE
      const prePayment = await client.payment.findUnique({
        where: {
          payment_id_dlocalgo: payment_id,
        },
      });

      if (!prePayment) {
        throw error(500, "El pago no fue encontrado");
      }

      try {
        const paymentWithProduct = await client.payment.update({
          where: {
            payment_id_dlocalgo: payment_id,
          },
          data: {
            payment_status: data.status === "PAID" ? "success" : "pending",
            // rut: payload.user_rut,
          },
          include: {
            product: true, // Include the related product
          },
        });

        const nextEvent = await getSanityServerClient(false).fetch(Query, {
          merchantOrderId: paymentWithProduct.productId,
        });

        let ticket = subtractObjects(
          nextEvent[0].ticket,
          paymentWithProduct.buys
        );

        // MUTATION PARA ACTUALIZAR EL STOCK DEL STUDIO
        if (data.status === "PAID") {
          // Enviamos email de confirmación
          (async function () {
            try {
              const data = await resend.emails.send({
                from: "5 Luchas Clandestino <hola@5luchas.cl>",
                to: paymentWithProduct.customer_email,
                // to: 'alejandro.saez@rendalomaq.com',
                subject: `✅ Tú adhesión para ${paymentWithProduct.product.name} fue existosa!`,
                html: `Hola ${paymentWithProduct.customer_name}, </br> ¡Tu adhesión fue existosa!, ${paymentWithProduct.ticketAmount} entradas para ${paymentWithProduct.product.name}. </br>Solo debes mecionar tu nombre, rut o email a los chiquillos de la puerta. </br></br>Nos vemos en la Bóveda Secreta - <strong>Siempre Buena Onda!</strong> `,
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
                  ticket: ticket,
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
    })
    .catch((error) => console.error("Error:", error));

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
};
