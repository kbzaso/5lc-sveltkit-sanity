import { defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    {
      title: "¿Es un evento activo?",
      name: "active",
      type: "boolean",
      description:
        "Si no lo es, es un evento pasado y debes agregar los resultados de las luchas",
      initialValue: false,
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
      validation: (Rule) => [Rule.required()],
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
        accept: ".jpg,.png,.svg,.avif",
        hotspot: true,
      },
      name: "poster",
      title: "Poster",
      description: "Afiche del evento",
      validation: (Rule) => [Rule.required()],
    },
    {
      name: "ticket",
      type: "object",
      title: "Adhesión al evento",
      hidden: ({ document }) => document?.active === false,
      fields: [
        {
          title: "Precio de la entrada",
          name: "price",
          type: "number",
        },
        {
          name: "url",
          type: "url",
          title: "Link de pago",
        },
        {
          title: "¿Agotado?",
          name: "soldOut",
          type: "boolean",
          initialValue: false,
        },
      ],
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
              options: {
                hotspot: true,
              },
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
              ],
            },
          ],
          options: {
            layout: "grid",
            hotspot: true,
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
      title: "Asitencia al evento",
      name: "assistance",
      type: "number",
      hidden: ({ document }) => document?.active === true,
      description: "Cantidad de personas que asistieron al evento",
    },
    {
      name: "referenceStaff",
      title: "Staff",
      type: "array",
      description: "Equipo que participo en el evento",
      hidden: ({ document }) => document?.active === true,
      of: [
        {
          type: "reference",
          to: [{ type: "staff" }],
        },
      ],
    },
    {
      title: 'SEO',
      name: 'seo_description',
      type: 'text',
      description: 'Describe brevemente el evento, este texto aparecerá en los resultados de búsqueda de Google (160 caracteres)',
      validation: (Rule) => Rule.required(),
      options: {
        maxLength: 160,
      },
    },
  ],
});
