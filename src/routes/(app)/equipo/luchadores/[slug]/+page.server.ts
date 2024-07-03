import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import {
  staffQuery,
  welcomeQuery,
  staffSliderFields,
} from "$lib/config/sanity/queries";
import type { Staff } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { kv } from "$lib/server/kv";

export const load: PageServerLoad = async ({ parent, params }) => {
  const cached = await kv.get(params.slug);
  if (cached) {
    console.log('cached data found!')
    return {
      data: cached,
    };
  }

  const { previewMode } = await parent();

  const welcome = await getSanityServerClient(false).fetch(welcomeQuery);
  const allStaffSlider = await getSanityServerClient(false).fetch(staffSliderFields);
  const staff = await getSanityServerClient(false).fetch(staffQuery, {
    slug: params.slug,
  });

  if (!staff) {
    throw error(404, {
      message: "El perfil que estas buscando no existe o no esta disponible",
    });
  }

  if (!allStaffSlider) {
    throw error(500, { message: "Alguna caga paso y no nos dimos cuenta" });
  }

  // Prepare the data to be cached
  const dataToCache = {
    staff,
    slug: staff?.slug || params.slug,
    welcome,
    allStaffSlider,
  };

  // Cache the data with a timestamp or hash to validate freshness
  await kv.set(params.slug, JSON.stringify(dataToCache), { ex: 20 });

  return {
    staff,
    slug: staff?.slug || params.slug,
    welcome,
    allStaffSlider,
  };
};
