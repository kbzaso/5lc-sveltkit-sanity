<script lang="ts">
  import Youtube from "svelte-youtube-embed";
  import { Youtube as YTIcon } from "lucide-svelte";
  import { extractYouTubeId } from "$lib/utils";
  import { onMount } from "svelte";

  export let url: string
  export let title: string = "Testimonios";

  const videoId = extractYouTubeId(url);
</script>

<section
  class="container mx-auto max-w-6xl flex flex-col items-center relative"
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
    class='hidden lg:absolute lg:left-2 lg:flex lg:flex-col gap-10 lg:top-12'
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
  <div class="lg:mb-20 z-10 border border-primary w-full lg:w-[800px]">
    <Youtube id={videoId} animations={false} --title-color={"transparent"}>
      <button aria-label="Play" class="bg-black/50 rounded-full p-4"
        ><YTIcon class="stroke-primary w-10 h-10" /></button
      >
    </Youtube>
  </div>
  <div
    class='lg:absolute lg:right-0 flex lg:flex-col gap-10 lg:top-4 mt-6 mb-10'
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
