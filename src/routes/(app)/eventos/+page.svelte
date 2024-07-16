<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "../$types";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import type { Event } from "$lib/types";

  export let data: PageData;

  // $: ({ results } = data);

  const searchEvents: Event[] = data.results.map((result: Event) => ({
    ...result,
    searchTerms: `${result.title}`,
  }));

  const searchEventsStore = createSearchStore(searchEvents);

  const unsubscribe = searchEventsStore.subscribe((value) => {
    searchHandler(value);
  });

  onDestroy(() => {
    unsubscribe();
  });

  let seo_image = urlForImage($page.data.settings?.logo).url();
</script>

<svelte:head>
  <title>Eventos | {$page.data.settings.title}</title>
  <meta
    name="description"
    content="Enterate de los próximos eventos de 5 Luchas Clandestino"
  />

  <meta
    content={`${$page.url.origin}/og?message=${seo_image}`}
    property="og:image"
  />
  <meta
    property="twitter:image"
    content={`${$page.url.origin}/og?message=${seo_image}`}
  />
  <meta
    property="twitter:card"
    content={`${$page.url.origin}/og?message=${seo_image}`}
  />
  <meta
    property="twitter:title"
    content={`Futuros eventos de 5 Luchas Clandestino`}
  />
  <meta
    property="twitter:description"
    content={`Enterate de cuendo será el próximo evento de 5 Luchas Clandestino`}
  />

  <meta
    property="og:title"
    content={`Futuros eventos de 5 Luchas Clandestino`}
  />
  <meta
    property="og:description"
    content={`Enterate de cuendo será el próximo evento de 5 Luchas Clandestino`}
  />
  <meta property="og:url" content={`${$page.url.href}`} />
</svelte:head>

<main class="container mx-auto px-4 mt-36 mb-20 space-y-20">
  <div>
    <h2 class="text-3xl sub-title text-white sm:text-4xl mt-6">
      Eventos pasados
    </h2>
    <label class="form-control w-full lg:max-w-xs">
      <div class="label">
        <span class="label-text">Buscador</span>
      </div>
      <input
        type="text"
        placeholder="Bovedinmanía..."
        class="input input-bordered w-full lg:max-w-xs"
        bind:value={$searchEventsStore.search}
      />
    </label>

    <div class="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {#each $searchEventsStore.filtered as result}
        <a href={`/eventos/${result.slug}`}>
          <div
            class="relative overflow-hidden w-full group border-gray-600 border hover:border-primary rounded-none transition-all h-fit md:h-96"
          >
            <figure class="z-10">
              <img
                width="600"
                height="600"
                loading="lazy"
                class="object-cover object-top h-72 md:h-96 w-full"
                src={urlForImage(result.poster)
                  .height(600)
                  .width(600)
                  .quality(80)
                  .url()}
                alt={result.title}
              />
            </figure>

            <div
              class="bg-zinc-900/50 h-max grow backdrop-blur-xl absolute bottom-0 z-10 w-full pb-4"
            >
              <p
                class="text-xs md:text-md uppercase tracking-wider md:tracking-widest text-white mt-4 px-4 pt-0"
              >
                <time datetime={result.date.toString()}>
                  {new Date(result.date).toLocaleDateString(
                    "es-CL",
                    LocaleConfig
                  )}
                </time>
              </p>

              <h2
                class="text-primary font-ibm italic text-2xl md:text-4xl px-4 pt-0"
              >
                {result.title}
              </h2>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</main>