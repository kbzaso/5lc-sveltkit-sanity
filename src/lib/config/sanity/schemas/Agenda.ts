import { defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export default defineType({
  name: "agenda",
  title: "Agenda",
  type: "document",
  icon: CalendarIcon,
  fields: [
    {
      name: "title",
      title: "Evento",
      type: "string",
      initialValue: "Campanazo Inicial",
      validation: (rule) => rule.required(),
    },
    {
      name: "schedule",
      title: "Schedule",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Actividad",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "activity_date",
              title: "Hora de la actividad",
              type: "string",
              description: "Ejemplo: 10:00 AM",
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