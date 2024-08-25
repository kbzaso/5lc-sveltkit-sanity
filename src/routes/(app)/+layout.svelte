<script lang="ts">
  import "./../../styles.css";
  import type { PageData } from "./$types";
  export let data: PageData;
  import Footer from "$lib/components/Footer.svelte";
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import { onNavigate } from "$app/navigation";
  import { onMount } from 'svelte';
  import Nav from "$lib/components/Nav.svelte";

  onMount(() => {
    injectSpeedInsights();
  });

  $: ({ settings } = data);

  onNavigate((navigation) => {
      if (!(document as any).startViewTransition) return
  
      return new Promise((resolve) => {
        (document as any).startViewTransition(async () => {
          resolve()
          await navigation.complete
        })
      })
    })
</script>

<svelte:window />

<svelte:head>
  <meta name="view-transition" content="same-origin">
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
  <script
    async
    src="https://analytics.umami.is/script.js"
    data-website-id="86ceac1e-89c3-42ea-abef-dbfac5379da5"
  ></script>
</svelte:head>

<div class={`flex flex-col min-h-screen bg-grit bg-[length:500px_500px] bg-repeat min-w-[375px]`}>
  <Nav
    logo={settings.logo}
    logoBlack={settings.logoBlack}
    bovedin={settings.bovedin}
  />
  <section class="grow selection:bg-fuchsia-300 selection:text-fuchsia-900 h-full">
    <slot />
  </section>

  <Footer />
</div>
