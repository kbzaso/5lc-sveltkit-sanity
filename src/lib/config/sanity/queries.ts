import groq from "groq";

const staffFields = groq`
  _id,
  staffType,
  title,
  pseudonym,
  "slug": slug.current,
  data,
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
    doorsOpen,
    boveda,
    assistance,
    playlist,
    slug,
    venue,
    sell_type,
    ticket,
    total_tickets,
    sell,
    result,
    active,
    "disclaimers": disclaimer[] -> {
    title,
    disclaimer,
  },
  "discounts": discounts[] -> {
    code,
    active,
    percentage,
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
*[_type == "staff" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${staffFields}
}`;

export const allStaffQuery = groq`
*[_type == "staff" && title == "Zatara" || title == "Fear" || title == "Prosciutto" || title == "Zack Over" || title == "Sara Phoenix" || title == "Jin Kyle" || title == "Cami Love" || title == "Owen Kampos" || title == "Mauri Parker" || title == "Límite"] {
  title,
  staffImage,
  pseudonym,
  
}`

export const allStaffQuery2 = groq`
*[_type == "staff" && title == "Gárate" || title == "Billy Rocka" || title == "Iván Navarro" || title == "Natalia Stack" || title == "Anarko Montaña" || title == "Máximo" || title == "Alissa Webb" || title == "Alcold" || title == "Mansilla" || title == "Cris Santana"] {
  title,
  staffImage,
  pseudonym,
  
}`

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

export const resultQuery = groq`
*[_type == "event" && active == false && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${eventFields}
}`;