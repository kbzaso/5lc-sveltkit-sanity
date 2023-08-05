<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "../$types";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";

  export let data: PageData;

  $: ({ events } = data);

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
    {#if events && events.length > 0}
      <h1 class="text-3xl font-bold leading-8 text-white sm:text-4xl">
        Eventos
      </h1>
      <div class="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {#each events as result}
          <a href={`eventos/${result.slug}`}>
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
    {/if}

    {#if events && events.length === 0}
      <div class="flex flex-col items-center justify-center mt-20">
        <h2
          class="text-3xl font-bold leading-8 text-white sm:text-4xl font-ibm text-center"
        >
          No tenemos eventos programados
        </h2>
        <p class="text-center mt-4 prose mb-4 text-gray-400">
          Esperamos prontamente anunciar una próxima fecha, mientras tanto
          puedes revisar nuestros eventos pasados
          <a href="/resultados" class="text-primary hover:text-accent">
            aquí
          </a>
        </p>
        <img
          src="https://media2.giphy.com/media/l0HUoARsBRbpGOsXm/giphy.gif?cid=6c09b9529c6a234ab4d136b91c0ca8a7768b8a7db519d931&ep=v1_internal_gifs_gifId&rid=giphy.gif&ct=g"
          alt=""
        />
      </div>
    {/if}
  </div>
</main>
