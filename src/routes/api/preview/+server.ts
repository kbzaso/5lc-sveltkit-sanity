import type { RequestHandler } from "./$types";
import { env } from "$env/dynamic/private";
import { error, redirect } from "@sveltejs/kit";
import { getSanityServerClient } from "$lib/config/sanity/client";
import { staffBySlugQuery, eventBySlugQuery } from "$lib/config/sanity/queries";
import { setPreviewCookie } from "$lib/utils";

export const GET: RequestHandler = async ({ url, cookies, setHeaders }) => {
  const allParams = url.searchParams;
  const secret = env.VITE_SANITY_PREVIEW_SECRET;
  const incomingSecret = allParams.get("secret");
  const type = allParams.get("type");
  const slug = allParams.get("slug");

  // Check the secret.
  if (secret !== incomingSecret) {
    throw error(401, "Invalid secret");
  }

  // Check if we have a type and slug parameter.
  if (!slug || !type) {
    throw error(401, "Missing slug or type");
  }

  // Default redirect.
  let redirectSlug = "/";
  let isPreviewing = false;

  // Our query may vary depending on the type.
  if (type === "staff") {
    const staff = await getSanityServerClient(true).fetch(staffBySlugQuery, {
      slug,
    });

    if (!staff || !staff.slug) {
      throw error(401, "No staff found");
    }

    isPreviewing = true;

    // Set the redirect slug and append the isPreview query
    // param, so that the app knows it's a Sanity preview.
    if (staff.staffType === "wrestler") {
    redirectSlug = `/luchadores/${staff.slug}?isPreview=true`;
    } else if (staff.staffType === "referee") {
      redirectSlug = `/arbitros/${staff.slug}?isPreview=true`;
    } else if (staff.staffType === "annonceurs") {
      redirectSlug = `/presentadores/${staff.slug}?isPreview=true`;
    }

  }

  if (type === "event") {
    const event = await getSanityServerClient(true).fetch(eventBySlugQuery, {
      slug,
    });

    if (!event || !event.slug) {
      throw error(401, "No event found");
    }

    isPreviewing = true;

    // Set the redirect slug and append the isPreview query
    // param, so that the app knows it's a Sanity preview.
    redirectSlug = `/eventos/${event.slug}?isPreview=true`;
  }

  // Set the preview cookie.
  if (isPreviewing) {
    setPreviewCookie(cookies);
  }

  // Since this endpoint is called from the Sanity Studio on
  // every content change, we'll make sure not to cache it.
  setHeaders({
    "Cache-Control":
      "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
  });

  // We don't redirect to url.searchParams.get("slug") as that exposes us to open redirect vulnerabilities,
  throw redirect(302, redirectSlug);
};
