<script lang="ts">
  import { sineIn } from "svelte/easing";
  let hidden2 = true;
  let spanClass = "mx-0 px-0 font-ibm-sans text-lg w-full";
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };
  import { urlForImage } from "$lib/config/sanity";
  import { onDestroy, onMount } from "svelte";
  import MobileNavMenu from "$lib/components/MobileNavMenu.svelte";

  export let logo: string;

  let mobileNavMenu: any;

  let isScrolled = false;

  // Function to handle scroll event
  const handleScroll = () => {
    isScrolled = window.scrollY > 60;
  };

  // Add scroll event listener on mount
  onMount(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
  });

  // Remove scroll event listener on destroy
  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", handleScroll);
    }
  });
</script>

<div
  id="navbar"
  class={`w-full py-2 top-0 px-4 z-40 pt-2 fixed ${
    isScrolled ? "backdrop-blur-md bg-black/25" : ""
  } transition-blur`}
>
  <div
    class="flex w-full justify-between items-center container mx-auto max-w-6xl"
  >
    <a href="/">
      <img
        src={urlForImage(logo).url()}
        class="w-28"
        width="112"
        height="63"
        alt="Logo 5LC"
      />
    </a>
    <button
    id="drawer-button"
      on:click={() => mobileNavMenu.openSheet()}
      aria-label="Open menu"
      class="btn btn-primary drawer-button md:hidden">Menu</button
    >
    <div class="flex-none hidden md:flex">
      <nav class="menu menu-horizontal px-1 gap-2">
        <a
          class="btn btn-ghost text-primary font-ibm font-black text-xl italic normal-case"
          href="/">Inicio</a
        >
        <div class="dropdown dropdown-end">
          <label
            tabindex="0"
            class="flex gap-1 btn btn-ghost focus-within:bg-zinc-900 border-none text-primary font-ibm font-black text-xl italic cursor-pointer normal-case"
            >Equipo
            <svg
              viewBox="0 0 24 20"
              width="28px"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                stroke="#fff"
                class="stroke-primary"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 7l6 6 6-6"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-zinc-900 rounded-none w-52"
          >
            <li class="hover:bg-primary rounded-none normal-case">
              <a class="hover:text-black" href="/equipo/luchadores"
                >Luchadores</a
              >
            </li>
            <li class="hover:bg-primary rounded-none normal-case">
              <a class="hover:text-black" href="/equipo/arbitros">Arbitros</a>
            </li>
            <li class="hover:bg-primary rounded-none normal-case">
              <a class="hover:text-black" href="/equipo/presentadores"
                >Presentadores</a
              >
            </li>
          </ul>
        </div>

        <a
          class="btn btn-ghost text-primary font-ibm font-black text-xl italic normal-case"
          href="/eventos">Eventos pasados</a
        >

        <button
          class="btn btn-ghost text-primary font-ibm font-black text-xl italic normal-case"
          data-tally-open="31AeNQ"
          data-tally-overlay="1"
          data-tally-emoji-text="👋"
          data-tally-emoji-animation="wave">Contacto</button
        >
      </nav>
    </div>
  </div>
</div>
<!-- Drawer Menu -->
<MobileNavMenu bind:this={mobileNavMenu} />


<style>
  .transition-blur {
    transition: backdrop-filter 0.3s ease, background-color 0.3s ease;
  }

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

  #navbar {
    animation: slideDown 0.5s ease-in-out forwards;
  }
  </style>
