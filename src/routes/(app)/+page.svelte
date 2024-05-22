<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import Header from "$lib/components/Header.svelte";
  import { PortableText } from "@portabletext/svelte";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import ModalTickets from "$lib/components/ModalTickets.svelte";
  import InfiniteScroll from "$lib/components/InfiniteScroll.svelte";
  import CardEvent from "$lib/components/CardEvent.svelte";
  import DisclaimerModal from "$lib/components/DisclaimerModal.svelte";
  import SingleEvent from "$lib/components/SingleEvent.svelte";

  export let data: PageData;

  $: ({ settings, welcome, nextEvent, events, payment_id_service } = data);

  console.log(payment_id_service);

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
  <Header
    imageTitle={urlForImage(welcome.imageTitle).crop("focalpoint").url()}
    preTitle={welcome.preTitle}
    textTitle={welcome.textTitle}
    description={welcome.description}
  />
  <main class="container px-4 mt-10 lg:-mt-40 mx-auto">
    {#if events && events.length > 0}
      {#if events.length > 1}
      <h1 class="text-3xl sub-title text-white sm:text-4xl">
        Próximos eventos
      </h1>
      <div class="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {#each events as event}
          <CardEvent {event} />
        {/each}
      </div>
      {:else}
        <SingleEvent event={nextEvent}/>
      {/if}
    {/if}
  </main>
</div>
