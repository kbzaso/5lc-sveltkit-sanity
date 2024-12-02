import type { RequestHandler } from "./$types";
import { client } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import {
  VITE_SANITY_API_WRITE_TOKEN as tokenWithWriteAccess,
  RESEND_API_KEY,
  SLACK_WEBHOOK_URL,
} from "$env/static/private";
import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { Resend } from "resend";
import groq from "groq";
import { LocaleConfig } from "$lib/utils";
import { VENUE } from "$lib/const";
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
      `${import.meta.env.VITE_PAYKU_API_URL}/transaction/${payment_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_TOKEN_PAYKU}`,
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

    const eventId = result?.payment?.additional_parameters?.event_id || "";
    const Query = groq`
        *[_type == "event" && _id == $merchantOrderId && active == true]{
          _id,
          slug,
          ticket,
          total_tickets,
          venue,
          sell_type,
        }
      `;
    const nextEvent = await getSanityServerClient(false).fetch(Query, {
      merchantOrderId: eventId,
    });

    // variable para saber cuantas entradas quedan y que se envia en la notificación de slack
    let ticketsRemaining = 0;

    let ticket = subtractObjects(
      nextEvent[0].sell_type === "ubication"
        ? nextEvent[0].ticket.ubication
        : nextEvent[0].ticket.batch,
      paymentWithProduct.buys
    );

    for (let key in ticket) {
      ticketsRemaining += ticket[key].amount;
    }

    const paymentsSold = await client.payment.aggregate({
      _sum: {
        ticketAmount: true,
      },
      where: {
        productId: eventId,
        payment_status: "success",
      },
    });

    if (result.status === "success") {
      // Enviamos email de confirmación
      (async function () {
        try {
          const data = await resend.emails.send({
            from: "5 Luchas Clandestino <hola@5luchas.cl>",
            to: paymentWithProduct.customer_email,
            // to: 'alejandro.saez@rendalomaq.com',
            subject: `✅ Tú adhesión para ${paymentWithProduct.product.name} fue existosa!`,
            html: `
            <p>Hola ${paymentWithProduct?.customer_name},</p>
  <p>¡Tu adhesión fue existosa!</p>
  <p>${paymentWithProduct?.ticketAmount} ${
              paymentWithProduct?.ticketAmount > 1 ? "entradas" : "entrada"
            } ${
              paymentWithProduct?.ticketsType !== "Tandas"
                ? paymentWithProduct?.ticketsType
                : ""
            } para ${paymentWithProduct?.product.name}.</p>
  <p>Nos vemos en ${
    nextEvent[0]?.venue?.venueName ? nextEvent[0]?.venue?.venueName : VENUE.NAME
  } | ${
              nextEvent[0]?.venue?.venueAdress
                ? nextEvent[0]?.venue?.venueAdress
                : VENUE.ADDRESS
            }</p>
  <p>Numero de orden: <strong>${
    paymentWithProduct?.client_id
  }</strong></p>
  <p><strong>5 Luchas Clandestino</strong></p>
              `,
            tags: [
              {
                name: "category",
                value: "confirm_email",
              },
            ],
          });
        } catch (e) {
          console.error(e);
          throw error(500, "El email no pudo ser enviado");
        }
      })();

      // MUTATION PARA ACTUALIZAR EL STOCK DEL STUDIO
      let mutations;
      if (nextEvent[0].sell_type === "ubication") {
        mutations = [
          {
            patch: {
              id: nextEvent[0]._id, // replace with your document ID
              set: {
                ticket: {
                  ubication: ticket,
                },
              },
            },
          },
        ];
      } else {
        mutations = [
          {
            patch: {
              id: nextEvent[0]._id, // replace with your document ID
              set: {
                ticket: {
                  batch: ticket,
                },
              },
            },
          },
        ];
      }
      // Actualizamos el stock en sanity
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

    // Enviamos notificacion a slack
    const message = {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Se ha realizado una adhesión* 🔥",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Comprador: ${paymentWithProduct.customer_name}\nEmail: ${paymentWithProduct.customer_email}\nTeléfono: ${paymentWithProduct.customer_phone}`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Entradas: ${paymentWithProduct.ticketAmount} ${
              paymentWithProduct.ticketsType !== "Tandas"
                ? `${paymentWithProduct.ticketsType}`
                : ""
            }\nPrecio: $${paymentWithProduct.price}\nEvento: ${
              paymentWithProduct.product.name
            }\n${
              paymentWithProduct.discount_code
                ? `Código: ${paymentWithProduct.discount_code}`
                : ""
            }`,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Tickets vendidos:*\n${paymentsSold._sum.ticketAmount}`,
            },
            {
              type: "mrkdwn",
              text: `*Tickets por vender:*\n${ticketsRemaining}`,
            },
          ],
        },
      ],
    };

    await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (e) {
    console.error(e);
    throw error(500, "El pago no pudo ser actualizado");
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
};
