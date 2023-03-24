import { defineType } from 'sanity';

export default defineType({
	name: "event",
	title: "Events",
	type: "document",
	fields: [
		{
			title: '¿Es un evento activo?',
			name: 'active',
			type: 'boolean',
			description: "Si no lo es, es un evento pasado y debes agregar los resultados de las luchas",
			initialValue: false
		},
	  {
		type: "string",
		name: "title",
		title: "Nombre del evento",
		validation: Rule => [Rule.required()]
	  },
	  {
		name: 'slug',
		title: 'Slug',
		type: 'slug',
		description: "Dirección web del evento",
		options: {
			source: 'title',
			maxLength: 96,
		},
		validation: (Rule) => Rule.required(),
	},
	{
		name: 'date',
		title: 'Fecha y hora del evento',
		type: 'datetime',
		validation: Rule => [Rule.required()]
	},
	{
		title: 'El evento es en la Bóveda secreta?',
		name: 'boveda',
		type: 'boolean',
		initialValue: true
	},
	{
		name: 'venue',
		type: 'object',
		title: 'Dirección del evento',
		fields: [
			{
			  name: 'venueName',
			  type: 'string',
			  title: 'Nombre del lugar',
			  hidden: ({ document }) => document?.boveda === true
			},
			{
			  name: 'venueUrl',
			  type: 'url',
			  title: 'URL de google maps',
			  hidden: ({ document }) => document?.boveda === true
			},
			{
				name: 'venueAdress',
				type: 'string',
				title: 'Dirección del lugar',
				hidden: ({ document }) => document?.boveda === true
			  },
		  ]
	  },
	  {
		type: "array",
		of: [
		  {
			"type": "block"
		  }
		],
		name: "description",
		title: "Descripción del evento",
		hidden: ({ document }) => document?.active === false,
	  },
	  {
		type: "array",
		of: [
		  {
			"type": "block"
		  }
		],
		name: "result",
		title: "Resultados del evento",
		hidden: ({ document }) => document?.active === true,
	  },
	  {
		type: "string",
		name: "extract",
		title: "Extracto del evento",
		validation: Rule => [Rule.required(), Rule.max(160).warning(`A title shouldn't be more than 160 characters.`), Rule.max(160)]
	  },
	  {
		type: "image",
		options: {
		  accept: ".jpg,.png,.svg,.avif"
		},
		name: "poster",
		title: "Poster",
		description: "Afiche del evento",
		validation: Rule => [Rule.required()],
	  },
	  
	  {
		name: 'ticket',
		type: 'object',
		title: 'Adhesión al evento',
		hidden: ({ document }) => document?.active === false,
		fields: [
			{
				title: 'Precio de la entrada',
				name: 'price',
				type: 'number'
			  },
			  {
				name: 'url',
				type: 'url',
				title: 'Link de pago',
			  },
			{
				title: '¿Agotado?',
				name: 'soldOut',
				type: 'boolean',
				initialValue: false
			},
		]
	}
	]
  });


