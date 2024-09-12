import { defineType, defineField } from "sanity";
import { CalendarIcon } from "@sanity/icons";
import { DoorsOpenInput } from "../components/DoorsOpenInput";

export const SELL_TYPE = [
  { title: "Tandas", value: "batch" },
  { title: "Ubicación", value: "ubication" },
];

export default defineType({
  name: "event",
  title: "Events",
  icon: CalendarIcon,
  type: "document",
  fields: [
    {
      title: "¿Es un evento activo?",
      name: "active",
      type: "boolean",
      description:
        "Si no lo es, es un evento pasado y debes agregar los resultados de las luchas",
      initialValue: true,
    },
    {
      type: "string",
      name: "title",
      title: "Nombre del evento",
      validation: (Rule) => [Rule.required()],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Dirección web del evento",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "date",
      title: "Fecha y hora del evento",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => [Rule.required()],
    },
    {
      name: "doorsOpen",
      title: "Apertura de puertas",
      description: "Número de minutos antes de que abran las puertas",
      type: "number",
      initialValue: 45,
      components: {
        input: DoorsOpenInput,
      },
      validation: (Rule) =>
        Rule.max(120).error("El valor no puede exceder los 120"),
    },
    {
      title: "El evento es en la Bóveda secreta?",
      name: "boveda",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "venue",
      type: "object",
      title: "Dirección del evento",
      fields: [
        {
          name: "venueName",
          type: "string",
          title: "Nombre del lugar",
          hidden: ({ document }) => document?.boveda === true,
        },
        {
          name: "venueUrl",
          type: "url",
          title: "URL de google maps",
          hidden: ({ document }) => document?.boveda === true,
        },
        {
          name: "venueAdress",
          type: "string",
          title: "Dirección del lugar",
          hidden: ({ document }) => document?.boveda === true,
        },
      ],
    },
    {
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      name: "description",
      title: "Descripción del evento",
      hidden: ({ document }) => document?.active === false,
      validation: (Rule) => [Rule.required()],
    },
    {
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      name: "result",
      title: "Resultados del evento",
      hidden: ({ document }) => document?.active === true,
    },
    {
      type: "image",
      options: {
        accept: ".jpg,.png,.svg,.avif,webp",
        hotspot: true,
      },
      name: "poster",
      title: "Poster",
      description: "Afiche del evento",
      validation: (Rule) => [Rule.required()],
    },
    {
      title: "Venta de entradas",
      name: "sell",
      type: "boolean",
      description:
        "¿La venta de entradas esta activa? Si no lo esta, no se mostrará el botón de compra",
      initialValue: true,
      hidden: ({ document }) => document?.active === false,
    },
    {
      name: "sell_type",
      title: "Metodo de venta",
      type: "string",
      validation: (Rule) => Rule.required(),
      hidden: ({ document }) =>
        document?.active === false || document?.sell === false,
      options: {
        list: SELL_TYPE.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
    },
    {
      name: "ticket",
      type: "object",
      title: "Adhesión al evento",
      description: "Precios y cantidades de entradas disponibles en cada tanda",
      hidden: ({ document }) =>
        document?.active === false || document?.sell === false,
      fields: [
        {
          name: "ubication",
          title: "Ubicación",
          type: "object",
          hidden: ({ document }) =>
            document?.active === false ||
            document?.sell === false ||
            document?.sell_type !== "ubication",
          fields: [
            {
              title: "Ringside",
              type: "object",
              name: "ringside_tickets",
              fields: [
                {
                  title: "Precio",
                  name: "price",
                  type: "number",
                  initialValue: 0,
                  validation: (Rule) =>
                    Rule.positive().error(
                      "El precio tiene que ser un número positivo"
                    ),
                },
                {
                  title: "Cantidad",
                  name: "amount",
                  type: "number",
                  initialValue: 0,
                  validation: (Rule) =>
                    Rule.positive().error(
                      "La cantidad tiene que ser un número positivo"
                    ),
                },
              ],
            },
            {
              title: "General",
              type: "object",
              name: "general_tickets",

              fields: [
                {
                  title: "Precio",
                  name: "price",
                  type: "number",
                  initialValue: 0,
                  validation: (Rule) =>
                    Rule.positive().error(
                      "El precio tiene que ser un número positivo"
                    ),
                },
                {
                  title: "Cantidad",
                  name: "amount",
                  type: "number",
                  initialValue: 0,
                  validation: (Rule) =>
                    Rule.positive().error(
                      "La cantidad tiene que ser un número positivo"
                    ),
                },
              ],
            },
          ],
        },
        {
          name: "batch",
          type: "object",
          title: "Tandas",
          hidden: ({ document }) =>
            document?.active === false ||
            document?.sell === false ||
            document?.sell_type !== "batch",
          fields: [
            {
              title: "Primera tanda",
              type: "object",
              name: "firsts_tickets",
              fields: [
                {
                  title: "Precio",
                  name: "price",
                  type: "number",
                  initialValue: 0,
                  validation: (Rule) =>
                    Rule.positive().error(
                      "El precio tiene que ser un número positivo"
                    ),
                },
                {
                  title: "Cantidad",
                  name: "amount",
                  type: "number",
                  initialValue: 0,
                  validation: (Rule) =>
                    Rule.positive().error(
                      "La cantidad tiene que ser un número positivo"
                    ),
                },
              ],
            },
            {
              title: "Segunda tanda",
              type: "object",
              name: "seconds_tickets",

              fields: [
                {
                  title: "Precio",
                  name: "price",
                  type: "number",
                  initialValue: 0,
                  validation: (Rule) =>
                    Rule.positive().error(
                      "El precio tiene que ser un número positivo"
                    ),
                },
                {
                  title: "Cantidad",
                  name: "amount",
                  type: "number",
                  initialValue: 0,
                  validation: (Rule) =>
                    Rule.positive().error(
                      "La cantidad tiene que ser un número positivo"
                    ),
                },
              ],
            },
            {
              title: "Tercera tanda",
              type: "object",
              name: "thirds_tickets",

              fields: [
                {
                  title: "Precio",
                  name: "price",
                  type: "number",
                  initialValue: 0,
                  validation: (Rule) =>
                    Rule.positive().error(
                      "El precio tiene que ser un número positivo"
                    ),
                },
                {
                  title: "Cantidad",
                  name: "amount",
                  type: "number",
                  initialValue: 0,
                  validation: (Rule) =>
                    Rule.positive().error(
                      "La cantidad tiene que ser un número positivo"
                    ),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "sponsors_array",
      type: "object",
      title: "Sponsors",
      hidden: ({ document }) => document?.active === false,
      fields: [
        {
          name: "sponsors",
          type: "array",
          title: "Sponsor",
          of: [
            {
              name: "sponsor_image",
              type: "image",
              title: "Image",
              fields: [
                {
                  name: "sponsor_name",
                  type: "string",
                  title: "Nombre del Sponsor",
                },
                {
                  name: "sponsor_url",
                  type: "url",
                  title: "URL del Sponsor",
                },
              ],
            },
          ],
          options: {
            layout: "grid",
          },
        },
      ],
      preview: {
        select: {
          images: "images",
          image: "images.0",
        },
        prepare(selection) {
          const { images, image } = selection;

          return {
            title: `Gallery block of ${Object.keys(images).length} images`,
            subtitle: `Alt text: ${image.alt}`,
            media: image,
          };
        },
      },
    },
    {
      name: "gallery",
      type: "object",
      title: "Galería de fotos",
      description: "Selecciona las mejores 10 fotos del evento",
      hidden: ({ document }) => document?.active === true,
      fields: [
        {
          name: "images",
          type: "array",
          title: "Images",
          of: [
            {
              name: "image",
              type: "image",
              title: "Image",
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Texto alternativo",
                  description:
                    "Describe la imagen para personas con discapacidad visual",
                },
                {
                  name: "photographer",
                  title: "Fotofrafo/a",
                  type: "reference",
                  description: "Quien fue el fotografo/a de la imagen",
                  to: [{ type: "author" }],
                },
                {
                  title: "¿La foto es vertical?",
                  name: "vertical",
                  type: "boolean",
                  initialValue: false,
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
          options: {
            layout: "grid",
          },
        },
      ],
      preview: {
        select: {
          images: "images",
          image: "images.0",
        },
        prepare(selection) {
          const { images, image } = selection;

          return {
            title: `Gallery block of ${Object.keys(images).length} images`,
            subtitle: `Alt text: ${image.alt}`,
            media: image,
          };
        },
      },
    },
    {
      title: "¿Es un torneo?",
      name: "is_tournament",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "tournament_billboard",
      type: "object",
      title: "Luchas del torneo",
      hidden: ({ document }) => document?.is_tournament === false,
      fields: [
        {
          name: "images",
          type: "array",
          title: "Images",
          of: [
            {
              name: "image",
              type: "image",
              title: "Image",
              fields: [
                {
                  name: "type_of_match",
                  type: "string",
                  title: "Tipo de lucha",
                },
                {
                  name: "url",
                  type: "url",
                  title: "URL del video promocional",
                },
                {
                  name: "referenceStaff",
                  title: "Staff",
                  type: "array",
                  description: "Equipo que participa en la lucha",
                  hidden: ({ document }) => document?.active === false,
                  validation: (Rule) => Rule.unique(),
                  of: [
                    {
                      type: "reference",
                      to: [{ type: "staff" }],
                    },
                  ],
                  options: {
                    layout: "grid",
                  },
                },
              ],
            },
          ],
          options: {
            layout: "grid",
          },
        },
      ],
      preview: {
        select: {
          images: "images",
          image: "images.0",
        },
        prepare(selection) {
          const { images, image } = selection;

          return {
            title: `Gallery block of ${Object.keys(images).length} images`,
            subtitle: `Alt text: ${image.alt}`,
            media: image,
          };
        },
      },
    },
    {
      name: "billboard",
      type: "object",
      title: "Luchas confirmadas",
      hidden: ({ document }) => document?.active === false,
      fields: [
        {
          name: "images",
          type: "array",
          title: "Images",
          of: [
            {
              name: "image",
              type: "image",
              title: "Image",
              fields: [
                {
                  name: "type_of_match",
                  type: "string",
                  title: "Tipo de lucha",
                },
                {
                  name: "referenceStaff",
                  title: "Staff",
                  type: "array",
                  description: "Equipo que participa en la lucha",
                  hidden: ({ document }) => document?.active === false,
                  validation: (Rule) => Rule.unique(),
                  of: [
                    {
                      type: "reference",
                      to: [{ type: "staff" }],
                    },
                  ],
                  options: {
                    layout: "grid",
                  },
                },
              ],
            },
          ],
          options: {
            layout: "grid",
          },
        },
      ],
      preview: {
        select: {
          images: "images",
          image: "images.0",
        },
        prepare(selection) {
          const { images, image } = selection;

          return {
            title: `Gallery block of ${Object.keys(images).length} images`,
            subtitle: `Alt text: ${image.alt}`,
            media: image,
          };
        },
      },
    },
    {
      name: "promotion_video",
      type: "object",
      title: "Video promocional",
      hidden: ({ document }) => document?.active === false,
      fields: [
        {
          name: "title",
          type: "string",
          title: "Titulo del video promocional (Aparecera arriba del video)",
        },
        {
          name: "url",
          type: "url",
          title: "URL del video promocional",
        },
      ],
    },
    {
      name: "videoUrl",
      type: "url",
      title: "URL de la grabación del evento",
      hidden: ({ document }) => document?.active === true,
    },
    {
      title: "Asitencia al evento",
      name: "assistance",
      type: "number",
      hidden: ({ document }) => document?.active === true,
    },
    {
      type: "text",
      name: "playlist",
      title: "Playlist de Spotify",
      description: "Solo debes agregar el atributo 'src' del iframe de Spotify",
      hidden: ({ document }) => document?.active === true,
    },
    {
      name: "referenceStaff",
      title: "Staff",
      type: "array",
      description: "Equipo que participo en el evento",
      hidden: ({ document }) => document?.active === true,
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: "reference",
          to: [{ type: "staff" }],
        },
      ],
    },
    {
      name: "discounts",
      title: "Códigos de descuento",
      type: "array",
      hidden: ({ document }) => document?.active === false,
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: "reference",
          to: [{ type: "discountCodes" }],
        },
      ],
    },
    {
      name: "disclaimer",
      title: "Disclaimer",
      type: "array",
      hidden: ({ document }) => document?.active === false,
      validation: (Rule) => Rule.unique(),
      description:
        "Debes seleccionar el disclaimer del evento, si no hay uno seleccionado, no se mostrara el botón de compra.",
      of: [
        {
          type: "reference",
          to: [{ type: "disclaimer" }],
        },
      ],
    },
    {
      name: "faq",
      title: "Faqs",
      type: "array",
      hidden: ({ document }) => document?.active === false,
      validation: (Rule) => Rule.unique(),
      description: "Debes seleccionar el conjunto de preguntas",
      of: [
        {
          type: "reference",
          to: [{ type: "faqs" }],
        },
      ],
    },
    {
      title: "SEO",
      name: "seo_description",
      type: "text",
      description:
        "Describe brevemente el evento, este texto aparecerá en los resultados de búsqueda de Google (160 caracteres)",
      validation: (Rule) =>
        Rule.max(160).warning("No puede exceder los 160 caracteres"),
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      poster: "poster",
    },
    prepare({ title, subtitle, poster }) {
      const formattedDate = new Date(subtitle).toLocaleDateString("es-CL", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      return {
        title,
        subtitle: formattedDate,
        media: poster,
      };
    },
  },
});
