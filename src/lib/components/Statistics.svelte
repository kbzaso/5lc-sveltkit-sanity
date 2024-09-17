<script lang="ts">
  import { BASE_URL_ASSETS } from "$lib/const";
</script>

<section
  class="mb-20 lg:mb-40 mt-20 mx-auto flex flex-col items-center md:flex-row gap-10 md:gap-0 md:justify-center lg:max-w-6xl"
>
  <div
    class="h-[380px] w-56 md:w-4/12 flex flex-col items-center relative grow"
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
      src={`${BASE_URL_ASSETS}/home_eventos_realizados.avif`}
      alt="Lucha libre en la Bóveda Secreta"
      class="absolute opacity-60 object-cover h-[380px] w-full"
    />
  </div>
  <div
    class="h-[380px] w-56 md:w-4/12 flex flex-col items-center relative grow"
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
      src={`${BASE_URL_ASSETS}/home_luchas_vividas.avif`}
      alt="Lucha libre en la Bóveda Secreta"
      class="absolute opacity-60 object-cover h-[380px] w-full"
    />
  </div>
  <div
    class="h-[380px] w-56 md:w-4/12 flex flex-col items-center relative grow"
  >
    <span class="text-white font-ibm italic text-6xl z-10 pt-60">+13.600</span>
    <span
      class="font-[AtomicMarker] text-6xl -rotate-6 mt-4 text-primary z-10 mix-blend-plus-lighter"
      >Adhesiones</span
    >
    <img
      src={`${BASE_URL_ASSETS}/home_adhesiones.avif`}
      alt="Lucha libre en la Bóveda Secreta"
      class="absolute opacity-60 object-cover h-[380px] w-full"
    />
  </div>
</section>
