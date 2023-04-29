<script lang="ts">
    import './../../styles.css'
    import { urlForImage } from "$lib/config/sanity";
    import type { PageData } from "./$types";
    import { page } from '$app/stores';

    import Footer from '$lib/components/Footer.svelte';

    export let data: PageData;

    $: ({ settings, staff } = data);

    let siteMap = [
        {
            index: '/',
            title: 'Inicio',
        },
        {
            index: '/staff',
            title: 'Equipo',
        },
        {
            index: '/events',
            title: 'Eventos',
        },
        {
            index: '/results',
            title: 'Resultados',
        },
    ]
    
</script>

<svelte:window />

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@1,700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap" rel="stylesheet">

</svelte:head>

<!-- <div bind:this={top} /> -->
<div id="main" class="drawer min-w-[350px] h-full">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content min-w-[350px]">
        <div class="w-full px-8 py-4 md:px-4 fixed flex justify-center z-50">
            <div class="container flex w-full justify-between items-center">
                <a href="/">
                <img src={urlForImage(settings.logo).url()} class="w-28" alt="Logo 5LC">
                </a>
                <label for="my-drawer" class="btn btn-primary drawer-button md:hidden">Menu</label>
                <div class="flex-none hidden md:flex">
                    <ul class="menu menu-horizontal px-1">
                        {#each siteMap as {index, title} }
                        <li><a class="text-primary font-ibm font-black text-2xl italic" href={index}>{title}</a></li>
                        {/each}
                    </ul>
                  </div>
                
                </div>
            </div>
            {#key $page.url.pathname}
                <slot />
            {/key}
        <Footer/>
    </div> 
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-primary text-base-100 relative">
        <img src={urlForImage(settings.logoBlack).url()}  alt="Logo de 5 luchas clandestino" class="mt-5 md:mb-10">
        {#each siteMap as {index, title} }
            <li>
                <a data-sveltekit-preload-data on:click={() => {document.getElementById('my-drawer').click()}} href={index} type="button" class="hover:bg-base-100 hover:text-primary font-bold uppercase tracking-widest">{title}
                </a>
            </li>
        {/each}
        <picture class="absolute bottom-0 left-0">
            <img src={urlForImage(settings.bovedin).url()} alt="Bovedin">
        </picture>
      </ul>
    </div>
</div> 