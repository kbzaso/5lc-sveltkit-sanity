<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "../$types";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";

  export let data: PageData;

  $: ({ events, results } = data);

  let seo_image = urlForImage($page.data.settings?.logo).url();
</script>

<svelte:head>
  <title>Eventos | {$page.data.settings.title}</title>
  <meta name="description" content='{$page.data.settings.description}' />

  <meta content={`${$page.url.origin}/og?message=${seo_image}`}  property="og:image">
  <meta property="twitter:image" content={`${$page.url.origin}/og?message=${seo_image}`} >
  <meta property="twitter:card" content={`${$page.url.origin}/og?message=${seo_image}`}>
  <meta property="twitter:title" content={`Futuros eventos de 5 Luchas Clandestino`}>
  <meta property="twitter:description" content={`Enterate de cuendo será el próximo evento de 5 Luchas Clandestino`}>

  <meta property="og:title" content={`Futuros eventos de 5 Luchas Clandestino`}>
  <meta property="og:description" content={`Enterate de cuendo será el próximo evento de 5 Luchas Clandestino`} />
  <meta property="og:url" content={`${$page.url.href}`}>
</svelte:head>

<main class="container mx-auto px-4 mt-36 mb-20 space-y-20">
  <div>
    <h1 class="text-7xl text-primary">Eventos</h1>
    <div
      class="mt-8 grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] lg:grid-cols-2"
    >
      {#if events && events.length > 0}
        {#each events as event}
          <a href={`events/${event.slug}`}>
            <div class="card xl:card-side bg-zinc-900 rounded-none">
              <figure class="h-96 ">
                <img
                  class="object-cover"
                  src={urlForImage(event.poster).url()}
                  alt={`Afiche del evento ${event.title}`}
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title text-primary">{event.title}</h2>
                <time
                  class="italic text-gray-500"
                  datetime={event.date.toString()}
                >
                  {new Date(event.date).toLocaleDateString(
                    "es-CL",
                    LocaleConfig
                  )}
                </time>
                <p class="text-gray-400 ">{event.extract}</p>
              </div>
            </div>
          </a>
        {/each}
      {:else}
        <p>Ups! No tenemos eventos agendados por el momento.</p>
      {/if}
    </div>
  </div>
</main>
