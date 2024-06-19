import {sequence} from "@sveltejs/kit/hooks";
import * as Sentry from "@sentry/sveltekit";
import { getPreviewCookie } from "$lib/utils";
import type { Handle } from "@sveltejs/kit";

Sentry.init({
    dsn: "https://4b8a94e1bafe01a1d7961c34cd6d19b9@o4507454758846464.ingest.us.sentry.io/4507455655575552",
    tracesSampleRate: 1
})

export const handle: Handle = sequence(Sentry.sentryHandle(), async ({ event, resolve }) => {
  const previewModeCookie = getPreviewCookie(event.cookies);

  event.locals.previewMode = false;

  if (previewModeCookie === "true") {
    event.locals.previewMode = true;
  }

  const response = await resolve(event);

  return response;
});
export const handleError = Sentry.handleErrorWithSentry();