import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { allAnnonceursQuery } from "$lib/config/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params }) => {
  const allAnnonceurs = await getSanityServerClient(false).fetch(
    allAnnonceursQuery
  );

  if (!allAnnonceurs) {
    throw error(500, "staff not found");
  }

  return {
    allAnnonceurs,
  };
};
