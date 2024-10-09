<script lang="ts">
  import { media } from "$lib/const/index"

  type Info = {
    title: string;
    subtitle?: string;
    description: string;
    image?: string;
    video?: string;
    media?: [];
  };

  export let info: Info;
  export let containerClass: string = "";
  export let titleClass: string = "text-7xl md:text-[150px]";
  export let descriptionClass: string = "";
  export let cta: boolean = false;
  export let tag: string = "span";
</script>

<section
  class={`mx-auto ${containerClass} relative w-full max-h-[700px] 2xl:max-h-[1000px] min-w-[375px]`}
>
  {#if info.video}
    <div
      class="z-10 absolute top-1/2 max-w-6xl lg:left-1/2 lg:-translate-x-[50%] translate-y-[150px] md:-translate-y-[150px] xl:-translate-y-[100px] lg:-translate-y-[80px] space-y-4 flex flex-col lg:flex-row lg:items-end w-full justify-between px-4 lg:mx-0"
    >
      <div class="space-y-4">
        <h1
          class={`text-white drop-shadow-xl ${titleClass} uppercase flex flex-col `}
        >
          <span class="text-5xl font-ibm drop-shadow-2xl">{info.subtitle}</span>
          <span
            class="font-[AtomicMarker] bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500"
          >
            {info.title}
          </span>
        </h1>
        <p class={`text-gray-300 ${descriptionClass}`}>
          {info.description}
        </p>
      </div>
      <div class="flex flex-col lg:items-end justify-end">
        <p class="text-sm text-gray-300">Hemos aparecido en:</p>
        <div class="flex flex-wrap gap-4 mt-4">
          {#each media as media}
            <img
              src={media.url}
              alt="Logo de la revista"
              class="h-5"
            />
          {/each}
        </div>
      </div>
    </div>
    <video
      id="bg_video"
      autoplay
      loop
      class="w-full h-[400px] md:h-[600px] lg:h-[800px] object-cover object-bottom z-0 maskImages"
      poster="https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/zzvzz41vo88dfhoief9v"
      muted
      playsinline
      ><source src={info.video} />
      <!-- <source
        src="https://cdn.prod.website-files.com/63458a69c8844adfbb0236cd/6596bd9cd5c5805231b3ac72_Glovox 2023 (alta) (1)_1-transcode.webm"
        data-wf-ignore="true"
      /> -->
    </video>
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
