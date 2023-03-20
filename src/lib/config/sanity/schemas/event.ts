import { defineType } from 'sanity';

export default defineType({
	name: "event",
	title: "Events",
	type: "document",
	fields: [
	  {
		type: "string",
		name: "title",
		title: "Title",
		description: "Titulo del evento",
		validation: Rule => [Rule.required()]
	  },
	  {
		name: 'slug',
		title: 'Slug',
		type: 'slug',
		options: {
			source: 'title',
			maxLength: 96,
		},
		validation: (Rule) => Rule.required(),
	},
	  {
		type: "array",
		of: [
		  {
			"type": "block"
		  }
		],
		name: "description",
		title: "Description",
		description: "Descripción del evento",
		validation: Rule => [Rule.required()]
	  },
	  {
		type: "image",
		options: {
		  accept: ".jpg,.png,.svg,.avif"
		},
		name: "poster",
		title: "Poster",
		description: "Afiche del evento",
		validation: Rule => [Rule.required()]
	  }
	]
  });


