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

  let siteMap = [
    {
      index: "/",
      title: "Inicio",
    },
    {
      index: "/staff",
      title: "Equipo",
    },
    {
      index: "/events",
      title: "Eventos",
    },
    {
      index: "/results",
      title: "Resultados",
    },
  ];

  export let logo: string;
  export let logoBlack: string;
  export let bovedin: string;
</script>

<div
  class="container flex w-full justify-between top-0 items-center absolute z-20 py-2 px-2 left-[50%] translate-x-[-50%]"
>
  <a href="/">
    <img src={urlForImage(logo).url()} class="w-28" alt="Logo 5LC" />
  </a>
  <button
    on:click={() => (hidden2 = false)}
    class="btn btn-primary drawer-button md:hidden">Menu</button
  >
  <div class="flex-none hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      {#each siteMap as { index, title }}
        <li>
          <a
            class="text-primary font-ibm font-black text-2xl italic"
            href={index}>{title}</a
          >
        </li>
      {/each}
    </ul>
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
        {#each siteMap as { index, title }}
          <SidebarItem
            href={index}
            label={title}
            {spanClass}
            data-sveltekit-preload-data="hover"
            on:click={() => (hidden2 = true)}
          />
        {/each}
        <!-- <SidebarDropdownWrapper label="E-commerce">
            <svelte:fragment slot="icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
            </svelte:fragment>
            <SidebarDropdownItem label="Products" />
            <SidebarDropdownItem label="Billing" />
            <SidebarDropdownItem label="Invoice" />
          </SidebarDropdownWrapper> -->
      </SidebarGroup>
      <picture class="absolute bottom-0 left-0">
        <img class="w-48" src={urlForImage(bovedin).url()} alt="Bovedin" />
      </picture>
    </SidebarWrapper>
  </Sidebar>
</Drawer>
