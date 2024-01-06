import { defineType } from "sanity";

export default defineType({
  name: "disclaimer",
  title: "Disclaimers",
  type: "document",
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
