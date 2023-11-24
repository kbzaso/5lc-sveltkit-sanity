import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import {
  settingsQuery,
  welcomeQuery,
  nextEventQuery,
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
} from "$env/static/private";
import { client } from "$lib/server/prisma";
import { calculatePrice } from "$lib/utils/eventUtils";

// export const prerender = 'auto';
export const load: PageServerLoad = async () => {
  const settings = await getSanityServerClient(false).fetch(settingsQuery);
  const welcome = await getSanityServerClient(false).fetch(welcomeQuery);
  let nextEvent = await getSanityServerClient(false).fetch(nextEventQuery);

  if (!settings) {
    throw error(500, "Settings not found");
  }
  if (!welcome) {
    throw error(500, "Settings not found");
  }
  if (!nextEvent) {
    nextEvent = false;
  } else {
    // Cuantos tickets se han vendido de un evento en especifico
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

    let ticketsSoldCount = ticketsSold._sum?.ticketAmount || 0;
    // ================================

    const partsOrder = ["firsts_tickets", "seconds_tickets", "thirds_tickets"];
    const ticketSystem = {
      firsts_tickets: {
        amount: nextEvent.ticket.firsts_tickets.amount,
        price: nextEvent.ticket.firsts_tickets.price,
      },
      seconds_tickets: {
        amount: nextEvent.ticket.seconds_tickets.amount,
        price: nextEvent.ticket.seconds_tickets.price,
      },
      thirds_tickets: {
        amount: nextEvent.ticket.thirds_tickets.amount,
        price: nextEvent.ticket.thirds_tickets.price,
      },
    };

    // Suma de tickets que quedan en el Studio
    const totalTicketsLeftStudio = nextEvent.ticket.firsts_tickets.amount + nextEvent.ticket.seconds_tickets.amount + nextEvent.ticket.thirds_tickets.amount
    // Suma de tickets que quedan en el Studio + los que se han vendido
    const totalTickets =  totalTicketsLeftStudio + ticketsSoldCount 

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

    nextEvent = {
      ...nextEvent,
      tickets_sold: ticketsSold._sum?.ticketAmount || 0,
      total_tickets: totalTickets
    };
  }

  return {
    settings,
    welcome,
    nextEvent,
  };
};

export const actions: Actions = {
  pay: async (event) => {
    const nextEvent = await getSanityServerClient(false).fetch(nextEventQuery);
    const totalTicketsLeftStudio = nextEvent.ticket.firsts_tickets.amount + nextEvent.ticket.seconds_tickets.amount + nextEvent.ticket.thirds_tickets.amount
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
    const total_tickets = totalTicketsLeftStudio + ticketsSold._sum?.ticketAmount || 0;

    const form = await event.request.formData();
    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString();
    const phone = form.get("phone")?.toString();
    const tickets = Number(form.get("tickets"));

    let resp;

    // ESTA TOMANDO EL VALOR ORIGINAL DEL EVENTO, SE NECESITA EL VALOR ACTUALIZADO
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
      const data = await fetch(
        `${API_URL}/session/initialize`,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "[*]",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          }),
          body: JSON.stringify(request_data),
          redirect: "follow",
        }
      );

      resp = await data.json();

      const product = await client.product.upsert({
        where: {
          id: nextEvent._id,
        },
        update: {
          name: nextEvent.title,
          stock: total_tickets,
        },
        create: {
          id: nextEvent._id,
          name: nextEvent.title,
          stock: total_tickets,
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
