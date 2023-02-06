import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface Post {
	_id: string;
	name: string;
	title: string;
	date: string;
	postContent: string;
	coverImage: SanityImageSource;
	slug: string
	author: {
		name: string;
		picture: SanityImageSource;
	}
}

export interface Event {
	name: string;
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