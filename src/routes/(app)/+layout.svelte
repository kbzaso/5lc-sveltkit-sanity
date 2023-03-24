<script lang="ts">
    import './../../styles.css'
    import { urlForImage } from "$lib/config/sanity";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ settings } = data);

    const siteMap = {
        home: {
            index: '/',
            title: 'Inicio',
        },
        events: {
            index: '/events',
            title: 'Eventos',
        },
        posts: '/posts',
    }
</script>

<svelte:head>
    <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
    rel="stylesheet"
    />
</svelte:head>

<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
        <div class="flex w-full justify-between items-center md:container px-8 md:px-0 mt-4 fixed left-[50%] -translate-x-[50%]  z-50">
            <a href="/">
            <img src={urlForImage(settings.logo).url()} class="w-28" alt="Logo 5LC">
            </a>
            <label for="my-drawer" class="btn btn-primary drawer-button">Menu</label>
        </div>
        <slot />
    </div> 
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-primary text-base-100 relative">
        <img src={urlForImage(settings.logoBlack).url()}  alt="Logo de 5 luchas clandestino">
        <!-- Sidebar content here -->
        <li class="mt-10"><button class="hover:bg-base-100 hover:text-primary font-bold uppercase tracking-widest" on:click={() => location.href = siteMap.home.index}>{siteMap.home.title}</button></li>
        <li><button class="hover:bg-base-100 hover:text-primary font-bold uppercase tracking-widest" on:click={() => location.href = siteMap.events.index}>{siteMap.events.title}</button></li>
        <picture class="absolute bottom-0 left-0">
            <img src={urlForImage(settings.bovedin).url()} alt="Bovedin">
        </picture>
      </ul>
    </div>
</div>


