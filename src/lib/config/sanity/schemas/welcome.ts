import { defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "welcome",
  title: "Welcome",
  icon: DocumentIcon,
  type: "document",
  fields: [
    {
      type: "string",
      name: "preTitle",
      title: "Pre titulo",
      description: "Agrega un pretitulo",
      validation: (Rule) => [Rule.required()],
    },
    {
      type: "image",
      options: {
        accept: ".png,.svg",
      },
      name: "imageTitle",
      title: "Imagen con texto",
      description: "Esta imagen se usara para el titulo",
    },
    {
      type: "string",
      name: "textTitle",
      title: "Placeholder del titulo",
      description:
        "Agrega un placeholder por si la imagen del titulo no carga o tiene un error",
      validation: (Rule) => [Rule.required()],
    },
    {
      type: "string",
      name: "horizontalLine",
      title: "Barra horizontal",
      description: "Agrega el mensaje que quieres que aparezca en movimiento en el home",
    },
    {
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            {
              title: "Paragraph",
              value: "normal",
            },
          ],
          marks: {
            annotations: [],
            decorators: [
              {
                title: "Bold",
                value: "strong",
              },
              {
                title: "Italics / Emphasis",
                value: "em",
              },
              {
                title: "Underline",
                value: "underline",
              },
              {
                title: "Strike-through",
                value: "strike-through",
              },
            ],
          },
        },
      ],
      name: "description",
      title: "Descripción",
      description:
        "Agrega una leve descripción que represente el espiritu de 5LC",
      validation: (Rule) => [Rule.required()],
    },
  ],
  preview: {
    prepare: () => ({ title: "Welcome" }),
  },
});
