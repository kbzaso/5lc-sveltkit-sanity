import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import { settingsQuery } from "$lib/config/sanity/queries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params, url }) => {
  const settings = await getSanityServerClient(false).fetch(settingsQuery);

  if (!settings) {
    throw error(500, "Settings not found");
  }

  return {
    settings,
    url: url.pathname,
  };
};
