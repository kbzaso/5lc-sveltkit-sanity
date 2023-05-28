import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { allStaffQuery } from "$lib/config/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const prerender = true;
export const load: PageServerLoad = async ({ parent, params }) => {
  const allStaff = await getSanityServerClient(false).fetch(allStaffQuery);

  if (!allStaff) {
    throw error(500, "staff not found");
  }

  return {
    allStaff,
  };
};
