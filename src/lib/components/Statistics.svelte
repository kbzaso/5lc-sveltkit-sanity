<script lang="ts">
  import { BASE_URL_ASSETS } from "$lib/const";
  import { animate, inView } from "motion";
  import { onMount } from "svelte";

  onMount(() => {
    // scroll((progress: number) => console.log(progress));
    inView(".motion", (info) => {
      console.log("The link ", info.target.id, " has entered the viewport")
      const animation = animate(".motion", { opacity: 1 }, { duration: 0.5 })
      return () => animation.stop();
    });
  });
</script>

<section
  class="mb-20 lg:mb-40 mt-20 mx-auto flex flex-col items-center md:flex-row gap-10 md:gap-0 md:justify-center lg:max-w-6xl"
>
  <div
    class="h-[380px] w-56 md:w-4/12 flex flex-col items-center relative grow motion opacity-0"
  >
    <span class="text-white font-ibm italic text-6xl z-10 pt-56 lg:pt-60"
      >+170</span
    >
    <span
      class="font-[AtomicMarker] text-7xl -rotate-6 mt-4 text-primary z-10 mix-blend-plus-lighter"
      >Eventos</span
    >
    <span
      class="font-[AtomicMarker] text-4xl -rotate-3 text-primary z-10 mix-blend-plus-lighter"
      >realizados</span
    >
    <img
      src={`${BASE_URL_ASSETS}/5luchas/kira-natalia-ivan.jpg`}
      alt="Lucha libre en la Bóveda Secreta"
      class="absolute opacity-60 object-cover h-[380px] w-full"
    />
  </div>
  <div
    class="h-[380px] w-56 md:w-4/12 flex flex-col items-center relative grow motion opacity-0"
  >
    <span class="text-white font-ibm italic text-6xl z-10 pt-60">+850</span>
    <span
      class="font-[AtomicMarker] text-6xl -rotate-6 mt-4 text-primary z-10 mix-blend-plus-lighter"
      >Luchas</span
    >
    <span
      class="font-[AtomicMarker] text-5xl -rotate-3 text-primary z-10 mix-blend-plus-lighter"
      >vividas</span
    >
    <img
      src={`${BASE_URL_ASSETS}/5luchas/intensidad.jpg`}
      alt="Lucha libre en la Bóveda Secreta"
      class="absolute opacity-60 object-cover h-[380px] w-full"
    />
  </div>
  <div
    class="h-[380px] w-56 md:w-4/12 flex flex-col items-center relative grow motion opacity-0"
  >
    <span class="text-white font-ibm italic text-6xl z-10 pt-60">+13.600</span>
    <span
      class="font-[AtomicMarker] text-5xl lg:text-6xl -rotate-6 mt-4 text-primary z-10 mix-blend-plus-lighter"
      >Adhesiones</span
    >
    <img
      src={`${BASE_URL_ASSETS}/5luchas/dylan-camilove.jpg`}
      alt="Lucha libre en la Bóveda Secreta"
      class="absolute opacity-60 object-cover h-[380px] w-full"
    />
  </div>
</section>
