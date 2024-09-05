<script lang="ts">
  import { onMount } from "svelte";

  let isMobile = false;

  const checkScreenWidth = () => {
    isMobile = window.innerWidth <= 768;
  };

  onMount(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => window.removeEventListener("resize", checkScreenWidth);
  });
</script>

<a classrelative href="https://www.5luchas.cl/eventos/rey-clandestino-2024" target="_self"
  class="h-12 flex justify-center items-center gap-2 bg-error text-black"
>
<span class="relative flex h-3 w-3">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
    <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
  </span>

  <span class={`font-ibm italic text-lg uppercase ${isMobile ? 'capitalize' : 'tracking-widest '}`}
  >{isMobile
      ? "Últimas entradas Ringside para RC2024"
      : "¡Últimas entradas Ringside para el Rey Clandestino 2024!"}</span
  >


  <span class={`${isMobile ? 'hidden' : '' }`}>
  😱😱😱
</span>
</a>
