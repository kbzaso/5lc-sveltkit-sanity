<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "../$types";
  import { LocaleConfig } from "$lib/utils/index";

  export let data: PageData;

  $: ({ events, results } = data);
</script>

<svelte:head>
  <title>5 Luchas Clandestino</title>
</svelte:head>

<main class="container mx-auto px-4 mt-36 mb-20 space-y-20">
  <div>
    <figure>
      <img src="/eventos.svg" class="h-24" alt="Titulo eventos" />
    </figure>
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

  <div>
    <figure>
      <img src="/resultados.svg" class="h-24" alt="Titulo eventos" />
    </figure>
    <div
      class="mt-8 grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] lg:grid-cols-2"
    >
      {#if results && results.length > 0}
        {#each results as result}
          <a href={`events/${result.slug}`}>
            <div class="card xl:card-side border border-white/25 rounded-none">
              <figure class="h-96 ">
                <img
                  class="object-cover"
                  src={urlForImage(result.poster).url()}
                  alt={`Afiche del evento ${result.title}`}
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title text-primary">{result.title}</h2>
                <time
                  class="italic text-gray-500"
                  datetime={result.date.toString()}
                >
                  {new Date(result.date).toLocaleDateString(
                    "es-CL",
                    LocaleConfig
                  )}
                </time>
                <p class="text-gray-400 ">{result.extract}</p>
              </div>
            </div>
          </a>
        {/each}
      {:else}
        <p>Ups! No tenemos resultado en nuestra base de datos.</p>
      {/if}
    </div>
  </div>
</main>
