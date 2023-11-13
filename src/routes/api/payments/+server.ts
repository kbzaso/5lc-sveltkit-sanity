import type { RequestHandler } from "./$types";
import { client } from "$lib/server/prisma";
import { Buffer } from "buffer";
import jwt from "jsonwebtoken";

export const POST: RequestHandler = async (event) => {
  const body = await event.request.json();
  const token = body.payment;

  const payloadBase64Url = token.split(".")[1];
  const payloadBase64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payloadJson = Buffer.from(payloadBase64, "base64").toString();
  const payload = JSON.parse(payloadJson);


  try {
    const prePayment = await client.payment.findUnique({
        where: {
          id: payload.session_token,
    }})

    if (!prePayment) {
        throw new Error("Payment not found");
    }

    const payloadDecoded = jwt.verify(token, prePayment.signature_token);
    console.log(payloadDecoded, "payload decoded");
  } catch (e) {
    console.log("error decoding token", e);
    throw new Error(String(e));
  }

  try {
    await client.payment.update({
      where: {
        id: payload.session_token,
      },
      data: {
        payment_status: payload.payment_status,
        payment_token: payload.payment_token,
        rut: payload.user_rut,
      },
    });
  } catch (e) {
    console.log("payment not found");
    throw new Error(String(e));
  }

  return new Response("ok");
};
