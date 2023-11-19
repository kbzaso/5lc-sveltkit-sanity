import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import {
  allEventsQuery,
  settingsQuery,
  welcomeQuery,
  nextEventQuery,
} from "$lib/config/sanity/queries";
import { error, json, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import {
  PMT_URL,
  MERCHANT_CODE,
  MERCHANT_API_TOKEN,
  PAYMENT_COMPLETED_URL,
  PAYMENT_CANCELLATION_URL,
  PAYMENT_WEBHOOK_URL,
  VITE_SANITY_PROJECT_ID as projectId,
  VITE_SANITY_DATASET as datasetName,
  SANITY_API_WRITE_TOKEN as tokenWithWriteAccess,
} from "$env/static/private";
import { client } from "$lib/server/prisma";

function calculatePrice(ticketsToBuy: number, ticketSystem: any) {
  let totalCost = 0;
  let remainingTickets = ticketsToBuy;
  const partsOrder = ["firsts_tickets", "seconds_tickets", "thirds_tickets"];

  // Calculate total cost
  for (let part of partsOrder) {
    if (remainingTickets <= ticketSystem[part].amount) {
      totalCost += remainingTickets * ticketSystem[part].price;
      ticketSystem[part].amount -= remainingTickets;
      remainingTickets = 0;
      break;
    } else {
      totalCost += ticketSystem[part].amount * ticketSystem[part].price;
      remainingTickets -= ticketSystem[part].amount;
      ticketSystem[part].amount = 0;
    }
  }

  return totalCost;
}

// export const prerender = 'auto';
export const load: PageServerLoad = async () => {
  const events = await getSanityServerClient(false).fetch(allEventsQuery);
  const settings = await getSanityServerClient(false).fetch(settingsQuery);
  const welcome = await getSanityServerClient(false).fetch(welcomeQuery);
  let nextEvent = await getSanityServerClient(false).fetch(nextEventQuery);

  if (!events) {
    throw error(500, "Event not found");
  }
  if (!settings) {
    throw error(500, "Settings not found");
  }
  if (!welcome) {
    throw error(500, "Settings not found");
  }
  if (!nextEvent) {
    nextEvent = false;
  } else {
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

    let totalTickets = nextEvent.ticket.firsts_tickets.amount + nextEvent.ticket.seconds_tickets.amount + nextEvent.ticket.thirds_tickets.amount;

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

    let remainingTickets = {};
    let currentPart = null;

    for (let part of partsOrder) {
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

      if (ticketSystem[part].amount > 0 && !currentPart) {
        currentPart = part;
      }
    }
    nextEvent = {
      ...nextEvent,
      tickets_sold: ticketsSold._sum?.ticketAmount || 0,
      current_part: currentPart,
      remaining_tickets: remainingTickets,
      total_tickets: totalTickets,
    };
    console.log(nextEvent);
  }

  return {
    events,
    settings,
    welcome,
    nextEvent,
  };
};

export const actions: Actions = {
  pay: async (event) => {
    let nextEvent = await getSanityServerClient(false).fetch(nextEventQuery);

    const form = await event.request.formData();
    const name = form.get("name")?.toString();
    const remaining_tickets = JSON.parse(
      form.get("remaining_tickets")?.toString() || "{}"
    );
    const email = form.get("email")?.toString();
    const phone = form.get("phone")?.toString();
    const tickets = Number(form.get("tickets"));

    let resp;

    // ESTA TOMANDO EL VALOR ORIGINAL DEL EVENTO, SE NECESITA EL VALOR ACTUALIZADO
    const priceTotal = calculatePrice(tickets, remaining_tickets);

    console.log(priceTotal, "priceTotal");

    // Data que se envia a ET_PAY
    let request_data = {
      merchant_code: MERCHANT_CODE,
      merchant_api_token: MERCHANT_API_TOKEN,
      merchant_order_id: nextEvent._id,
      order_amount: priceTotal,
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
        "https://api-sandbox.etpayment.com/session/initialize",
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
        },
        create: {
          id: nextEvent._id,
          name: nextEvent.title,
        },
      });

      const newPayment = await client.payment.create({
        data: {
          id: resp.token,
          customer_name: name as string,
          customer_email: email as string,
          customer_phone: phone as string,
          ticketAmount: tickets,
          price: priceTotal,
          signature_token: resp.signature_token,
          product: {
            connect: {
              id: nextEvent._id,
            },
          },
        },
      });
      console.log(newPayment, "newPayment");
      console.log(product, "newProduct");  
    } catch (error) {
      console.log(error);
    }
    throw redirect(302, `${PMT_URL}/session/${resp.token}`);
  },
};
