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
    return {
      ...cached,
    };
  }

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
  const currentData = {
    staff,
    allStaffSlider,
  };

  // Cachea la data por 1 semana
  await kv.set(params.slug, JSON.stringify(currentData), { ex: 604800 });

  return {
    ...currentData,
  };
};
