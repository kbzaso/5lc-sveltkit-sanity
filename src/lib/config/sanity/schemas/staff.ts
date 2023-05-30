import { BookIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you
 * create or edit a post in the studio.
 *
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

  export const STAFF_TYPE = [
    {title: 'Luchador/a', value: 'wrestler'},
    {title: 'Presentador/a', value: 'annonceurs'},
    {title: 'Arbitro/a', value: 'referee'},
    {title: 'Producción', value: 'production'},
  ]

export default defineType({
  name: "staff",
  title: "Staff",
  icon: BookIcon,
  type: "document",
  fields: [
    {
      name: 'staffType',
      title: 'Tipo de Staff',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: STAFF_TYPE.map(({title, value}) => ({title, value})),
        layout: 'radio',
    },
    },
    {
      name: "title",
      title: "Nombre del Luchador/a o Staff",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pseudonym",
      title: "Seudonimo",
      type: "string",
    },
    {
      name: "staffImage",
      title: "Imgen del Staff",
      type: "image",
      validation: (Rule) => Rule.required(),
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
          validation: (Rule) => Rule.required(),
          to: [{ type: "author" }],
        },
      ],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      name: "description",
      title: "Descripción del personaje",
      validation: (Rule) => Rule.required(),
      hidden: ({ document }) => document?.staffType === 'production',
    },
    {
      title: "SEO",
      name: "seo_description",
      type: "text",
      description:
        "Describe brevemente el miembro del equipo, este texto aparecerá en los resultados de búsqueda de Google (160 caracteres)",
      validation: Rule => Rule.max(120).warning(`No puede superar los 160 caracteres`),
      hidden: ({ document }) => document?.staffType === 'production',
    },
    {
      name: "gallery",
      type: "object",
      title: "Galería de fotos",
      hidden: ({ document }) => document?.staffType === 'production',
      description:
        "Sube entre 5 y 10 fotos en acción sobre el ring, recuerda que las imagenes no pueden pesar mas de 500kb",
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
      name: "data",
      type: "object",
      title: "Información del Luchador/a",
      fields: [
        {
          name: "weight",
          title: "Peso",
          type: "number",
          hidden: ({ document }) => document?.staffType === 'annonceurs' || document?.staffType === 'production' || document?.staffType === 'referee',
        },
        {
          name: "height",
          title: "Altura",
          type: "number",
          hidden: ({ document }) => document?.staffType === 'annonceurs' || document?.staffType === 'production' || document?.staffType === 'referee',
        },
        {
          name: "date",
          title: "Debut en la Bóveda Secreta",
          type: "datetime",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "social",
      type: "object",
      title: "Redes sociales",
      fields: [
        {
          title: "instagram",
          name: "instagram",
          type: "url",
        },
        {
          name: "facebook",
          title: "Facebook",
          type: "url",
        },
        {
          name: "youtube",
          title: "Youtube",
          type: "url",
        },
        {
          name: "twitter",
          title: "Twitter",
          type: "url",
        },
        {
          name: "tiktok",
          title: "Tiktok",
          type: "url",
        },
        {
          name: "other",
          title: "Otra",
          type: "url",
        },
      ],
    },
  ],
});
