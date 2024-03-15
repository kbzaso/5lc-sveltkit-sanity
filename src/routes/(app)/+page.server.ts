import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import {
  settingsQuery,
  welcomeQuery,
  nextEventQuery,
  ActiveEventsQuery,
} from "$lib/config/sanity/queries";
import { error, json, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import {
  API_URL,
  PMT_URL,
  MERCHANT_CODE,
  MERCHANT_API_TOKEN,
  PAYMENT_COMPLETED_URL,
  PAYMENT_CANCELLATION_URL,
  PAYMENT_WEBHOOK_URL,
  PRIVATE_TOKEN_PAYKU,
  PAYMENT_WEBHOOK_URL_PAYKU,
} from "$env/static/private";
import { PUBLIC_TOKEN_PAYKU } from "$env/static/public";
import { client } from "$lib/server/prisma";
import { calculatePrice } from "$lib/utils/eventUtils";

// export const prerender = 'auto';
export const load: PageServerLoad = async () => {
  const settings = await getSanityServerClient(false).fetch(settingsQuery);
  const welcome = await getSanityServerClient(false).fetch(welcomeQuery);
  let nextEvent = await getSanityServerClient(false).fetch(nextEventQuery);
  let events = await getSanityServerClient(false).fetch(ActiveEventsQuery);

  // Valida si existe un solo evento
  if (events.length === 1) {
    const ticketsSold = await client.payment.aggregate({
      where: {
        payment_status: "success",
        AND: [
          {
            productId: nextEvent._id,
          },
        ],
      },
      _sum: {
        ticketAmount: true,
      },
    });

    // Suma de tickets que quedan en el Studio
    const totalTicketsLeftStudio =
      nextEvent?.ticket?.firsts_tickets?.amount +
      nextEvent?.ticket?.seconds_tickets?.amount +
      nextEvent?.ticket?.thirds_tickets?.amount;
    // Suma de tickets que quedan en el Studio + los que se han vendido

    const totalTickets =
      totalTicketsLeftStudio + ticketsSold._sum?.ticketAmount || 0;

    let ticketsSoldCount = ticketsSold._sum?.ticketAmount || 0;

    nextEvent.tickets_sold = ticketsSoldCount;
    nextEvent.total_tickets = totalTickets;
  }

  if (!settings) {
    throw error(500, "Settings not found");
  }
  if (!welcome) {
    throw error(500, "Settings not found");
  }

  return {
    events,
    settings,
    welcome,
    nextEvent,
  };
};

export const actions: Actions = {
  payku: async (event) => {
    const nextEvent = await getSanityServerClient(false).fetch(nextEventQuery);

    const form = await event.request.formData();
    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString();
    const phone = form.get("phone")?.toString();
    const payment_method = form.get("payku")?.toString();
    const tickets = Number(form.get("tickets"));

    if (!payment_method) {
      error(404, {
        message: "Debes seleccionar un método de pago",
      });
    }

    const totalTicketsLeftStudio =
      nextEvent.ticket.firsts_tickets.amount +
      nextEvent.ticket.seconds_tickets.amount +
      nextEvent.ticket.thirds_tickets.amount;
    const ticketsSold = await client.payment.aggregate({
      where: {
        payment_status: "success",
        AND: [
          {
            productId: nextEvent._id,
          },
        ],
      },
      _sum: {
        ticketAmount: true,
      },
    });

    const total_tickets =
      totalTicketsLeftStudio + (ticketsSold._sum?.ticketAmount || 0);

    const priceTotal = calculatePrice(tickets, nextEvent.ticket);

    const product = await client.product.upsert({
      where: {
        id: nextEvent._id,
      },
      update: {
        name: nextEvent.title,
        stock: total_tickets,
        date: nextEvent.date,
      },
      create: {
        id: nextEvent._id,
        name: nextEvent.title,
        stock: total_tickets,
        date: nextEvent.date,
      },
    });

    const requestPath = encodeURIComponent("/api/transaction");

    const payload = {
      email: email,
      amount: priceTotal.totalCost,
      order: Math.floor(Math.random() * 1000000000),
      subject: `${tickets} entradas para ${nextEvent.title}`,
      name: name,
      country: "Chile",
      urlreturn: PAYMENT_COMPLETED_URL,
      urlnotify: PAYMENT_WEBHOOK_URL_PAYKU,
      additional_parameters: {
        event_id: nextEvent._id,
      },
    };

    let dataUrlRedirect = "";

    try {
      const response = await fetch("https://app.payku.cl/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PUBLIC_TOKEN_PAYKU}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      await client.payment.create({
        data: {
          customer_name: name as string,
          customer_email: email as string,
          customer_phone: phone as string,
          payment_status: result.status,
          ticketAmount: tickets,
          price: priceTotal.totalCost,
          buys: priceTotal.ticket,
          payment_method: payment_method,
          payment_id_service: result.id,
          product: {
            connect: {
              id: nextEvent._id,
            },
          },
        },
      });
      dataUrlRedirect = result.url;
    } catch (error) {
      console.log(error);
    }

    throw redirect(302, dataUrlRedirect);
  },
  etpay: async ({ params, request }) => {
    const nextEvent = await getSanityServerClient(false).fetch(nextEventQuery);

    const totalTicketsLeftStudio =
      nextEvent.ticket.firsts_tickets.amount +
      nextEvent.ticket.seconds_tickets.amount +
      nextEvent.ticket.thirds_tickets.amount;
    const ticketsSold = await client.payment.aggregate({
      where: {
        payment_status: "success",
        AND: [
          {
            productId: nextEvent._id,
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

    const priceTotal = calculatePrice(tickets, nextEvent.ticket);

    // Data que se envia a ET_PAY
    let request_data = {
      merchant_code: MERCHANT_CODE,
      merchant_api_token: MERCHANT_API_TOKEN,
      merchant_order_id: nextEvent._id,
      order_amount: priceTotal.totalCost,
      customer_email: email,
      payment_completed_url: PAYMENT_COMPLETED_URL,
      payment_cancellation_url: PAYMENT_CANCELLATION_URL,
      payment_webhook_url: PAYMENT_WEBHOOK_URL,
      metadata: [
        {
          name: `${tickets} entradas`,
          value: `${nextEvent.title} - ${
            nextEvent.boveda ? "Bóveda Secreta" : nextEvent.venue.venueName
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
          id: nextEvent._id,
        },
        update: {
          name: nextEvent.title,
          stock: total_tickets,
          date: nextEvent.date,
        },
        create: {
          id: nextEvent._id,
          name: nextEvent.title,
          stock: total_tickets,
          date: nextEvent.date,
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
              id: nextEvent._id,
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
