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
  <title>Resultados | {$page.data.settings.title}</title>
  <meta name="description" content='Revisa los resultados de los últimos eventos de 5 Luchas Clandestino' />

  <meta content={`${$page.url.origin}/og?message=${seo_image}`}  property="og:image">
  <meta property="twitter:image" content={`${$page.url.origin}/og?message=${seo_image}`} >
  <meta property="twitter:card" content={`${$page.url.origin}/og?message=${seo_image}`}>
  <meta property="twitter:title" content={`Eventos pasados de 5 Luchas Clandestino`}>
  <meta property="twitter:description" content={`Revisa los resultados de los últimos eventos de 5 Luchas Clandestino`}>

  <meta property="og:title" content={`Eventos pasados de 5 Luchas Clandestino`}>
  <meta property="og:description" content={`Revisa los resultados de los últimos eventos de 5 Luchas Clandestino`} />
  <meta property="og:url" content={`${$page.url.href}`}>
</svelte:head>

<main class="container mx-auto px-4 mt-36 mb-20 space-y-20 ">
  <div>
    <h1 class="max-2xl text-7xl text-primary">Resultados</h1>
    <div class="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {#if results && results.length > 0}
        {#each results as result}
          <a href={`results/${result.slug}`}>
            <div
              class="relative overflow-hidden w-full group border-gray-600 border hover:border-primary rounded-none transition-all h-fit md:h-96"
            >
              <figure class="z-10">
                <img
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
                class="bg-zinc-900/50 h-max grow backdrop-blur-xl absolute bottom-0 z-20 w-full pb-4"
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

                <h3
                  class="text-primary font-ibm italic text-2xl md:text-4xl px-4 pt-0"
                >
                  {result.title}
                </h3>
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
