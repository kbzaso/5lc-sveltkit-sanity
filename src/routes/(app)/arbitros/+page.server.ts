import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { allRefereeQuery } from "$lib/config/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params }) => {
  const allReferee = await getSanityServerClient(false).fetch(allRefereeQuery);

  if (!allReferee) {
    throw error(500, "staff not found");
  }

  return {
    allReferee,
  };
};
