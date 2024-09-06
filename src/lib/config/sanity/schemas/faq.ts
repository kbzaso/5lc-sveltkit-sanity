import { defineType } from "sanity";
import {DocumentsIcon} from '@sanity/icons'

export default defineType({
  name: "faqs",
  title: "FAQs",
  type: "document",
  icon: DocumentsIcon,
  fields: [ 
    {
      name: "title",
      title: "Titulo del FAQ",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "faq",
      type: "object",
      title: "Faq",
      fields: [
        {
          name: "doubt",
          type: "array",
          title: "Pregunta",
          of: [
            {
              name: "question",
              type: "object",
              title: "Pregunta",
              fields: [
                {
                  name: "question",
                  type: "string",
                  title: "Nombre del Sponsor",
                },
                {
                  name: "answer",
                  type: "string",
                  title: "URL del Sponsor",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
