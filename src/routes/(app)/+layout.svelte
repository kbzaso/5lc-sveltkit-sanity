<script lang="ts">
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  inject({ mode: dev ? "development" : "production" });

  import "./../../styles.css";
  import type { PageData } from "./$types";
  export let data: PageData;
  import DrawerNav from "$lib/components/DrawerNav.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { fade } from "svelte/transition";

  import navigationState from "$lib/stores/navigationState";
  import PageLoader from "$lib/components/PageLoader.svelte";
  import { afterNavigate, beforeNavigate } from "$app/navigation";

  $: ({ settings } = data);

  beforeNavigate(() => {
    navigationState.set("loading");
  });
  afterNavigate(() => {
    navigationState.set("loaded");
  });
</script>

<svelte:window />

{#if $navigationState === "loading"}
  <div out:fade={{ delay: 500 }}>
    <PageLoader />
  </div>
{/if}

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@1,700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap"
    rel="stylesheet"
  />
  <script async src="https://analytics.umami.is/script.js" data-website-id="86ceac1e-89c3-42ea-abef-dbfac5379da5"></script>
</svelte:head>

<DrawerNav
  logo={settings.logo}
  logoBlack={settings.logoBlack}
  bovedin={settings.bovedin}
/>
{#key data.url}
  <div
    class="selection:bg-fuchsia-300 selection:text-fuchsia-900"
    in:fade={{ duration: 300, delay: 300 }}
    out:fade={{ duration: 100, delay: 0 }}
  >
    <slot />
  </div>
{/key}
<Footer />
