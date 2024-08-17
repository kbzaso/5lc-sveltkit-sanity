<script lang="ts">
  import Youtube from "svelte-youtube-embed";
  import { Youtube as YTIcon } from "lucide-svelte";
</script>

<section
  class="container mx-auto max-w-6xl flex flex-col items-center relative"
>
  <h3 class="text-4xl font-bold text-white mask font-ibm italic mb-4 pl-4">
    <span class="font-[AtomicMarkerExtras] text-primary">k</span> Testimonios
    <span class="font-[AtomicMarkerExtras] text-primary">k</span>
  </h3>
  <div
    class="hidden lg:absolute lg:left-2 lg:flex lg:flex-col gap-10 lg:top-16"
  >
    <span class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >I</span
    >
    <span class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >F</span
    >
    <span class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >U</span
    >
  </div>
  <div class="container max-w-3xl lg:mb-20">
    <Youtube id="v5Nj6oG-Fs0" animations={false} --title-color={"transparent"}>
      <button class="bg-black/50 rounded-full p-4"
        ><YTIcon class="stroke-primary w-10 h-10" /></button
      >
    </Youtube>
  </div>
  <div
    class=" lg:absolute lg:right-2 flex lg:flex-col gap-10 lg:top-4 mt-6 mb-10"
  >
    <span class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >F</span
    >
    <span class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >I</span
    >
    <span class="font-[AtomicMarkerExtras] text-7xl lg:text-9xl text-primary"
      >U</span
    >
  </div>
</section>
