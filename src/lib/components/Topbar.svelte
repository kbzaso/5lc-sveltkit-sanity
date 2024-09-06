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

<a
  href="https://www.5luchas.cl/eventos/rey-clandestino-2024"
  target="_self"
  class="h-12 flex justify-center items-center gap-2 bg-error text-black relative slideDown"
>
  <span class="relative flex h-3 w-3">
    <span
      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
    />
    <span class="relative inline-flex rounded-full h-3 w-3 bg-white" />
  </span>

  <span
    class={`font-ibm italic text-lg uppercase`}
    >{isMobile
      ? "Asegura tu cupo en Rey Clandestino"
      : "ENTRADAS RINGSIDE AGOTADAS PARA REY CLANDESTINO: ASEGURA TU ENTRADA GENERAL"}</span
  >

  <span> 🎫 </span>
</a>

<style>
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .slideDown {
    animation: slideDown 0.5s ease-in-out forwards;
  }
</style>
