<script lang="ts">
  import { PortableText } from "@portabletext/svelte";
  import type { InputValue } from "@portabletext/svelte/ptTypes";
  import { page } from "$app/stores";
  import { urlForImage } from "$lib/config/sanity";

  export let preTitle = "";
  export let description: InputValue = [];
  export let imageTitle = "";
  export let textTitle = "";
</script>

<section>
  <div
    id="header"
    class={`container mx-auto h-[600px] lg:h-[800px] relative -mt-20`}
  >
    <div
      class="container mx-auto flex flex-col justify-end px-4 absolute bottom-4 lg:bottom-0 z-10 h-full"
    >
      <h1 class="text-xl uppercase tracking-widest lg:-mb-4 text-white">
        ¡{preTitle}!
      </h1>
      <div class="w-full">
        {#if !imageTitle}
          <h1>{textTitle}</h1>
        {:else}
          <img
            src={imageTitle}
            alt="Siempre buena onda"
            width="902"
            height="109"
          />
        {/if}
      </div>

      <p class="text-md md:text-lg lg:max-w-4xl prose">
        <PortableText value={description} />
      </p>
    </div>
    <img src={urlForImage($page.data.welcome.heroImage).url()} alt="Portada" class="object-contain lg:object-cover absolute w-full h-full">
    <div
      class="absolute bottom-0 bg-gradient-to-t from-black/100 via-black/90 lg:via-black/40 to-transparent h-96 md:h-[300px] w-full"
    />
  </div>
</section>
