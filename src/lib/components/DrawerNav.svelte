<script lang="ts">
  import {
    Drawer,
    Button,
    CloseButton,
    Sidebar,
    SidebarBrand,
    SidebarCta,
    SidebarDropdownItem,
    SidebarDropdownWrapper,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";
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

  export let logo: string;
  export let logoBlack: string;
  export let bovedin: string;

  let isScrolled = false;

  // Function to handle scroll event
  const handleScroll = () => {
    isScrolled = window.scrollY > 60;
  };

  // Add scroll event listener on mount
  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
  });

  // Remove scroll event listener on destroy
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
    }
  });




// NAVBAR MOBILE
  import { fade, fly, slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { spring } from 'svelte/motion';

  let isOpen = false;
  let startY: number;
  let currentY: number;
  const sheetHeight = spring(75, { stiffness: 0.1, damping: 0.7 });

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  function handleTouchStart(event: TouchEvent) {
    startY = event.touches[0].clientY;
    currentY = startY;
  }

  function handleTouchMove(event: TouchEvent) {
    currentY = event.touches[0].clientY;
    const deltaY = currentY - startY;
    if (deltaY > 0) {
      event.preventDefault();
      const newHeight = Math.max(0, 75 - (deltaY / window.innerHeight) * 100);
      sheetHeight.set(newHeight);
    }
  }

  function handleTouchEnd() {
    const deltaY = currentY - startY;
    if (deltaY > window.innerHeight * 0.2) {
      closeSheet();
    } else {
      sheetHeight.set(100, { hard: false });
    }
  }

  function openSheet() {
    isOpen = true;
    sheetHeight.set(100, { hard: true });
    document.body.style.overflow = 'hidden';
  }

  function closeSheet() {
    sheetHeight.set(0, { hard: false }).then(() => {
      isOpen = false;
      document.body.style.overflow = '';
    });
  }

  onMount(() => {
    sheetHeight.set(75);
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

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

<div id="navbar"
  class={`w-full py-2 top-0 px-4 z-40 pt-2 fixed ${isScrolled ? 'backdrop-blur-md bg-black/25' : ''} transition-blur`}
>
  <div class="flex w-full justify-between items-center container mx-auto max-w-6xl">
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
    on:click={openSheet} aria-label="Open menu"
      class="btn btn-primary drawer-button md:hidden">Menu</button
    >
    <div class="flex-none hidden md:flex ">
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
{#if isOpen}
  <div
    class="fixed inset-x-0 bottom-0 z-50 bg-black overflow-hidden"
    style="height: {$sheetHeight}vh;"
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
    transition:fly={{ y: 200, duration: 300 }}
  >
    <div class="cursor-grab active:cursor-grabbing">
      <div class="grid p-2 ">
        <svg class="h-6 w-6 text-gray-400 justify-self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16" />
        </svg>
        <button
          on:click={closeSheet}
          class="p-2 absolute right-2 text-primary hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-label="Close menu"
        >
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex flex-col h-full overflow-y-auto">
      
      <div class="flex-grow">
        <div class="flex flex-col space-y-2 p-4">
          {#each navItems as item}
            <a
              href={item.href}
              class="w-full text-left px-4 py-6 text-lg font-medium text-primary font-ibm italic"
              on:click={closeSheet}
            >
              {item.name}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}