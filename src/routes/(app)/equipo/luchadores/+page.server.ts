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
    console.log("cached allWrestlers");
    return {
      allWrestlers: cached,
    };
  }

  console.log(cached);

  console.log("not cached");
  const allWrestlers = await getSanityServerClient(false).fetch(
    allWrestlersQuery
  );

  if (!allWrestlers) {
    throw error(500, "staff not found");
  }

  console.log(request.headers.get("cache-control"));

  console.log("NO CACHE, LLAMADO A STUDIO");

  kv.set("allWrestlers", JSON.stringify(allWrestlers), { ex: 86400 });
  console.log(allWrestlers);
  return {
    allWrestlers,
  };
};
