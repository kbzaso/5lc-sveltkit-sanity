import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { allAnnonceursQuery } from "$lib/config/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { kv } from "$lib/server/kv";

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params }) => {
  const cached = await kv.get("allAnnonceurs");
  if (cached) {
    return {
      allAnnonceurs: cached,
    };
  }
  const allAnnonceurs = await getSanityServerClient(false).fetch(
    allAnnonceursQuery
  );

  if (!allAnnonceurs) {
    throw error(500, "Annonceurs not found");
  }

  kv.set("allAnnonceurs", JSON.stringify(allAnnonceurs), { ex: 86400 });
  return {
    allAnnonceurs,
  };
};
