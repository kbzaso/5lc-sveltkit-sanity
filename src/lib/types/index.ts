import type { InputValue } from '@portabletext/svelte/ptTypes';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface Post {
	_id: string;
	name: string;
	title: string;
	date: string;
	postContent: string;
	peo: string,
	coverImage: SanityImageSource;
	slug: string
	author: {
		name: string;
		picture: SanityImageSource;
	}
}

export interface Event {
	_id: string;
	name: string;
	title: string;
	date: string;
	boveda: boolean;
	venue: {
		venueName: string;
		venueUrl: string;
		venueAdress: string;
	}
	ticket: {
		url: string;
		price: number;
		soldOut: boolean;
	}
	description: InputValue;
	result: InputValue;
	active: boolean;
	extract: string;
	poster: SanityImageSource;
	slug: string
}

export interface Settings {
	title: string;
	description: string;
}

export interface Welcome {
	pretitle: string;
	imageTitle: SanityImageSource;
	textTitle: string;
	description: string;
}