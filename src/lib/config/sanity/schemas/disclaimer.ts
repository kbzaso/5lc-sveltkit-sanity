import { defineType } from "sanity";
import {DocumentsIcon} from '@sanity/icons'

export default defineType({
  name: "disclaimer",
  title: "Disclaimers",
  type: "document",
  icon: DocumentsIcon,
  fields: [ 
    {
      name: "title",
      title: "Titulo del disclaimer",
      type: "string",
      initialValue: "Titulo del sitio",
      validation: (rule) => rule.required(),
    },
    {
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      name: "disclaimer",
      title: "Disclaimer",
    },
  ],
});
