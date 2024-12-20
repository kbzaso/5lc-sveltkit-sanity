<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import InfiniteScroll from "$lib/components/InfiniteScroll.svelte";
  import CardEvent from "$lib/components/events/CardEvent.svelte";
  import SuscribeForm from "$lib/components/SuscribeForm.svelte";
  import { TinySlider } from "svelte-tiny-slider";
  import Slider from "$lib/components/equipo/Slider.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import WhoWeAre from "$lib/components/WhoWeAre.svelte";
  import Statistics from "$lib/components/Statistics.svelte";
  import Video from "$lib/components/Video.svelte";
  import { infoLanding, faq } from "$lib/const";

  export let data: PageData;

  $: ({ settings, events, allStaff, allStaff2 } = data);

  let isMobile = false;

  const checkScreenWidth = () => {
    isMobile = window.innerWidth <= 768;
  };

  let seo_image = urlForImage($page.data.settings?.logo).url();

  onMount(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => window.removeEventListener("resize", checkScreenWidth);
  });
</script>

<svelte:head>
  <title>{settings.title}</title>
  <meta
    name="description"
    content="Equipo humano que ve el espectáculo de la lucha libre como una herramienta de expresión creativa, enfocados en liberar el peso de la vida de nuestra comunidad."
  />

  <meta
    content={`${$page.url.origin}/og?message=${seo_image}`}
    property="og:image"
  />
  <meta
    property="twitter:image"
    content={`${$page.url.origin}/og?message=${seo_image}`}
  />
  <meta
    property="twitter:card"
    content={`${$page.url.origin}/og?message=${seo_image}`}
  />
  <meta property="twitter:title" content={`${settings.title}`} />
  <meta
    property="twitter:description"
    content={`Equipo humano que ve el espectáculo de la lucha libre como una herramienta de expresión creativa, enfocados en liberar el peso de la vida de nuestra comunidad.`}
  />

  <meta property="og:title" content={`${settings.title}`} />
  <meta
    property="og:description"
    content={`Equipo humano que ve el espectáculo de la lucha libre como una herramienta de expresión creativa, enfocados en liberar el peso de la vida de nuestra comunidad.`}
  />
  <meta property="og:url" content={`${$page.url.href}`} />
  <link rel="canonical" href="https://www.5luchas.cl" />
</svelte:head>

<div>
  {#if $page.data.welcome.horizontalLine}
    <InfiniteScroll />
  {/if}
  <Hero
    info={infoLanding.hero}
    tag="h1"
    titleClass="text-6xl md:mt-60"
    descriptionClass="text-xl max-w-2xl"
  />
  <main
    id="events"
    class="container mx-auto max-w-6xl relative mt-72 md:mt-28 lg:mt-10 xl:mt-20 scroll-mt-20"
  >
    {#if events.length > 0}
      <h2
        class="text-4xl font-bold text-white mask font-ibm italic mb-4 pl-4 xl:pl-0"
      >
        Próximos Eventos <span
          aria-hidden="true"
          class="font-[AtomicMarkerExtras] text-primary text-5xl">P</span
        >
      </h2>
      <div class="carousel carousel-center w-full space-x-4 pl-4 xl:pl-0 lg:ml-0">
        {#each events as event}
          <div class="carousel-item">
            <CardEvent {event} />
          </div>
        {/each}
        <div class="carousel-item">
          <SuscribeForm info={infoLanding.newsletter} width="w-64"/>
        </div>
      </div>
    {:else}
      <SuscribeForm info={infoLanding.newsletter} />
    {/if}
  </main>
  <Statistics />
  <Video url="https://youtu.be/v5Nj6oG-Fs0?si=Grt_PcZO9VohSpDg" />
  <Slider items={allStaff} reverse={false} />
  <Slider items={allStaff2} reverse={true} />
  <WhoWeAre />
  <Faq questions={faq} />
</div>
<Hero
  info={infoLanding.cta}
  containerClass={"min-h-[450px] lg:min-h-[600px]"}
  titleClass={"text-7xl"}
  descriptionClass={"font-ibm italic text-4xl"}
  cta={true}
/>