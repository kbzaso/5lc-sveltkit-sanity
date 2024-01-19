import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { eventQuery, welcomeQuery } from "$lib/config/sanity/queries";
import type { Event } from "$lib/types";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import {
  API_URL,
  PMT_URL,
  MERCHANT_CODE,
  MERCHANT_API_TOKEN,
  PAYMENT_COMPLETED_URL,
  PAYMENT_CANCELLATION_URL,
  PAYMENT_WEBHOOK_URL,
  API_KEY_DL,
  SECRET_KEY_DL,
  URL_DL,
} from "$env/static/private";
import { client } from "$lib/server/prisma";
import { calculatePrice } from "$lib/utils/eventUtils";

export const load: PageServerLoad = async ({ parent, params }) => {
  const { previewMode } = await parent();
  const welcome = await getSanityServerClient(false).fetch(welcomeQuery);

  let { event, moreEvents } = await getSanityServerClient(previewMode).fetch<{
    event: Event;
    moreEvents: Event[];
  }>(eventQuery, {
    slug: params.slug,
  });

  if (!event) {
    throw error(
      404,
      "El evento que estas buscando no existe o no esta disponible"
    );
  } else {
    const ticketsSold = await client.payment.aggregate({
      where: {
        payment_status: "success",
        AND: [
          {
            productId: event._id,
          },
        ],
      },
      _sum: {
        ticketAmount: true,
      },
    });

    let ticketsSoldCount = ticketsSold._sum?.ticketAmount || 0;
    // ================================

    const partsOrder = ["firsts_tickets", "seconds_tickets", "thirds_tickets"];
    const ticketSystem = {
      firsts_tickets: {
        amount: event?.ticket?.firsts_tickets?.amount,
        price: event?.ticket?.firsts_tickets?.price,
      },
      seconds_tickets: {
        amount: event?.ticket?.seconds_tickets?.amount,
        price: event?.ticket?.seconds_tickets?.price,
      },
      thirds_tickets: {
        amount: event?.ticket?.thirds_tickets?.amount,
        price: event?.ticket?.thirds_tickets?.price,
      },
    };

    // Suma de tickets que quedan en el Studio
    const totalTicketsLeftStudio =
      event?.ticket?.firsts_tickets?.amount +
      event?.ticket?.seconds_tickets?.amount +
      event?.ticket?.thirds_tickets?.amount;
    // Suma de tickets que quedan en el Studio + los que se han vendido
    const totalTickets = totalTicketsLeftStudio + ticketsSoldCount;

    let remainingTickets = {};

    // Recalculate the ticket object
    for (let i = 0; i < partsOrder.length; i++) {
      let part = partsOrder[i];

      if (ticketsSoldCount >= ticketSystem[part].amount) {
        ticketsSoldCount -= ticketSystem[part].amount;
        ticketSystem[part].amount = 0;
      } else {
        ticketSystem[part].amount -= ticketsSoldCount;
        ticketsSoldCount = 0;
      }

      remainingTickets[part] = {
        amount: ticketSystem[part].amount,
        price: ticketSystem[part].price,
      };
    }

    event = {
      ...event,
      tickets_sold: ticketsSold._sum?.ticketAmount || 0,
      total_tickets: totalTickets,
    };
  }

  if (!welcome) {
    throw error(500, "Settings not found");
  }

  return {
    welcome,
    previewMode,
    slug: event?.slug || params.slug,
    initialData: {
      event,
      moreEvents: overlayDrafts(moreEvents),
    },
  };
};

