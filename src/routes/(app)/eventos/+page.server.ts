import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { allEventsQuery, resultsQuery } from "$lib/config/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params }) => {
  const events = await getSanityServerClient(false).fetch(allEventsQuery);
  const results = await getSanityServerClient(false).fetch(resultsQuery);

  if (!events) {
    throw error(500, "Event not found");
  }

  return {
    events,
    results,
  };
};
