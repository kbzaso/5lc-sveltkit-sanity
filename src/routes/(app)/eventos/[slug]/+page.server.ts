import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import {
  eventQuery,
  resultQuery,
  welcomeQuery,
} from "$lib/config/sanity/queries";
import type { Event } from "$lib/types";
import { error, redirect, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { client } from "$lib/server/prisma";
import { calculatePrice, validateDiscount } from "$lib/utils/eventUtils";
import {
  VITE_PAYKU_API_URL,
  VITE_PAYMENT_COMPLETED_URL,
  VITE_PAYMENT_WEBHOOK_URL_PAYKU,
  VITE_PUBLIC_TOKEN_PAYKU,
} from "$env/static/private";
import { kv } from "$lib/server/kv";

export const load: PageServerLoad = async ({ parent, params, url }) => {
  const cachedResult = await kv.get(params.slug);

  if (cachedResult) {
    return {
       event: cachedResult,
    };
  } else {
    const result = await getSanityServerClient(false).fetch(resultQuery, {
      slug: params.slug,
    });

    if(result){
      // Cachea la data por 1 semana
      await kv.set(params.slug, JSON.stringify(result), { ex: 604800 });
      return {
        event: result,
      }
    }
  }

  const discountCodeFromUrl = url.searchParams.get("discount_code")?.toString().toLowerCase();

  
  const { previewMode } = await parent();
  const welcome = await getSanityServerClient(false).fetch(welcomeQuery);
  
  let totalTicketsLeftStudio;
  
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
        amount: event?.ticket?.batch?.firsts_tickets?.amount,
        price: event?.ticket?.batch?.firsts_tickets?.price,
      },
      seconds_tickets: {
        amount: event?.ticket?.batch?.seconds_tickets?.amount,
        price: event?.ticket?.batch?.seconds_tickets?.price,
      },
      thirds_tickets: {
        amount: event?.ticket?.batch?.thirds_tickets?.amount,
        price: event?.ticket?.batch?.thirds_tickets?.price,
      },
    };

    if (event?.sell_type === "batch") {
      // Suma de tickets que quedan en el Studio
      totalTicketsLeftStudio =
        event?.ticket?.batch?.firsts_tickets?.amount +
        event?.ticket?.batch?.seconds_tickets?.amount +
        event?.ticket?.batch?.thirds_tickets?.amount;
      // Suma de tickets que quedan en el Studio + los que se han vendido
    } else {
      totalTicketsLeftStudio =
        event?.ticket?.ubication?.ringside_tickets?.amount +
        event?.ticket?.ubication?.general_tickets?.amount;
    }

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
  }

  if (!welcome) {
    throw error(500, "Settings not found");
  }

  let validatedDiscount;
   if(Array.isArray(event.discounts)){
     validatedDiscount = validateDiscount(event.discounts, discountCodeFromUrl ?? "");
  }

  return {
    totalTicketsLeftStudio,
    welcome,
    previewMode,
    slug: event?.slug || params.slug,
    event,
    validatedDiscount,
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
  validate: async ({ request, params }) => {
    let { event } = await getSanityServerClient(false).fetch<{
      event: Event;
    }>(eventQuery, {
      slug: params.slug,
    });

    const form = await request.formData();
    const discountCode = form.get("discount")?.toString().toLowerCase();

    if(Array.isArray(event.discounts)){
      return validateDiscount(event.discounts, discountCode ?? "");
    }
  },
  ubication: async ({ params, request, cookies }) => {
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
    const ticketsType = form.get("ticketsType")?.toString() || "";
    const totalPrice = form.get("totalPrice")?.toString();
    
    const discountCode = form.get("discountCode")?.toString();
    const normalizeDiscountCode = discountCode
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "");
    
    let buyObject;
    console.log(form)

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
      order: Math.floor(Math.random() * 1000000000),
      subject: `${tickets} entradas para ${event.title}`,
      amount: Number(totalPrice),
      name: name,
      country: "Chile",
      urlreturn: VITE_PAYMENT_COMPLETED_URL,
      urlnotify: VITE_PAYMENT_WEBHOOK_URL_PAYKU,
      payment: 1,
      additional_parameters: {
        event_id: event._id,
      },
    };

    let dataUrlRedirect = "";

    async function generatePaymentCode(eventName: string, eventId: string): Promise<string> {
      const sanitizedEventName = eventName.replace(/\s+/g, '-');
      // Fetch the current count of payments for the event
      const paymentCount = await client.payment.count({
        where: {
          productId: eventId
        }
      });
    
      // Generate the code using the event name and a zero-padded sequential number
      const sequentialNumber = (paymentCount + 1).toString().padStart(3, '0');
      const paymentCode = `${sanitizedEventName}-${sequentialNumber}`;
    
      return paymentCode;
    }

    const client_id = await generatePaymentCode(event.title, event._id);

    try {
      const response = await fetch(`${VITE_PAYKU_API_URL}/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${VITE_PUBLIC_TOKEN_PAYKU}`,
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
          client_id: client_id,
          ticketsType: ubicatonTicketType(ticketsType || ""),
          price: Number(totalPrice),
          buys: buyObject,
          discount_code: normalizeDiscountCode,
          payment_id_service: result.id,
          product: {
            connect: {
              id: event._id,
            },
          },
        },
      });

      if (payment?.payment_id_service) {
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
  batch: async ({ params, request, cookies }) => {
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
    // Ajustar a los tipos de batch
    // const ticketsType = form.get("ticketsType")?.toString();
    const totalPrice = form.get("totalPrice")?.toString();

    const discountCode = form.get("discountCode")?.toString();
    const normalizeDiscountCode = discountCode
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "");

    const totalTicketsLeftStudio =
      event?.ticket?.batch?.firsts_tickets?.amount +
      event?.ticket?.batch?.seconds_tickets?.amount +
      event?.ticket?.batch?.thirds_tickets?.amount;
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

    // Se vuelve a calcular el precio solo para obtener las tandas que se compraron en json para guardarlas en la DB
    const priceTotal = calculatePrice(tickets, event?.ticket?.batch);

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
      amount: Number(totalPrice),
      order: Math.floor(Math.random() * 1000000000),
      subject: `${tickets} entradas para ${event.title}`,
      name: name,
      country: "Chile",
      urlreturn: VITE_PAYMENT_COMPLETED_URL,
      urlnotify: VITE_PAYMENT_WEBHOOK_URL_PAYKU,
      additional_parameters: {
        event_id: event._id,
      },
    };

    let dataUrlRedirect = "";

    async function generatePaymentCode(eventName: string, eventId: string): Promise<string> {
      const sanitizedEventName = eventName.replace(/\s+/g, '-');
      // Fetch the current count of payments for the event
      const paymentCount = await client.payment.count({
        where: {
          productId: eventId
        }
      });
    
      // Generate the code using the event name and a zero-padded sequential number
      const sequentialNumber = (paymentCount + 1).toString().padStart(3, '0');
      const paymentCode = `${sanitizedEventName}-${sequentialNumber}`;
    
      return paymentCode;
    }

    const client_id = await generatePaymentCode(event.title, event._id);

    try {
      const response = await fetch(`${VITE_PAYKU_API_URL}/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${VITE_PUBLIC_TOKEN_PAYKU}`,
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
          price: Number(totalPrice),
          buys: priceTotal.ticket,
          ticketsType: "Tandas",
          client_id: client_id,
          discount_code: normalizeDiscountCode,
          payment_id_service: result.id,
          product: {
            connect: {
              id: event._id,
            },
          },
        },
      });

      if (payment?.payment_id_service) {
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
};
