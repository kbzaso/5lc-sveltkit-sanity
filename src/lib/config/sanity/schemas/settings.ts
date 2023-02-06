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
			type: "string",
			name: "description",
			title: "Descripción",
			validation: Rule => [Rule.required()]
		  }
	],
	"preview": {
	  "prepare": () => ({ title: 'Settings' })
	}
});