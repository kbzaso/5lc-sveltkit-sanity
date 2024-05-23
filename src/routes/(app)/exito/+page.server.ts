import { getSanityServerClient } from "$lib/config/sanity/client";
import { ActiveEventsQuery } from "$lib/config/sanity/queries";
import { client } from "$lib/server/prisma";
import { error } from "console";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ url, cookies }) => {
  // INFO DE COMPRA QUE VIENE EN LA COOKIE PAYKU
  const cookie = cookies.get("payment_id_service");
  console.log("cookie", cookie);
  if (cookie) {
    try {
      const payment = await client.payment.findUnique({
        where: {
          payment_id_service: cookie,
        },
      });

      let events = await getSanityServerClient(false).fetch(ActiveEventsQuery);
      const event = events.find((event) => event._id === payment?.productId);

      console.log("event", event);

      return {
        customer_name: payment?.customer_name,
        customer_email: payment?.customer_email,
        ticket_amount: payment?.ticketAmount,
        ticket_price: payment?.price,
        status: payment?.payment_status,
        tcketType: payment?.ticketsType,
        event,
        payment_id_service: payment?.payment_id_service,
      };
    } catch (e) {
      console.log(e);
      throw error(500, "El pago no fue encontrado");
    }
  } else {
    return {
      status: 'error'
    }
  }
};
