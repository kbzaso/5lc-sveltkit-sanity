import { defineType } from "sanity";
import { BoltIcon } from "@sanity/icons";

export default defineType({
  name: "attraction",
  title: "Servicio y Facilidades",
  type: "document",
  icon: BoltIcon,
  fields: [
    {
      name: "title",
      title: "Evento",
      type: "string",
      initialValue: "Campanazo Inicial",
      validation: (rule) => rule.required(),
    },
    {
      name: "item",
      title: "Servicio o Facilidad",
      type: "array",
      of: [
        {
          type: "image",
          name: "service",
          fields: [
            {
              name: "title",
              title: "Titulo",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "description",
              title: "Descripción",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
});