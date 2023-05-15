<script lang="ts">
  import type { PageData } from "../$types";
  import { urlForImage } from "$lib/config/sanity";
  import CardStaff from "$lib/components/CardStaff.svelte";
  import { page } from "$app/stores";

  
  export let data: PageData;
  $: ({ allStaff } = data);

  let seo_image = urlForImage($page.data.settings?.logo).url();
</script>

<svelte:head>
  <title>Equipo | {$page.data.settings.title}</title>
  <meta name="description" content={$page.data.settings.description} />

  <meta content={`${$page.url.origin}/og?message=${seo_image}`}  property="og:image">
  <meta property="twitter:image" content={`${$page.url.origin}/og?message=${seo_image}`} >
  <meta property="twitter:card" content={`${$page.url.origin}/og?message=${seo_image}`}>
  <meta property="twitter:title" content={`Equipo de 5 Luchas Clandestino`}>
  <meta property="twitter:description" content={`Todos los miembros que hacen posible 5 Luchas Clandestino, luchadores, staff, producción.`}>

  <meta property="og:title" content={`Equipo de 5 Luchas Clandestino`}>
  <meta property="og:description" content={`Todos los miembros que hacen posible 5 Luchas Clandestino, luchadores, staff, producción.`} />
  <meta property="og:url" content={`${$page.url.href}`}>
</svelte:head>

<div class="container mt-36 mx-auto px-4">
  <h1 class="text-7xl text-primary">Equipo</h1>
  <div
    class="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 min-w-[320px]"
  >
    {#each allStaff as staff}
      <a class="mb-6 sm:mb-0 lg:mb-20 xl:mb-0" href={`/staff/${staff.slug}`}>
        <CardStaff {staff} />
      </a>
    {/each}
  </div>
</div>
