<script lang="ts">
  import type { PageData } from "../$types";
  import { urlForImage } from "$lib/config/sanity";
  import CardStaff from "$lib/components/CardStaff.svelte";
  import { page } from "$app/stores";

  export let data: PageData;
  $: ({ allWrestlers } = data);

  let seo_image = urlForImage($page.data.settings?.logo).url();
</script>

<svelte:head>
  <title>Equipo | {$page.data.settings.title}</title>
  <meta
    name="description"
    content={`Todos los miembros que hacen posible 5 Luchas Clandestino, luchadores, staff, producción.`}
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
  <meta property="twitter:title" content={`Equipo de 5 Luchas Clandestino`} />
  <meta
    property="twitter:description"
    content={`Todos los miembros que hacen posible 5 Luchas Clandestino, luchadores, staff, producción.`}
  />

  <meta property="og:title" content={`Equipo de 5 Luchas Clandestino`} />
  <meta
    property="og:description"
    content={`Todos los miembros que hacen posible 5 Luchas Clandestino, luchadores, staff, producción.`}
  />
  <meta property="og:url" content={`${$page.url.href}`} />
</svelte:head>

<div class="w-full">
  <h1 class="text-3xl font-bold leading-8 text-white sm:text-4xl">Luchadores</h1>
  <div
    class="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-w-[320px]"
  >
    {#each allWrestlers as wrestler}
      <a class="mb-6 sm:mb-0 lg:mb-20 xl:mb-0" href={`/equipo/luchadores/${wrestler.slug}`}>
        <CardStaff staff={wrestler} />
      </a>
    {/each}
  </div>
</div>
