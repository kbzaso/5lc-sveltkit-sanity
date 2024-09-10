<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import { TinySlider } from "svelte-tiny-slider";

  export let billboard;
  export let title: string = "Cartelera";
</script>

<section class="mt-10">
  <h3
    class="text-4xl font-bold text-white mask font-ibm italic mb-4 pl-4 text-center"
  >
    <span aria-hidden="true" class="font-[AtomicMarkerExtras] text-primary"
      >k</span
    >
    {title}
    <span aria-hidden="true" class="font-[AtomicMarkerExtras] text-primary"
      >k</span
    >
  </h3>
  <div id="catelera" class={`${billboard.length > 2 ? "columns-2 md:columns-3" : "columns-1 md:columns-2"} gap-4`}>
  {#each billboard as image}
      <img
        class="w-full h-auto"
        src={urlForImage(image).width(800).height(1000).url()}
        alt={image.type_of_match}
        title={image.type_of_match}
      />
      {/each}
    </div>
</section>
