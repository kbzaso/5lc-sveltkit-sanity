import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { resultsQuery } from "$lib/config/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params }) => {
  const results = await getSanityServerClient(false).fetch(resultsQuery);

  if (!results) {
    throw error(500, "Results not found");
  }

  return {
    results,
  };
};
