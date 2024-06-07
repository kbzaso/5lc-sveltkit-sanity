import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { eventQuery, welcomeQuery } from "$lib/config/sanity/queries";
import type { Event } from "$lib/types";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import {
  PUBLIC_TOKEN_PAYKU,
  PUBLIC_PAYMENT_WEBHOOK_URL_PAYKU,
  PUBLIC_PAYMENT_COMPLETED_URL,
  PUBLIC_PAYKU_API_URL,
} from "$env/static/public";
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

    let remainingTickets: { [key: string]: { amount: number; price: number } } =
      {};

    // Recalculate the ticket object
    for (let i = 0; i < partsOrder.length; i++) {
      let part = partsOrder[i] as keyof typeof ticketSystem;

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

// Hace la traduccoion de los tipos de tickets para guardarlo en DB
let ubicatonTicketType = (type: string) => {
  if (type === "ringside_tickets") {
    return "Ringside";
  } else if (type === "general_tickets") {
    return "General";
  }
};

export const actions: Actions = {
  ubication: async ({params, request, cookies}) => {
    let { event } = await getSanityServerClient(false).fetch<{
      event: Event;
    }>(eventQuery, {
      slug: params.slug,
    });

    const form = await request.formData();
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
      event.ticket.ubication.ringside_tickets.amount +
      event.ticket.ubication.general_tickets.amount;

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

    const payload = {
      email: email,
      amount: Number(totalPrice),
      order: Math.floor(Math.random() * 1000000000),
      subject: `${tickets} entradas para ${event.title}`,
      name: name,
      country: "Chile",
      urlreturn: PUBLIC_PAYMENT_COMPLETED_URL,
      urlnotify: PUBLIC_PAYMENT_WEBHOOK_URL_PAYKU,
      payment: 1,
      additional_parameters: {
        event_id: event._id,
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
              id: event._id,
            },
          },
        },
      });

      if (payment.payment_id_service) {
        cookies.set("payment_id_service", payment.payment_id_service, {
          path: "/",
        });
      }

      dataUrlRedirect = result.url;
    } catch (error) {
      console.log(error);
    }
    throw redirect(302, dataUrlRedirect);
  },
  batch: async ({ params, request }) => {
    let { event } = await getSanityServerClient(false).fetch<{
      event: Event;
    }>(eventQuery, {
      slug: params.slug,
    });

    const form = await request.formData();
    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString();
    const phone = form.get("phone")?.toString();
    // const payment_method = form.get("payku")?.toString();
    const tickets = Number(form.get("tickets"));

    // if (!payment_method) {
    //   error(404, {
    //     message: "Debes seleccionar un método de pago",
    //   });
    // }

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

    const requestPath = encodeURIComponent("/api/transaction");

    const payload = {
      email: email,
      amount: priceTotal.totalCost,
      order: Math.floor(Math.random() * 1000000000),
      subject: `${tickets} entradas para ${event.title}`,
      name: name,
      country: "Chile",
      urlreturn: PUBLIC_PAYMENT_COMPLETED_URL,
      urlnotify: PUBLIC_PAYMENT_WEBHOOK_URL_PAYKU,
      additional_parameters: {
        event_id: event._id,
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
      console.log(result);

      await client.payment.create({
        data: {
          customer_name: name as string,
          customer_email: email as string,
          customer_phone: phone as string,
          payment_status: result.status,
          ticketAmount: tickets,
          price: priceTotal.totalCost,
          buys: priceTotal.ticket,
          // ticketsType: payment_method,
          payment_id_service: result.id,
          product: {
            connect: {
              id: event._id,
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
};
