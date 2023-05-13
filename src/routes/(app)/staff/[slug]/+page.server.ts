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

  const welcome = await getSanityServerClient(false).fetch(welcomeQuery);
  const allStaff = await getSanityServerClient(false).fetch(staffSliderFields);

  const { staff, moreStaff } = await getSanityServerClient(previewMode).fetch<{
    staff: Staff;
    moreStaff: Staff[];
  }>(staffQuery, {
    slug: params.slug,
  });

  if (!staff) {
    throw error(404, "Events not found");
  }

  if (!allStaff) {
    throw error(500, "staff section not found");
  }

  return {
    previewMode,
    slug: staff?.slug || params.slug,
    initialData: {
      staff,
      moreStaff: overlayDrafts(moreStaff),
    },
    welcome,
    allStaff,
  };
};
