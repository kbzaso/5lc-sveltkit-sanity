<script lang="ts">
  import { onMount } from "svelte";

  type Info = {
    title: string;
    description: string;
    image: string;
  };

  export let info: Info;
  export let containerClass: string = "min-h-svh lg:min-h-[800px]";
  export let titleClass: string = "text-7xl md:text-[150px]";
  export let descriptionClass: string = "text-lg";
  export let cta: boolean = false;
</script>

<section class={`mx-auto ${containerClass} relative`}>
  <div
    class="container absolute px-4 z-10 h-full flex flex-col justify-end items-center text-center bottom-20 md:bottom-0 md:justify-center left-[50%] -translate-x-[50%]"
  >
    <span
      class={`text-primary font-[AtomicMarker] ${titleClass} z-10 mix-blend-plus-lighter autoshow`}
    >
      {info.title}
    </span>

    <p class={`text-white pt-8 max-w-xl z-10 ${descriptionClass} autoshow`}>
      {info.description}
    </p>
    {#if cta}
      <a href="#events" class="btn btn-primary mt-4">¡Quiero ir!</a>
    {/if}
  </div>
  <img
    src={info.image}
    alt="Portada"
    class="object-cover md:object-cover absolute w-full h-full maskImages z-0 md:opacity-60 "
  />
</section>

<style>
</style>
