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
        amount: event.ticket.firsts_tickets.amount,
        price: event.ticket.firsts_tickets.price,
      },
      seconds_tickets: {
        amount: event.ticket.seconds_tickets.amount,
        price: event.ticket.seconds_tickets.price,
      },
      thirds_tickets: {
        amount: event.ticket.thirds_tickets.amount,
        price: event.ticket.thirds_tickets.price,
      },
    };

    // Suma de tickets que quedan en el Studio
    const totalTicketsLeftStudio = event.ticket.firsts_tickets.amount + event.ticket.seconds_tickets.amount + event.ticket.thirds_tickets.amount
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

    event = {
      ...event,
      tickets_sold: ticketsSold._sum?.ticketAmount || 0,
      total_tickets: totalTickets
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
