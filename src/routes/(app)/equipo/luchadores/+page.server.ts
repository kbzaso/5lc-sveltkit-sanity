import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { allWrestlersQuery } from "$lib/config/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { kv } from "$lib/server/kv";

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params, request }) => {
  const cached = await kv.get("allWrestlers");
  if (cached) {
    return {
      allWrestlers: cached,
    };
  }

  const allWrestlers = await getSanityServerClient(false).fetch(
    allWrestlersQuery
  );

  if (!allWrestlers) {
    throw error(500, "staff not found");
  }

  kv.set("allWrestlers", JSON.stringify(allWrestlers), { ex: 86400 });

  return {
    allWrestlers,
  };
};
