import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { allWrestlersQuery } from "$lib/config/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params }) => {
  const allWrestlers = await getSanityServerClient(false).fetch(allWrestlersQuery);

  if (!allWrestlers) {
    throw error(500, "staff not found");
  }

  return {
    allWrestlers,
  };
};
