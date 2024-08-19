<script lang="ts">
  import { onMount } from "svelte";

  type Info = {
    title: string;
    description: string;
    image?: string;
    video?: string;
  };

  export let info: Info;
  export let containerClass: string = "min-h-svh lg:min-h-[800px]";
  export let titleClass: string = "text-7xl md:text-[150px]";
  export let descriptionClass: string = "text-lg";
  export let cta: boolean = false;
  export let tag: string = "span";
</script>

<section
  class={`mx-auto ${containerClass} relative h-dvh w-full max-w-[100vw] md:aspect-video md:h-[80vh] xl:h-full  min-w-[375px]`}
>
  {#if info.video}
  <h1
        class={`text-primary font-[AtomicMarker] ${titleClass} z-10 mix-blend-plus-lighter absolute bottom-60 sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-[180px] -rotate-3`}
      >
        {info.title}
      </h1>
      <p class={`text-white pt-8 w-full md:max-w-xl z-10 ${descriptionClass} absolute bottom-24 px-4 sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-[50px] text-center`}>
        {info.description}
      </p>
    <video
      id="bg_video"
      autoplay
      loop
      class="w-full h-full object-cover object-top maskImages z-0 opacity-60"
      poster="https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/zzvzz41vo88dfhoief9v"
      muted
      playsinline
      ><source
        src={info.video}
      />
      <!-- <source
        src="https://cdn.prod.website-files.com/63458a69c8844adfbb0236cd/6596bd9cd5c5805231b3ac72_Glovox 2023 (alta) (1)_1-transcode.webm"
        data-wf-ignore="true"
      /> -->
      </video
    >
  {:else}
  <div
    class="absolute px-4 z-10 h-full flex flex-col justify-end items-center text-center bottom-20 md:bottom-0 md:justify-center left-[50%] -translate-x-[50%] w-full"
  >
    {#if tag === "span"}
      <span class={`text-primary font-[AtomicMarker] ${titleClass} z-10`}>
        {info.title}
      </span>
    {:else}
      <h1 class={`text-primary font-[AtomicMarker] ${titleClass} z-10`}>
        {info.title}
      </h1>
    {/if}

    <p class={`text-white pt-8 w-full z-10 ${descriptionClass}`}>
      {info.description}
    </p>
    {#if cta}
      <a href="#events" class="btn btn-primary mt-4">¡Quiero ir!</a>
    {/if}
  </div>
    <img
      src={info.image}
      alt="Portada"
      class="object-cover md:object-cover absolute w-full h-full maskImages z-0 md:opacity-60"
    />
  {/if}
</section>
