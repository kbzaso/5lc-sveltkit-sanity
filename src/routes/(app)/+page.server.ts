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
import { PRIVATE_TOKEN_PAYKU } from "$env/static/private";
import {
  PUBLIC_TOKEN_PAYKU,
  PUBLIC_PAYKU_API_URL,
  PUBLIC_PAYMENT_COMPLETED_URL,
  PUBLIC_PAYMENT_WEBHOOK_URL_PAYKU,
} from "$env/static/public";
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

interface TicketType {
  amount: number;
}

interface BuysObject {
  ringside_tickets: TicketType;
  general_tickets: TicketType;
  [key: string]: TicketType; // This line allows for additional ticket types
}

// Hace la traduccoion de los tipos de tickets para guardarlo en DB
let ubicatonTicketType = (type: string) => {
  if (type === "ringside_tickets") {
    return "Ringside";
  } else if (type === "general_tickets") {
    return "General";
  }
};

export const actions: Actions = {
  ubication: async (event) => {
    const nextEvent = await getSanityServerClient(false).fetch(nextEventQuery);

    const form = await event.request.formData();
    const name = form.get("name")?.toString();
    const rut = form.get("rut")?.toString();
    const email = form.get("email")?.toString();
    const phone = form.get("phone")?.toString();
    const tickets = Number(form.get("tickets"));
    const ticketsType = form.get("ticketsType")?.toString();
    const totalPrice = form.get("totalPrice")?.toString();

    let buyObject;

    if (ticketsType === "ringside_tickets") {
      buyObject = {
        ringside_tickets: {
          amount: tickets,
        },
        general_tickets: {
          amount: 0,
        },
      };
    } else {
      buyObject = {
        ringside_tickets: {
          amount: 0,
        },
        general_tickets: {
          amount: tickets,
        },
      };
    }

    const totalTicketsLeftStudio =
      nextEvent.ticket.ubication.ringside_tickets.amount +
      nextEvent.ticket.ubication.general_tickets.amount;

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

    const payload = {
      email: email,
      amount: Number(totalPrice),
      order: Math.floor(Math.random() * 1000000000),
      subject: `${tickets} entradas para ${nextEvent.title}`,
      name: name,
      country: "Chile",
      urlreturn: PUBLIC_PAYMENT_COMPLETED_URL,
      urlnotify: PUBLIC_PAYMENT_WEBHOOK_URL_PAYKU,
      payment: 1,
      additional_parameters: {
        event_id: nextEvent._id,
      },
    };

    let dataUrlRedirect = "";

    try {
      const response = await fetch(`${PUBLIC_PAYKU_API_URL}/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PUBLIC_TOKEN_PAYKU}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      const payment = await client.payment.create({
        data: {
          customer_name: name as string,
          customer_email: email as string,
          customer_phone: phone as string,
          rut: rut as string,
          payment_status: result.status,
          ticketAmount: tickets,
          ticketsType: ubicatonTicketType(ticketsType || ""),
          price: Number(totalPrice),
          buys: buyObject,
          payment_id_service: result.id,
          product: {
            connect: {
              id: nextEvent._id,
            },
          },
        },
      });

      if (payment.payment_id_service) {
      event.cookies.set('payment_id_service', payment.payment_id_service, { path: '/' });
      }
      
      dataUrlRedirect = result.url;
    } catch (error) {
      console.log(error);
    }
    throw redirect(302, dataUrlRedirect);
  },
  payku: async (event) => {
    const nextEvent = await getSanityServerClient(false).fetch(nextEventQuery);

    const form = await event.request.formData();
    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString();
    const phone = form.get("phone")?.toString();
    // const payment_method = form.get("payku")?.toString();
    const tickets = Number(form.get("tickets"));

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

      const payment = await client.payment.create({
        data: {
          customer_name: name as string,
          customer_email: email as string,
          customer_phone: phone as string,
          payment_status: result.status,
          ticketAmount: tickets,
          price: priceTotal.totalCost,
          buys: priceTotal.ticket,
          // payment_method: payment_method,
          payment_id_service: result.id,
          product: {
            connect: {
              id: nextEvent._id,
            },
          },
        },
      });

      console.log(payment);
      if (payment.payment_id_service) {
        event.cookies.set("payment_id_service", payment?.payment_id_service, {
          // send cookie for every page
          path: "/exito",
          // server side only cookie so you can't use `document.cookie`
          httpOnly: true,
          // only requests from same site can send cookies
          // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
          sameSite: "strict",
          // only sent over HTTPS in production
          secure: process.env.NODE_ENV === "production",
          // set cookie to expire after a month
          maxAge: 5 * 60 * 60,
        });
      }

      dataUrlRedirect = result.url;
    } catch (error) {
      console.log(error);
    }

    throw redirect(302, dataUrlRedirect);
  },
};
