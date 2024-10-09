<script lang="ts">
  import { BASE_URL_ASSETS } from "$lib/const";
</script>

<section>
  <div
    class="grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 w-full mx-auto max-w-7xl"
  >
    <div class="h-96 w-full wrap">
      <div
      class="text-6xl lg:text-8xl text-primary mix-blend-plus-lighter relative"
      >

      <p class="font-[AtomicMarker] text-center absolute -bottom-10 -rotate-6 left-4 text-pretty">Siempre Buena Onda</p
        >
      </div>

      <img src={`${BASE_URL_ASSETS}/home_siempre_buena_onda.avif`} alt="Asistentes al evento asombrados" class="object-cover h-full w-full">
    </div>

    <div class="h-96 w-full wrap">
      <div
      class="mix-blend-plus-lighter text-6xl lg:text-8xl text-primary relative"
      >

      <span class="font-[AtomicMarker] absolute -bottom-10 -rotate-6 left-[50%] -translate-x-[50%]">Intensidad</span
        >
      </div>

      <img src={`${BASE_URL_ASSETS}/home_intensidad.avif`} alt="" class="object-cover h-full w-full">
    </div>

    <div class="md:col-span-2 md:row-start-2 h-96 w-full wrap">
      <div
      class="text-6xl lg:text-8xl text-primary mix-blend-plus-lighter relative"
      >

      <span class="font-[AtomicMarker] absolute bottom-0 -rotate-6 left-[50%] -translate-x-[50%]">Comunidad</span
        >
      </div>

      <img src={`${BASE_URL_ASSETS}/home_boveda_secreta.avif`} alt="Comunidad 5 luchas clandestino" class="object-cover object-bottom h-[500px] w-full">
    </div>
  </div>
</section>

<style>
  .wrap {
  display: grid;
  & > * {
    grid-column: 1;
    grid-row: 1;
  }
}

</style>