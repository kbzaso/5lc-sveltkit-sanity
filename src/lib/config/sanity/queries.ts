import groq from "groq";

const staffFields = groq`
  _id,
  staffType,
  title,
  pseudonym,
  "slug": slug.current,
  data,
  imageTitle,
  social,
  staffImage,
  "principalPhotographer": staffImage {
    photographer-> {
      name,
      imageUrl,
    },
  },
  description,
  seo_description,
  "gallery": gallery.images[]{
    alt,
    active,
    vertical,
    crop,
    hotspot,
    _type,
    _key,
    asset,
    photographer->
  }
`;

// Se solicita en el detalle del staff wrestler
export const staffSliderFields = groq`
    *[_type == "staff"] {
      _id,
      title,
      pseudonym,
      "slug": slug.current,
      staffImage,
      staffType,
    }`;

export const eventFields = groq`
    _id,
    _createdAt,
    name,
    title,
    date,
    boveda,
    slug,
    venue,
    ticket,
    total_tickets,
    sell,
    result,
    active,
    "disclaimers": disclaimer[] -> {
    title,
    disclaimer,
  },
    description,
    seo_description,
    poster,
    videoUrl,
    "slug": slug.current,
    "gallery": gallery.images[]{
      alt,
      active,
      vertical,
      crop,
      hotspot,
      _type,
      _key,
      asset,
      photographer->
    }
`;

export const settingsQuery = groq`*[_type == "settings"][0]`;

export const welcomeQuery = groq`*[_type == "welcome"][0]`;

export const staffVisionQuery = groq`*[_type == "staff"] | order(date desc, _updatedAt desc) {
  ...
}`;

export const indexQuery = groq`
*[_type == "staff"] | order(date desc, _updatedAt desc) {
  ${staffFields}
}`;

// POSTS STUFF
export const staffQuery = groq`
{
  "draft": *[_type == "staff" && slug.current == $slug && defined(draft) && draft == true][0]{
    content,
    ${staffFields}
  },
  "staff": *[_type == "staff" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${staffFields}
  },
  "moreStaff": *[_type == "staff" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${staffFields}
  }
}`;

// WRESTLER STUFF
export const wrestlerQuery = groq`
{
  "draft": *[_type == "staff" && staffType == "wrestler" && slug.current == $slug && defined(draft) && draft == true][0]{
    content,
    ${staffFields}
  },
  "staff": *[_type == "staff" && staffType == "wrestler" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${staffFields}
  },
  "moreStaff": *[_type == "staff" && staffType == "wrestler" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${staffFields}
  }
}`;

export const allStaffQuery = groq`
*[_type == "staff"] | order(title asc) {
  ${staffFields}
}`;

export const allAnnonceursQuery = groq`
*[_type == "staff" && staffType == "annonceurs"] | order(title asc) {
  ${staffFields}
}`;
export const allWrestlersQuery = groq`
*[_type == "staff" && staffType == "wrestler"] | order(title asc) {
  ${staffFields}
}`;

export const allRefereeQuery = groq`
*[_type == "staff" && staffType == "referee"] | order(title asc) {
  ${staffFields}
}`;

export const staffSlugsQuery = groq`
*[_type == "staff" && defined(slug.current)][].slug.current
`;

export const staffBySlugQuery = groq`
*[_type == "staff" && slug.current == $slug][0] {
  ${staffFields}
}
`;
export const refereeBySlugQuery = groq`
*[_type == "staff" && staffType == "referee" && slug.current == $slug][0] {
  ${staffFields}
}
`;

// EVENT STUFF
export const eventQuery = groq`
{
  "draft": *[_type == "event" && slug.current == $slug && defined(draft) && draft == true][0]{
    content,
    ${eventFields}
  },
  "event": *[_type == "event" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${eventFields}
  },
  "moreEvents": *[_type == "event" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${eventFields}
  }
}`;

export const ActiveEventsQuery = groq`
*[_type == "event" && active == true] | order(date desc, _updatedAt desc) {
  ${eventFields}
}`;

export const eventSlugsQuery = groq`
*[_type == "event" && defined(slug.current)][].slug.current
`;

export const eventBySlugQuery = groq`
*[_type == "event" && slug.current == $slug][0] {
  ${eventFields}
}
`;

export const nextEventQuery = groq`
*[_type == "event" && active == true][0]{
  ${eventFields}
}
`;

export const resultsQuery = groq`
*[_type == "event" && active == false] | order(date desc, _updatedAt desc) {
  ${eventFields}
}
`;