export const actions: Actions = {
  pay_dlocalgo: async ({ params, request }) => {
    console.log("pay_dlocalgo");
    let { event } = await getSanityServerClient(false).fetch<{
      event: Event;
    }>(eventQuery, {
      slug: params.slug,
    });

    const form = await request.formData();
    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString();
    const phone = form.get("phone")?.toString();
    const payment_method = form.get("dlocalgo")?.toString();
    const tickets = Number(form.get("tickets"));

    if (!payment_method) {
      error(404, {
        message: "Debes seleccionar un método de pago",
      });
    }

    const totalTicketsLeftStudio =
      event.ticket.firsts_tickets.amount +
      event.ticket.seconds_tickets.amount +
      event.ticket.thirds_tickets.amount;
    const ticketsSold = await client.payment.aggregate({
      where: {
        payment_status: "success",
        AND: [
          {
            productId: event._id,
          },
        ],
      },
      _sum: {
        ticketAmount: true,
      },
    });

    const total_tickets =
      totalTicketsLeftStudio + (ticketsSold._sum?.ticketAmount || 0);

    const priceTotal = calculatePrice(tickets, event.ticket);

    const product = await client.product.upsert({
      where: {
        id: event._id,
      },
      update: {
        name: event.title,
        stock: total_tickets,
        date: event.date,
      },
      create: {
        id: event._id,
        name: event.title,
        stock: total_tickets,
        date: event.date,
      },
    });

    // Define the headers
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY_DL}:${SECRET_KEY_DL}`,
    };

    // Define the payload
    let payload = {
      amount: priceTotal.totalCost,
      currency: "CLP",
      country: "CL",
      success_url:
        "https://dd73-2800-150-10e-326-3c01-673e-6c5d-1f93.ngrok-free.app/exito",
      back_url:
        "https://dd73-2800-150-10e-326-3c01-673e-6c5d-1f93.ngrok-free.app",
      notification_url:
        "https://dd73-2800-150-10e-326-3c01-673e-6c5d-1f93.ngrok-free.app/api/payments_dlocalgo",
      expiration_type: "HOURS",
      expiration_value: "1",
      description: `${tickets} entradas para ${event.title}`,
      // Add other required fields here
    };

    let dataUrlRedirect = "";

    // Make the POST request
    const data = await fetch(URL_DL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Crea un pago
        dataUrlRedirect = data.redirect_url;
        const newPayment = async () => await client.payment.create({
          data: {
            customer_name: name as string,
            customer_email: email as string,
            customer_phone: phone as string,
            payment_status: data.status,
            ticketAmount: tickets,
            price: priceTotal.totalCost,
            buys: priceTotal.ticket,
            payment_method: payment_method,
            payment_id_dlocalgo: data.id,
            product: {
              connect: {
                id: event._id,
              },
            },
          },
        });
        newPayment();
      })
      .catch((error) => console.error("Error:", error));

      throw redirect(302, dataUrlRedirect);
  },
  pay: async ({ params, request }) => {
    let { event } = await getSanityServerClient(false).fetch<{
      event: Event;
    }>(eventQuery, {
      slug: params.slug,
    });

    const totalTicketsLeftStudio =
      event.ticket.firsts_tickets.amount +
      event.ticket.seconds_tickets.amount +
      event.ticket.thirds_tickets.amount;
    const ticketsSold = await client.payment.aggregate({
      where: {
        payment_status: "success",
        AND: [
          {
            productId: event._id,
          },
        ],
      },
      _sum: {
        ticketAmount: true,
      },
    });

    const total_tickets =
      totalTicketsLeftStudio + (ticketsSold._sum?.ticketAmount || 0);

    const form = await request.formData();
    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString();
    const phone = form.get("phone")?.toString();
    const tickets = Number(form.get("tickets"));
    const payment_method = form.get("etpay")?.toString();

    if (!payment_method) {
      error(404, {
        message: "Debes seleccionar un método de pago",
      });
    }

    let resp;

    // ESTA TOMANDO EL VALOR ORIGINAL DEL EVENTO, SE NECESITA EL VALOR ACTUALIZADO
    const priceTotal = calculatePrice(tickets, event.ticket);

    // Data que se envia a ET_PAY
    let request_data = {
      merchant_code: MERCHANT_CODE,
      merchant_api_token: MERCHANT_API_TOKEN,
      merchant_order_id: event._id,
      order_amount: priceTotal.totalCost,
      customer_email: email,
      payment_completed_url: PAYMENT_COMPLETED_URL,
      payment_cancellation_url: PAYMENT_CANCELLATION_URL,
      payment_webhook_url: PAYMENT_WEBHOOK_URL,
      metadata: [
        {
          name: `${tickets} entradas`,
          value: `${event.title} - ${
            event.boveda ? "Bóveda Secreta" : event.venue.venueName
          }`,
          show: true,
        },
      ],
    };

    try {
      const data = await fetch(`${API_URL}/session/initialize`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "[*]",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        }),
        body: JSON.stringify(request_data),
        redirect: "follow",
      });

      resp = await data.json();

      const product = await client.product.upsert({
        where: {
          id: event._id,
        },
        update: {
          name: event.title,
          stock: total_tickets,
          date: event.date,
        },
        create: {
          id: event._id,
          name: event.title,
          stock: total_tickets,
          date: event.date,
        },
      });

      const newPayment = await client.payment.create({
        data: {
          id: resp.token,
          customer_name: name as string,
          customer_email: email as string,
          customer_phone: phone as string,
          ticketAmount: tickets,
          price: priceTotal.totalCost,
          buys: priceTotal.ticket,
          signature_token: resp.signature_token,
          payment_method: payment_method,
          product: {
            connect: {
              id: event._id,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
    throw redirect(302, `${PMT_URL}/session/${resp.token}`);
  },
};
