import { getSanityServerClient, overlayDrafts } from '$lib/config/sanity/client';
import { allPostsQuery, allEventsQuery, settingsQuery, welcomeQuery, nextEventQuery} from '$lib/config/sanity/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params }) => {
	const posts = await getSanityServerClient(false).fetch(allPostsQuery);
	const events = await getSanityServerClient(false).fetch(allEventsQuery);
	const settings = await getSanityServerClient(false).fetch(settingsQuery);
	const welcome = await getSanityServerClient(false).fetch(welcomeQuery);
	let nextEvent = await getSanityServerClient(false).fetch(nextEventQuery);

	if (!posts) {
		throw error(500, 'Posts not found');
	}

	if(!events){
		throw error(500, 'Event not found')
	}
	if(!settings){
		throw error(500, 'Settings not found')
	}
	if(!welcome){
		throw error(500, 'Settings not found')
	}
	if(!nextEvent){
		nextEvent = false
	}

	return {
		posts, events, settings, welcome, nextEvent
	};
};
