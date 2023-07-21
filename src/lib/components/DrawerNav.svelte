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

  export let logo: string;
  export let logoBlack: string;
  export let bovedin: string;

</script>

<div
  class="container flex w-full justify-between top-0 items-center py-2 px-2 left-[50%] translate-x-[-50%] z-40 pt-2 bg-black/75 fixed backdrop-blur-md"
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
    on:click={() => (hidden2 = false)}
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
          <svg viewBox="0 0 24 20"  width="28px" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path stroke="#fff" class="stroke-primary" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7l6 6 6-6"/>
          </svg>
          </label
        >
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-zinc-900 rounded-none w-52"
        >
          <li
            class="hover:bg-primary hover:text-black rounded-none normal-case"
          >
            <a href="/equipo/luchadores">Luchadores</a>
          </li>
          <li
            class="hover:bg-primary hover:text-black rounded-none normal-case"
          >
            <a href="/equipo/arbitros">Arbitros</a>
          </li>
          <li
            class="hover:bg-primary hover:text-black rounded-none normal-case"
          >
            <a href="/equipo/presentadores">Presentadores</a>
          </li>
        </ul>
      </div>

      <div class="dropdown dropdown-end">
        <label
          tabindex="0"
          class="flex gap-1 btn btn-ghost focus-within:bg-zinc-900 border-none text-primary font-ibm font-black text-xl italic cursor-pointer normal-case"
          >Eventos <svg viewBox="0 0 24 20"  width="28px" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path stroke="#fff" class="stroke-primary" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7l6 6 6-6"/>
          </svg></label
        >
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-zinc-900 rounded-none w-52"
        >
          <li
            class="hover:bg-primary hover:text-black rounded-none normal-case"
          >
            <a href="/eventos">Próximos eventos</a>
          </li>
          <li
            class="hover:bg-primary hover:text-black rounded-none normal-case"
          >
            <a href="/resultados">Resultados</a>
          </li>
        </ul>
      </div>
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

<Drawer
  divClass="overflow-y-auto z-50 p-4 bg-primary"
  transitionType="fly"
  {transitionParams}
  bind:hidden={hidden2}
  id="sidebar2"
>
  <div class="flex items-center">
    <img src={urlForImage(logoBlack).url()} alt="Logo de 5LC" />
    <CloseButton on:click={() => (hidden2 = true)} class="mb-4 text-black" />
  </div>
  <Sidebar>
    <SidebarWrapper divClass="overflow-y-auto py-4 px-0 rounded-sm w-full">
      <SidebarGroup>
        <SidebarItem
          href="/"
          label="Inicio"
          on:click={() => (hidden2 = true)}
        />
        <SidebarDropdownWrapper label="Equipo">
          <!-- <svelte:fragment slot="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
          </svelte:fragment> -->
          <SidebarDropdownItem
            data-sveltekit-preload-data="hover"
            on:click={() => (hidden2 = true)}
            href="/equipo/luchadores"
            label="Luchadores"
          />
          <SidebarDropdownItem
            data-sveltekit-preload-data="hover"
            on:click={() => (hidden2 = true)}
            href="/equipo/arbitros"
            label="Arbitros"
          />
          <SidebarDropdownItem
            data-sveltekit-preload-data="hover"
            on:click={() => (hidden2 = true)}
            href="/equipo/presentadores"
            label="Presentadores"
          />
        </SidebarDropdownWrapper>
        <SidebarDropdownWrapper label="Eventos">
          <!-- <svelte:fragment slot="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
          </svelte:fragment> -->
          <SidebarDropdownItem
            data-sveltekit-preload-data="hover"
            on:click={() => (hidden2 = true)}
            href="/eventos"
            label="Próximos eventos"
          />
          <SidebarDropdownItem
            data-sveltekit-preload-data="hover"
            on:click={() => (hidden2 = true)}
            href="/resultados"
            label="Resultados"
          />
        </SidebarDropdownWrapper>

        <SidebarDropdownWrapper label="Redes sociales">
          <!-- <svelte:fragment slot="icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
            </svelte:fragment> -->
          <SidebarDropdownItem
            href="http://www.instagram.com/5luchas"
            label="Instagram"
          />
          <SidebarDropdownItem
            href="https://www.youtube.com/@5LuchasClandestino"
            label="Youtube"
          />
          <SidebarDropdownItem
            href="https://www.facebook.com/5luchas/"
            label="Facebook"
          />
        </SidebarDropdownWrapper>
        <SidebarItem
          data-tally-open="31AeNQ"
          data-tally-overlay="1"
          data-tally-emoji-text="👋"
          data-tally-emoji-animation="wave"
          label="Contacto"
          on:click={() => (hidden2 = true)}
        />
      </SidebarGroup>
      <picture class="absolute bottom-0 left-0 landscape:hidden">
        <img class="w-40" src={urlForImage(bovedin).url()} alt="Bovedin" />
      </picture>
    </SidebarWrapper>
  </Sidebar>
</Drawer>
