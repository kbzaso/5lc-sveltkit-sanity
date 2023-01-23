import { getSanityServerClient, overlayDrafts } from '$lib/config/sanity/client';
import { allPostsQuery, eventFields} from '$lib/config/sanity/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params }) => {
	const posts = await getSanityServerClient(false).fetch(allPostsQuery);
	const events = await getSanityServerClient(false).fetch(eventFields);

	if (!posts) {
		throw error(500, 'Posts not found');
	}

	if(!events){
		throw error(500, 'Event not found')
	}

	return {
		posts, events
	};
};
