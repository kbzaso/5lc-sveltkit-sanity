<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import Header from "$lib/components/Header.svelte";

  export let data: PageData;

  $: ({ posts, events, settings, welcome } = data);


</script>

<svelte:head>
  <title>{settings.title}</title>
  <meta name="description" content={settings.description} />
</svelte:head>


<div class="">
  <Header 
    imageTitle={urlForImage(welcome.imageTitle).crop("focalpoint").url()} 
    preTitle={welcome.preTitle}
    textTitle={welcome.textTitle}
    backgroundImage={urlForImage(welcome.backgroundImage).crop("focalpoint").url()}
    description={welcome.description}
    />
</div>
