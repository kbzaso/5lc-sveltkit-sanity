<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import { convertNewlinesToBreaks } from "$lib/utils/index";

  export let attractions;
</script>

<section id="attractions" class="w-full mt-20">
  <h5
    class="text-4xl font-ibm italic mask text-left md:text-center text-white mb-4"
  >
    <span aria-hidden="true" class="font-[AtomicMarkerExtras] text-primary"
      >H</span
    >
    Servicios y Facilidades
  </h5>
  <div class="flex flex-col md:flex-row gap-4">
    {#each attractions.item as attraction, index}
      <div
        class="h-[380px] w-full md:min-w-4/12 flex flex-col items-start relative"
      >
        <span
          class="font-[AtomicMarker] text-5xl -rotate-6 mt-4 text-primary z-10 mix-blend-plus-lighter pt-56 lg:pt-60"
          >{attraction.title}</span
        >
        <p class="text-xs px-2 pt-4">{attraction.description}</p>
        <img
          src={urlForImage(attraction.asset).url()}
          alt="Atractivo de la Bóveda Secreta"
          class="absolute opacity-60 object-cover h-[380px] w-full maskImages"
        />
      </div>
    {/each}
  </div>
</section>
