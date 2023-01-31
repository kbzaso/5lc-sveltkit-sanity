<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ posts, events } = data);

</script>

<svelte:head>
  <title>5 Luchas Clandestino</title>
</svelte:head>


<div class="h-screen bg-blue-200">
  <h1 class="text-sm bg-red-500 text-black p-10">CONTENIDOs WEB</h1>
</div>
