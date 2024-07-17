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

export const load: PageServerLoad = async ({ parent, params }) => {

  const { previewMode } = await parent();

  const allStaffSlider = await getSanityServerClient(false).fetch(
    staffSliderFields
  );

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

  return {
    staff,
    allStaffSlider,
  };
};
