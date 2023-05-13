<script lang="ts">
  import type { PageData } from "../$types";
  import CardStaff from "$lib/components/CardStaff.svelte";

  export let data: PageData;

  $: ({ allStaff } = data);
</script>

<svelte:head>
  <title>5 Luchas Clandestino</title>
</svelte:head>

<div class="container mt-36 mx-auto px-4">
  <h1 class="text-7xl text-primary">Staff</h1>
  <div
    class="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5"
  >
    {#each allStaff as staff}
      <a class="lg:mb-20 xl:mb-0" href={`/staff/${staff.slug}`}>
        <CardStaff {staff} />
      </a>
    {/each}
  </div>
</div>
