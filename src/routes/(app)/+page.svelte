<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ posts, events } = data);

</script>

<svelte:head>
  <title>5 Luchas Clandestino</title>
</svelte:head>


