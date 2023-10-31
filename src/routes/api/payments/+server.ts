import type { RequestHandler } from "./$types";
import { client } from "$lib/server/prisma";
import { Buffer } from 'buffer';

export const POST: RequestHandler = async (event) => {
    const body = await event.request.json();
    const jwt = body.payment;

    const payloadBase64Url = jwt.split('.')[1];
    const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString();
    const payload = JSON.parse(payloadJson);

    console.log(payload, 'payload');

    if (payload){
        try {
            const payment = await client.payment.update({
                where: {
                    session_token: payload.session_token,
                },
                data: {
                    payment_status: payload.payment_status,
                }
            });
            console.log(payment ? 'payment found' : 'payment not found');
            
        } catch (e) {
            console.log(e);
        }
    }

    return new Response('ok');
};
