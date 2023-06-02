<script lang="ts">
  import { PortableText } from "@portabletext/svelte";
  import type { InputValue } from "@portabletext/svelte/ptTypes";

  export let preTitle = "";
  export let description: InputValue = [];
  export let imageTitle = "";
  export let textTitle = "";
</script>

<div
  id="header"
  class={`bg-[url('https://cdn.sanity.io/images/izngoptr/production/67836059903820f9cb2e62c1dc4afe078516e61d-1500x1000.jpg?q=80&fit=max&auto=format')] bg-cover bg-center h-screen relative`}
>
  <div
    class="absolute bottom-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent h-96 w-full"
  />
  <div
    class="container relative mx-auto flex flex-col justify-end h-screen pb-28 px-4"
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

    <p class="text-sm md:text-lg lg:max-w-4xl prose">
      <PortableText value={description} />
    </p>
  </div>
</div>
