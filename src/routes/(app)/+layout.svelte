<script lang="ts">
    import './../../styles.css'
    import { urlForImage } from "$lib/config/sanity";
    import type { PageData } from "./$types";

    import Footer from '$lib/components/Footer.svelte';

    export let data: PageData;

    $: ({ settings, staff } = data);

    const siteMap = {
        home: {
            index: '/',
            title: 'Inicio',
        },
        staff: {
            index: '/staff',
            title: 'Equipo',
        },
        events: {
            index: '/events',
            title: 'Eventos',
        },
        posts: '/posts',
    }
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@1,700&display=swap" rel="stylesheet">

<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap" rel="stylesheet">

</svelte:head>

<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
        <div class="w-full px-8 py-4 md:px-4 fixed flex justify-center z-50">
            <div class="container flex w-full justify-between items-center">
                <a href="/">
                <img src={urlForImage(settings.logo).url()} class="w-28" alt="Logo 5LC">
                </a>
                <label for="my-drawer" class="btn btn-primary drawer-button">Menu</label>
                </div>
            </div>
        <slot />
        <Footer/>
    </div> 
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-primary text-base-100 relative">
        <img src={urlForImage(settings.logoBlack).url()}  alt="Logo de 5 luchas clandestino">
         <!-- Sidebar content here -->
        <li class="mt-10"><button class="hover:bg-base-100 hover:text-primary font-bold uppercase tracking-widest" on:click={() => location.href = siteMap.home.index}>{siteMap.home.title}</button></li>
        {#if staff.length > 0}
        <li><button class="hover:bg-base-100 hover:text-primary font-bold uppercase tracking-widest" on:click={() => location.href = siteMap.staff.index}>{siteMap.staff.title}</button></li>
        {/if}
        <li><button class="hover:bg-base-100 hover:text-primary font-bold uppercase tracking-widest" on:click={() => location.href = siteMap.events.index}>{siteMap.events.title}</button></li>
        <picture class="absolute bottom-0 left-0">
            <img src={urlForImage(settings.bovedin).url()} alt="Bovedin">
        </picture>
      </ul>
    </div>
</div> 