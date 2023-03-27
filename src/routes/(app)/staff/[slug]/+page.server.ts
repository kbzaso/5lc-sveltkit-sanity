import { getSanityServerClient, overlayDrafts } from '$lib/config/sanity/client';
import { staffQuery } from '$lib/config/sanity/queries';
import type { Staff } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { previewMode } = await parent();

	const { staff, moreStaff} = await getSanityServerClient(previewMode).fetch<{
		staff: Staff;
		moreStaff: Staff[];
	}>(staffQuery, {
		slug: params.slug,
	});

	if (!staff) {
		throw error(404, 'Events not found');
	}

	return {
		previewMode,
		slug: staff?.slug || params.slug,
		initialData: {
			staff,
			moreStaff: overlayDrafts(moreStaff),
		},
	};
};
