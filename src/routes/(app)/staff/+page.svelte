<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "../$types";
  import CardStaff from "$lib/components/CardStaff.svelte";

  export let data: PageData;

  $: ({ allStaff } = data);
</script>

<svelte:head>
  <title>5 Luchas Clandestino</title>
</svelte:head>

<div class="container mt-36 mx-auto px-4">
  <figure>
    <img src="/equipo.svg" class="h-24" alt="Titulo eventos" />
  </figure>
  <div class="mt-8 grid gap-6 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(20rem,2fr))] lg:grid-cols-4">
  {#each allStaff as staff}
    <CardStaff {staff} />
  {/each}
</div>
</div>