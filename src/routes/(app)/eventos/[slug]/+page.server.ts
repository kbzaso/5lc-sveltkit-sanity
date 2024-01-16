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
  ACCESS_TOKEN_MP,
  PAYMENT_PENDING_URL
} from "$env/static/private";
import { client } from "$lib/server/prisma";
import { calculatePrice } from "$lib/utils/eventUtils";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { v4 as uuidv4 } from "uuid";

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
  pay_mp: async ({ params, request }) => {
    let { event } = await getSanityServerClient(false).fetch<{
      event: Event;
    }>(eventQuery, {
      slug: params.slug,
    });

    const form = await request.formData();
    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString();
    const phone = form.get("phone")?.toString();
    const payment_method = form.get("mercadopago");
    const tickets = Number(form.get("tickets"));

    // Creamos un id para el pago, el cual pasaremos en 'description' a MP para identinicar el pago en el webhook
    const id = uuidv4();

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
      totalTicketsLeftStudio + ticketsSold._sum?.ticketAmount || 0;

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

    const newPayment = await client.payment.create({
      data: {
        id: id,
        customer_name: name as string,
        customer_email: email as string,
        customer_phone: phone as string,
        ticketAmount: tickets,
        price: priceTotal.totalCost,
        buys: priceTotal.ticket,
        payment_method: payment_method,
        product: {
          connect: {
            id: event._id,
          },
        },
      },
    });

    const client_mp = new MercadoPagoConfig({
      accessToken: ACCESS_TOKEN_MP,
    });

    const preference = await new Preference(client_mp).create({
      body: {
        items: [
          {
            id: `${event._id}`,
            title: `${tickets} entradas para ${event.title}`,
            quantity: 1,
            unit_price: priceTotal.totalCost,
            description: `${id}`,
          },
        ],
        notification_url:
          "https://9bba-2800-150-10e-326-2070-f2-59d1-149a.ngrok-free.app/api/payments_mp",
        back_urls: {
          success: PAYMENT_COMPLETED_URL,
          failure: PAYMENT_CANCELLATION_URL,
          pending: PAYMENT_PENDING_URL,
        },
        auto_return: "approved",
      },
    });

    throw redirect(302, preference.sandbox_init_point!);
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
      totalTicketsLeftStudio + ticketsSold._sum?.ticketAmount || 0;

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
