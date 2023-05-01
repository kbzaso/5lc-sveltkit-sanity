<script lang="ts">
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    
    inject({ mode: dev ? 'development' : 'production' });

    import './../../styles.css'
    import type { PageData } from "./$types";
    export let data: PageData;
    import DrawerNav from '$lib/components/DrawerNav.svelte';
    import Footer from '$lib/components/Footer.svelte';

    $: ({ settings } = data);

</script>

<svelte:window />

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap" rel="stylesheet">

</svelte:head>



<DrawerNav logo={settings.logo} logoBlack={settings.logoBlack} bovedin={settings.bovedin}/>
<slot />
<Footer/>
    