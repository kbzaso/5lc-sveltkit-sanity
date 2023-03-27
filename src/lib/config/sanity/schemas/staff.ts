import { BookIcon } from "@sanity/icons";
import { defineType } from "sanity";

import eventType from "./event";

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you
 * create or edit a post in the studio.
 *
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  name: "staff",
  title: "Staff",
  icon: BookIcon,
  type: "document",
  fields: [
	{
		title: '¿Es un luchador/a?',
		name: 'active',
		type: 'boolean',
		description: "Si no lo es, es un staff y los campos de luchador no se muestran",
		initialValue: true
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
		hidden: ({ document }) => document?.active === false,
	  },
    {
      name: "staffImage",
      title: "Imgen del Staff",
      type: "image",
	  validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
		type: "image",
    name: "imageTitle",
    title: "Imagen con texto",
    hidden: ({ document }) => document?.active === false,
		options: {
		  accept: ".png,.svg,.avif,.webp",
		},
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
      name: "data",
      type: "object",
      title: "Información del Luchador/a",
	  hidden: ({ document }) => document?.active === false,
      fields: [
        {
          name: "weight",
          title: "Peso",
          type: "number",
        },
        {
          name: "height",
          title: "Altura",
          type: "number",
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
