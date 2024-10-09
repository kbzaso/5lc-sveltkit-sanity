import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { resultsQuery } from "$lib/config/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { kv } from "$lib/server/kv";

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params, request, setHeaders }) => {

  const cached = await kv.get("results");
  if (cached) {
    return {
      results: cached,
    };
  }
  
  const results = await getSanityServerClient(false).fetch(resultsQuery);

  if (!results) {
    throw error(500, "No se encontraron resultados");
  }

  kv.set("results", JSON.stringify(results), { ex: 43200 });

  return {
    results,
  };
};
