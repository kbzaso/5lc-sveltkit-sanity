import {
  getSanityServerClient,
  overlayDrafts,
} from "$lib/config/sanity/client";
import {
  staffQuery,
  staffSliderFields,
} from "$lib/config/sanity/queries";
import type { Staff } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { kv } from "$lib/server/kv";

export const load: PageServerLoad = async ({ parent, params }) => {
  const cachedStaff = await kv.get(params.slug);
  const cachedAllStaffSlider = await kv.get('allStaffSlider');
  
  if (cachedStaff && cachedAllStaffSlider) {
    return {
      staff: cachedStaff,
      allStaffSlider: cachedAllStaffSlider,
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


  // Cachea la data por 1 semana
  await kv.set(params.slug, JSON.stringify(staff), { ex: 604800 });
  await kv.set('allStaffSlider', JSON.stringify(allStaffSlider,), { ex: 604800 });
  
  return {
    staff,
    allStaffSlider,
  };
};
