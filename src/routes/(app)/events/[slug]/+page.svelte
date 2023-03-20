<script lang="ts">
  import { previewSubscription } from "$lib/config/sanity";
  import { eventQuery } from "$lib/config/sanity/queries";
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import {PortableText} from '@portabletext/svelte'

  export let data: PageData;

  $: ({ initialData, previewMode, slug } = data);
  $: ({ data: eventData } = previewSubscription(eventQuery, {
    params: { slug },
    initialData,
    enabled: previewMode && !!slug,
  }));
</script>

<svelte:head>
  <title>{$eventData?.event?.title || "Event"}</title>
</svelte:head>

{#if $eventData?.event}
  <div class="relative w-full bg-black min-h-screen px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
    <div class="relative mx-auto max-w-2xl">
      <div class="w-full space-y-8">
        <div>
          <a href="/" class="hover:underline font-bold text-sm text-white">← Back to home</a>
        </div>

        <div>
          <h1 class="text-4xl font-bold">{$eventData.event.title}</h1>
        </div>

        <img
          class="h-92 w-full object-cover rounded-xl mb-10"
          src={urlForImage($eventData.event.poster).crop("focalpoint").width(1344).height(736).url()}
          alt=""
        />

        <div class="prose prose-lg text-white">
          <PortableText
            value={$eventData.event.description}
          />
        </div>
      </div>
    </div>
  </div>
{/if}
