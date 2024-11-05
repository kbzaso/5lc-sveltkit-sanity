<script lang="ts">
  import "./../../styles.css";
  import type { PageData } from "./$types";
  export let data: PageData;
  import Footer from "$lib/components/Footer.svelte";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  import { onNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import Nav from "$lib/components/Nav.svelte";

  onMount(() => {
    injectSpeedInsights();
  });

  $: ({ settings } = data);

  onNavigate((navigation) => {
    if (!(document as any).startViewTransition) return;

    return new Promise((resolve) => {
      (document as any).startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:window />

<svelte:head>
  <meta name="view-transition" content="same-origin" />
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
  <script defer src="https://umami-production-da63.up.railway.app/script.js" data-website-id="ffab1633-eea1-4614-bfe9-0a580ab41cd9"></script>
  <link
    rel="preload"
    href="/fonts/AtomicMarkerExtras.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="/fonts/AtomicMarkerExtras.woff"
    as="font"
    type="font/woff"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="/fonts/AtomicMarker.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="/fonts/AtomicMarker.woff"
    as="font"
    type="font/woff"
    crossorigin="anonymous"
  />
</svelte:head>

<div
  class={`flex flex-col min-h-screen min-w-[375px]`}
>
  <Nav
    logo={settings.logo}
  />
  <section
    class="grow selection:bg-fuchsia-300 selection:text-fuchsia-900 h-full"
  >
    <slot />
  </section>

  <Footer />
</div>
