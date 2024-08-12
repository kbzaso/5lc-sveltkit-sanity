<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import Header from "$lib/components/Header.svelte";
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

  export let data: PageData;

  $: ({ settings, welcome, nextEvent, events } = data);

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
  });


  const info = {
    SIEMPRE_BUENA_ONDA: 'https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/qnaz8aihcarkfaqjtipr',
    INTENSIDAD: 'https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/mbyajlax7ea1hkuuwkbe',
    BOVEDA_SECRETA: 'https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/bufh9o713u3otfclhnqq',
  }
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
</svelte:head>

<div>
  {#if $page.data.welcome.horizontalLine}
    <InfiniteScroll />
  {/if}
  <Header />
  <section class="container px-4 mx-auto -mt-10 md:-mt-40">
    {#if events.length > 0}
      <TinySlider gap="20px">
        {#each events as event}
          <CardEvent {event} />
        {/each}
      </TinySlider>
    {/if}
  </section>
  <SuscribeForm />
  <!-- Puntos diferenciadores -->
  <section>
    <div class="grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 w-full lg:container mx-auto">
      <div class="h-96 bg-[url('https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/qnaz8aihcarkfaqjtipr')] bg-cover relative bg-center">
        <div class="text-7xl md:text-7xl lg:text-8xl text-primary h-fit absolute -bottom-20 w-full flex flex-col items-center z-10 mix-blend-plus-lighter">
          <span class="font-[AtomicMarker] drop-shadow-lg -rotate-6">Siempre</span>
          <span class="font-[AtomicMarker] drop-shadow-lg -rotate-12">Buena</span>
          <spa class="font-[AtomicMarker] drop-shadow-lg -rotate-3">Onda</spa>
        </div>
      </div>
      <div class="h-96 bg-[url('https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/mbyajlax7ea1hkuuwkbe')] bg-cover bg-center relative">
        <div class="text-7xl md:text-7xl lg:text-8xl text-primary h-fit absolute -bottom-10 items-center w-full flex flex-col z-10 mix-blend-plus-lighter">
          <span class="font-[AtomicMarker] drop-shadow-lg -rotate-6">Intensidad</span>
        </div>
      </div>
      <div class="md:col-span-2 md:row-start-2 h-96 bg-[url('https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/bufh9o713u3otfclhnqq')] bg-cover bg-center relative">
        <div class="text-7xl md:text-7xl lg:text-9xl text-primary h-fit absolute -bottom-16 w-full flex flex-col lg:flex-row items-center lg:justify-center">
          <span class="font-[AtomicMarker] drop-shadow-lg mix-blend-plus-lighter -rotate-6">Bóveda</span>
          <span class="font-[AtomicMarker] drop-shadow-lg mix-blend-plus-lighter -rotate-12">Secreta</span>
        </div>
      </div>
    </div>
  </section>
</div>
