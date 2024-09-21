<script lang="ts">
  import Youtube from "svelte-youtube-embed";
  import { Youtube as YTIcon } from "lucide-svelte";
  import { extractYouTubeId } from "$lib/utils";
  import { onMount } from "svelte";

  export let url: string;
  export let title: string = "Testimonios";

  const videoId = extractYouTubeId(url);

  let isBaseRoute = false;

  onMount(() => {
    // Verifica si la ruta actual es la base
    isBaseRoute = location.pathname === '/';
  });
</script>

<section
  class="container mx-auto max-w-6xl flex flex-col items-center relative mt-20"
>
  <h3 class="text-4xl text-center font-bold text-white mask font-ibm italic mb-4 pl-4">
    <!-- <span aria-hidden="true"
    class="font-[AtomicMarkerExtras] text-primary text-5xl">P</span
  > -->
    {title}
    <span aria-hidden="true"
        class="font-[AtomicMarkerExtras] text-primary text-5xl">P</span
      >
  </h3>
  <div
    class={`${isBaseRoute ? 'hidden lg:absolute lg:left-2 lg:flex lg:flex-col gap-10 lg:top-16' : 'hidden'}`}
  >
    <span
      aria-hidden="true"
      class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >I</span
    >
    <span
      aria-hidden="true"
      class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >F</span
    >
    <span
      aria-hidden="true"
      class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >U</span
    >
  </div>
  <div class="lg:mb-20 z-10 border border-primary w-full">
    <Youtube id={videoId} animations={false} --title-color={"transparent"}>
      <button class="bg-black/50 rounded-full p-4"
        ><YTIcon class="stroke-primary w-10 h-10" /></button
      >
    </Youtube>
  </div>
  <div
    class={`${isBaseRoute ? 'lg:absolute lg:right-2 flex lg:flex-col gap-10 lg:top-4 mt-6 mb-10' : 'hidden'}`}
  >
    <span
      aria-hidden="true"
      class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >F</span
    >
    <span
      aria-hidden="true"
      class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >I</span
    >
    <span
      aria-hidden="true"
      class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >U</span
    >
  </div>
</section>
