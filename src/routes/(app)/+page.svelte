<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import Header from "$lib/components/Hero.svelte";
  import { PortableText } from "@portabletext/svelte";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import ModalTickets from "$lib/components/events/BatchModalTickets.svelte";
  import InfiniteScroll from "$lib/components/InfiniteScroll.svelte";
  import CardEvent from "$lib/components/events/CardEvent.svelte";
  import DisclaimerModal from "$lib/components/DisclaimerModal.svelte";
  import SingleEvent from "$lib/components/SingleEvent.svelte";
  import SuscribeForm from "$lib/components/SuscribeForm.svelte";
  import { TinySlider } from "svelte-tiny-slider";
  import { ChevronRight } from "lucide-svelte";
  import CardStaff from "$lib/components/CardStaff.svelte";
  import Slider from "$lib/components/equipo/Slider.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import WhoWeAre from "$lib/components/WhoWeAre.svelte";
  import Statistics from "$lib/components/Statistics.svelte";
  import Video from "$lib/components/Video.svelte";

  export let data: PageData;

  $: ({ settings, nextEvent, events, allStaff, allStaff2 } = data);

  let isMobile = false;

  const checkScreenWidth = () => {
    isMobile = window.innerWidth <= 768;
  };

  let seo_image = urlForImage($page.data.settings?.logo).url();

  let formattedFirstsPrice: string;
  let formattedSecondsPrice: string;
  let formattedThirthsPrice: string;
  onMount(() => {
    let firstTicketPrice = nextEvent.ticket?.firsts_tickets?.price;
    let secondsTicketPrice = nextEvent.ticket?.seconds_tickets?.price;
    let thirdsTicketPrice = nextEvent.ticket?.thirds_tickets?.price;

    formattedFirstsPrice = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(firstTicketPrice);
    formattedSecondsPrice = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(secondsTicketPrice);
    formattedThirthsPrice = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(thirdsTicketPrice);

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => window.removeEventListener("resize", checkScreenWidth);
  });

  const info = {
    SIEMPRE_BUENA_ONDA:
      "https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/qnaz8aihcarkfaqjtipr",
    INTENSIDAD:
      "https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/mbyajlax7ea1hkuuwkbe",
    BOVEDA_SECRETA:
      "https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/bufh9o713u3otfclhnqq",
  };

  const infoHero = {
    title: "Clandestino",
    description:
      "¡Ven a vivir la experiencia de 5 Luchas Clandestino! Acompañanos en la búsqueda de la liberación del estrés y la rutina diaria a través de la Lucha Libre. ",
    image:
      "https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto,w_1500,h_1001/v1/5LC/u69g3iwicq5jtlvyonwp",
    video:
      "https://res.cloudinary.com/dtj5xnlou/video/upload/f_auto:video,q_auto/yt1mvqeddyok3dqszmpz",
  };

  const infoCTA = {
    title: "¡Se parte!",
    description: "Y sumate a la comunidad",
    image:
      "https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto,w_1500,h_1001/v1/5LC/bufh9o713u3otfclhnqq",
  };
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
    info={infoHero}
    tag="h1"
    titleClass="text-6xl sm:text-8xl md:text-9xl"
  />
  <main
    id="events"
    class="container mx-auto max-w-6xl -mt-10 md:-mt-20 relative md:mb-20 scroll-mt-20"
  >
    <h2
      class="text-4xl font-bold text-white mask font-ibm italic mb-4 pl-4 xl:pl-0"
    >
      Próximos Eventos <span
        class="font-[AtomicMarkerExtras] text-primary text-5xl">P</span
      >
    </h2>
    {#if isMobile && events.length > 0}
      <TinySlider>
        {#each events as event}
          <CardEvent {event} />
        {/each}
      </TinySlider>
      <SuscribeForm />
    {:else}
      <div class="flex items-start lg:gap-4 pl-4 xl:pl-0">
        {#each events as event}
          <CardEvent {event} />
        {/each}
        <SuscribeForm />
      </div>
    {/if}
  </main>
  <Statistics />
  <Video />
  <Slider items={allStaff} reverse={false} />
  <Slider items={allStaff2} reverse={true} />
  <WhoWeAre />
  <Faq />
  <Hero
    info={infoCTA}
    containerClass={"min-h-[450px] lg:min-h-[600px] container"}
    titleClass={"text-7xl"}
    descriptionClass={"font-ibm italic text-4xl"}
    cta={true}
  />
</div>
