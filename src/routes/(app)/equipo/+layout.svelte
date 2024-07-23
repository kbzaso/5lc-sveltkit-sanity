<script>
  import { page } from "$app/stores";
  $: pathname = $page.url.pathname;
</script>

<div
  class="flex flex-col md:flex-row container mt-28 mx-auto px-4 min-w-[320px] gap-8"
>
  <ul
    class="menu bg-zinc-900 menu-horizontal md:menu-vertical md:w-56 h-fit self-center md:self-start fixed bottom-4 md:sticky md:top-28 z-30 shadow-lg shadow-black"
  >
    <li>
      <a
        href="/equipo/luchadores"
        class:active={pathname === "/equipo/luchadores"}>Luchadores</a
      >
    </li>
    <li>
      <a href="/equipo/arbitros" class:active={pathname === "/equipo/arbitros"}
        >Arbitros</a
      >
    </li>
    <li>
      <a
        href="/equipo/presentadores"
        class:active={pathname === "/equipo/presentadores"}>Presentadores</a
      >
    </li>
    <!-- <li><a href="/equipo/staff">Staff</a></li> -->
  </ul>
  <slot />
</div>
