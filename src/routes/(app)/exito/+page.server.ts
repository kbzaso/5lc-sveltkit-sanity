import { getSanityServerClient } from "$lib/config/sanity/client";
import { ActiveEventsQuery } from "$lib/config/sanity/queries";
import { client } from "$lib/server/prisma";
import type { PageServerLoad } from "../$types";
import jwt from "jsonwebtoken";

export const load: PageServerLoad = async ({ url, cookies }) => {
  // INFORMACIÓN DE COMPRA QUE VIENE EN LA URL ETPAY
  const token = url.searchParams.get("jwt");
  // INFO DE COMPRA QUE VIENE EN LA COOKIE PAYKU
  const cookie = cookies.get("payment_id_service");
  if (!token && cookie) {
    try {
      const payment = await client.payment.findUnique({
        where: {
          payment_id_service: cookie,
        },
      });
      let events = await getSanityServerClient(false).fetch(ActiveEventsQuery);
      const event = events.find((event) => event._id === payment?.productId);

      console.log(payment);
      return {
        customer_name: payment?.customer_name,
        customer_email: payment?.customer_email,
        ticket_amount: payment?.ticketAmount,
        ticket_price: payment?.price,
        status: payment?.payment_status,
        method: payment?.payment_method,
        event,
      };
    } catch (error) {
      console.log(error);
    }
  }

  if (!token) {
    return {
      customer_name: "",
      customer_email: "",
      ticket_amount: 0,
      ticket_price: 0,
      status: "",
      method: "",
      event: null,
    };
  }
  const payloadBase64Url = token.split(".")[1];
  const payloadBase64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payloadJson = Buffer.from(payloadBase64, "base64").toString();
  const payload = JSON.parse(payloadJson);

  const payment = await client.payment.findUnique({
    where: {
      id: payload.session_token,
    },
  });

  let events = await getSanityServerClient(false).fetch(ActiveEventsQuery);
  const event = events.find((event) => event._id === payment?.productId);

  return {
    customer_name: payment?.customer_name,
    customer_email: payment?.customer_email,
    ticket_amount: payment?.ticketAmount,
    ticket_price: payment?.price,
    status: payment?.payment_status,
    method: payment?.payment_method,
    event,
  };
};
