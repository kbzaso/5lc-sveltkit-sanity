import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ( event ) => {
    console.log('event', event);
    console.log('sucede o no?')
    return new Response(JSON.stringify({ message: 'intento de pago' }), {
		headers: { 'content-type': 'application/json' },
	});
};