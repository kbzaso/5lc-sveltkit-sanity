import { CogIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export default defineType({
	name: 'settings',
	title: 'Settings',
	type: 'document',
	icon: CogIcon,
	fields: [
		{
			name: 'title',
			title: 'Titulo del sitio',
			type: 'string',
			initialValue: 'Titulo del sitio',
			validation: (rule) => rule.required(),
		},
		{
			type: "image",
			options: {
			  accept: ".png,.svg"
			},
			name: "logo",
			title: "Logo blanco",
			description: "Agrega el logotipo blanco del proyecto",
			validation: Rule => [Rule.required()]
		  },
		  {
			type: "image",
			options: {
			  accept: ".png,.svg"
			},
			name: "logoBlack",
			title: "Logo negro",
			description: "Agrega el logotipo blanco del proyecto",
			validation: Rule => [Rule.required()]
		  },
		  {
			type: "image",
			options: {
			  accept: ".png,.svg"
			},
			name: "bovedin",
			title: "Bovedin",
			description: "Agrega al bovedin del menu lateral",
			validation: Rule => [Rule.required()]
		  },
		{
			type: "string",
			name: "description",
			title: "Descripción para SEO",
			validation: Rule => [Rule.required()]
		  }
	],
	"preview": {
	  "prepare": () => ({ title: 'Settings' })
	}
});