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
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import {
  PMT_URL,
  MERCHANT_CODE,
  MERCHANT_API_TOKEN,
  PAYMENT_COMPLETED_URL,
  PAYMENT_CANCELLATION_URL,
  PAYMENT_WEBHOOK_URL,
} from "$env/static/private";
import { client } from "$lib/server/prisma";

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
    const name = form.get("name");
    const rut = form.get("rut");
    const email = form.get("email");
    const tickets = Number(form.get("tickets"));
    const price = nextEvent.ticket.price;
    const priceTotal = price * tickets;
    let resp;

    let request_data = {
      merchant_code: MERCHANT_CODE,
      merchant_api_token: MERCHANT_API_TOKEN,
      merchant_order_id: "order-1992",
      order_amount: priceTotal,
      customer_email: email,
      payment_completed_url: PAYMENT_COMPLETED_URL,
      payment_cancellation_url: PAYMENT_CANCELLATION_URL,
      payment_webhook_url: PAYMENT_WEBHOOK_URL,
      metadata: [
        {
          name: `${tickets} entradas`,
          value: `${nextEvent.title} - ${nextEvent.boveda ? "Bóveda Secreta" : nextEvent.venue.venueName}`,
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
      )
      
      resp = await data.json();
      console.log(resp, 'resp');

      const newPayment = await client.payment.create({
        data: {
          name: name,
          rut: rut,
          email: email,
          ticketAmount: tickets,
          price: price,
          priceTotal: priceTotal,
          session_token: resp.token,
          signature_token: resp.signature_token,
          product: nextEvent.title,
        }
      })

      console.log(newPayment.session_token, 'newPayment.session_token');
      
    } catch (error) {
      console.log(error);
    }
    throw redirect(302, `${PMT_URL}/session/${resp.token}`)
  },
};
