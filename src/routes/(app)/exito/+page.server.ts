import { getSanityServerClient } from "$lib/config/sanity/client";
import { ActiveEventsQuery } from "$lib/config/sanity/queries";
import { client } from "$lib/server/prisma";
import type { PageServerLoad } from "../$types";
import jwt from "jsonwebtoken";

export const load: PageServerLoad = async ({ url }) => {
  const token = url.searchParams.get("jwt");
  const payloadBase64Url = token.split(".")[1];
  const payloadBase64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payloadJson = Buffer.from(payloadBase64, "base64").toString();
  const payload = JSON.parse(payloadJson);

  const payment = await client.payment.findUnique({
    where: {
      id: payload.session_token,
    },
  });
  
//   const product = await client.product.findUnique({
//       where: {
//         id: payment?.productId,
//       },
//     });
    let events = await getSanityServerClient(false).fetch(ActiveEventsQuery);
    const event = events.find((event) => event._id === payment?.productId);

  return {
    customer_name: payment?.customer_name,
    customer_email: payment?.customer_email,
    ticket_amount: payment?.ticketAmount,
    ticket_price: payment?.price,
    event
  };
};
