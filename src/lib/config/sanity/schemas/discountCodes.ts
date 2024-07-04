import { defineType } from "sanity";

export default defineType({
  name: "discountCodes",
  title: "Códigos de descuento",
  type: "document",
  fields: [ 
    {
      name: "code",
      title: "Código",
      type: "string",
      initialValue: "BUNDYSPECIAL",
      validation: (rule) => rule.required(),
    },
      {
      name: "percentage",
      title: "Descuento en %",
      description: "El descuento es en porcentaje al valor del producto",
      type: "number",
      initialValue: 0,
      validation: Rule => Rule.positive().max(100).error('La cantidad tiene que ser un número positivo y menor a 100').required(),
    },
    {
      name: "description",
      title: "Descripción",
      description: "Para qué es el descuento? Esto es de uso interno.",
      type: "text",
      initialValue: "Descripción del descuento",
      validation: (rule) => rule.required(),
    },
    {
      name: "active",
      title: "Activo",
      type: "boolean",
      initialValue: true,
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'code',
      subtitle: 'percentage',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `${subtitle}%`,
      };
    }
  }
});
