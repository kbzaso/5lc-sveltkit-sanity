import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { allRefereeQuery } from "$lib/config/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { kv } from "$lib/server/kv";

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params }) => {
  
  const cached = await kv.get("allReferees");
  if (cached) {
    return {
      allReferees: cached,
    };
  }

  const allReferees = await getSanityServerClient(false).fetch(allRefereeQuery);

  if (!allReferees) {
    throw error(500, "No hay árbitros disponibles");
  }

  kv.set("allReferees", JSON.stringify(allReferees), { ex: 86400 });

  return {
    allReferees,
  };
};
