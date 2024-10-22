<script lang="ts">
  import { eventQuery } from "$lib/config/sanity/queries";
  import type { PageData } from "./$types";
  import { PortableText } from "@portabletext/svelte";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Gallery from "$lib/components/Gallery.svelte";
  import Youtube from "$lib/components/Youtube.svelte";
  import DisclaimerModal from "$lib/components/DisclaimerModal.svelte";
  import AttendanceStat from "$lib/components/AttendanceStat.svelte";
  import Spotify from "$lib/components/Spotify.svelte";
  import { Ticket, Play } from "lucide-svelte";
  import {
    calculateTandas,
    calculateUbications,
    validateDiscount,
  } from "$lib/utils/eventUtils";
  import ModalTicketsSell from "$lib/components/events/ModalTicketsSell.svelte";
  import UbicationTicketsCard from "$lib/components/events/UbicationTicketsCard.svelte";
  import TandasTicketsCard from "$lib/components/events/TandasTicketsCard.svelte";
  import { urlForImage } from "$lib/config/sanity";
  import ChatBubble from "$lib/components/events/ChatBubble.svelte";
  import Countdown from "$lib/components/events/Countdown.svelte";
  import { disclaimerEvent } from "$lib/stores";
  import Sponsors from "$lib/components/events/Sponsors.svelte";
  import Video from "$lib/components/Video.svelte";
  import Doubt from "$lib/components/events/Doubt.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import Cartelera from "$lib/components/events/Cartelera.svelte";
  import PromotionalVideo from "$lib/components/events/PromotionalVideo.svelte";
  import Attraction from "$lib/components/events/Attraction.svelte";
  import Agenda from "$lib/components/events/Agenda.svelte";

  export let data: PageData;
  export let form;

  $: ({ event, validatedDiscount } = data);

  $: eventDate = new Date(event?.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  $: hours = eventDate.getHours();
  $: minutes = eventDate.getMinutes();

  let seo_image = urlForImage(data?.event?.poster).url();

  let hasPhotos = [];

  interface Tandas {
    index: number;
    amount: number;
    price: number;
    type: string;
  }

  let tandas: Tandas[] = [];
  let ubications: any[] = [];

  onMount(() => {
    if (event?.active) {
      if (event?.sell_type === "batch") {
        // Necesito pasar el objeto de tandas a un array para poder ordenarlas
        tandas = calculateTandas(event?.ticket?.batch);
      } else {
        // Necesito pasar el objeto de tandas a un array para poder ordenarlas
        ubications = calculateUbications(event?.ticket?.ubication);
      }
    }

    if (event?.gallery !== null) {
      hasPhotos = Object.keys(event?.gallery);
    } else {
      hasPhotos = [];
    }
  });

</script>

<svelte:head>
  <title>{event?.title}</title>

  <meta
    content={`${$page.url.origin}/og?message=${seo_image}`}
    property="og:image"
  />
  <meta name="description" content={`${event?.seo_description}`} />
  <meta
    property="twitter:image"
    content={`${$page.url.origin}/og?message=${seo_image}`}
  />
  <meta
    property="twitter:card"
    content={`${$page.url.origin}/og?message=${seo_image}`}
  />
  <meta property="twitter:title" content={`${event?.title}`} />
  <meta property="twitter:description" content={`${event?.seo_description}`} />

  <meta property="og:title" content={`${event?.title}`} />
  <meta property="og:description" content={`${event?.seo_description}`} />
  <meta property="og:url" content={`${$page.url.href}`} />
</svelte:head>

{#if event}
  <div class=" mx-auto min-w-[350px]">
    {#if event?.active}
    <Countdown date={eventDate} />
    {/if}
    <div class="min-w-[350px] mx-auto mt-20 h-min">
      <div
        id="event"
        class={`flex ${
          event?.active ? "wrap flex-col" : "flex-col lg:flex-row"
        } md:gap-4 lg:gap-0`}
      >
        <img
          class={`${
            event?.active
              ? "object-cover blur-lg object-top md:w-full h-96 md:h-[500px] opacity-50 -mt-20"
              : "object-contain w-full lg:w-1/2"
          }  md:rounded-sm maskImages`}
          loading="lazy"
          width="800"
          height="1000"
          src={urlForImage(data?.event?.poster).width(800).height(1000).url()}
          alt="Afiche del evento"
        />
        <div
          class={`z-10 ${
            event?.active ? "" : "relative -top-40 md:top-0"
          } px-4 w-full`}
        >
          <div class="mt-4 lg:mt-0">
            <div class="mx-auto text-white lg:ml-auto lg:mr-0">
              <!-- EVENTO PASADO -->
              {#if !event?.active}
                <time
                  class="italic"
                  datetime={eventDateFormatted.charAt(0).toUpperCase() +
                    eventDateFormatted.slice(1)}
                >
                  {eventDateFormatted.charAt(0).toUpperCase() +
                    eventDateFormatted.slice(1)}
                </time>
                <div class="flex gap-4">
                  <h1 class="mt-2 text-5xl font-bold text-primary mask">
                    {event?.title}
                  </h1>
                </div>
                <div
                  class="prose prose-h3:text-primary prose-h2:font-ibm prose-h3:font-ibm prose-h2:text-primary prose-h1:text-primary prose-indigo mt-5 prose-p:text-white prose-p:text-lg"
                >
                  {#if event?.result}
                    <p>Estos fueron los resultados:</p>
                    <p>
                      <PortableText value={event?.result} components={{}} />
                    </p>
                  {/if}
                  {#if !event.boveda}
                    <p>
                      Este evento se realizo en {event.venue?.venueName} -
                      <a
                        target="_blank"
                        rel="noreferrer"
                        class="text-primary"
                        href={event.venue?.venueUrl}
                      >
                        {event.venue?.venueAdress}</a
                      >
                    </p>
                  {:else}
                    <p>
                      Este evento se realizo en Bóveda Secreta - <a
                        target="_blank"
                        rel="noreferrer"
                        class="text-primary"
                        href="https://goo.gl/maps/85ZfvTdLAoDpt9xr9"
                      >
                        San Antonio 705, Santiago, Región Metropolitana</a
                      >
                    </p>
                  {/if}
                </div>
                {#if event?.assistance && !event?.active}
                  <AttendanceStat
                    assistance={event.assistance}
                    event={event.title}
                  />
                {/if}
              {/if}

              <!-- EVENTO ACTIVO -->
              {#if event?.active}
                <p
                  class="text-primary uppercase tracking-widest text-sm text-center mb-4 font-bold lg:mt-0"
                >
                  Próximo evento
                </p>
                <h1
                  class="text-5xl lg:text-7xl font-bold mask text-white text-center"
                >
                  {event.title}
                </h1>
                <div
                  class="text-white text-lg lg:text-2xl md:text-3xl text-center space-y-8"
                >
                  <p class="max-w-2xl mx-auto mt-2">
                    <PortableText value={event?.description} components={{}} />
                  </p>
                  <div class="flex lg:flex-row flex-col gap-2 justify-center">
                    <span class="text-lg flex gap-2 justify-center">
                      <time datetime={eventDateFormatted}>
                        {eventDateFormatted.charAt(0).toUpperCase() +
                          eventDateFormatted.slice(1)}
                      </time>
                      -
                      <time class="uppercase" datetime={eventDateFormatted}>
                        {new Intl.DateTimeFormat("es-CL", {
                          hour: "numeric",
                          minute: "numeric",
                          timeZone: "America/Santiago",
                        }).format(eventDate)}
                      </time>
                    </span>
                    {#if event.boveda}
                      <div>
                        <p class="text-lg">
                          Bóveda Secreta <a
                            class="text-primary underline truncate"
                            target="_blank"
                            rel="noreferrer"
                            href="https://goo.gl/maps/85ZfvTdLAoDpt9xr9"
                          >
                            San Antonio 705, Santiago.</a
                          >
                        </p>
                      </div>
                    {:else}
                      <div class="text-lg flex gap-2 justify-center">
                        <div class="text-lg">
                          {event.venue?.venueName} -
                          <a
                            class="text-primary underline"
                            target="_blank"
                            rel="noreferrer"
                            href={event.venue?.venueUrl}
                          >
                            {event.venue?.venueAdress}</a
                          >
                        </div>
                      </div>
                    {/if}
                  </div>
                  <!-- LISTA -->
                  <!-- <ul class="list-none o-0">
                    <li class="flex items-center gap-2">
                      <CalendarDays class="stroke-primary" />
                      <time datetime={eventDateFormatted}>
                        {eventDateFormatted.charAt(0).toUpperCase() +
                          eventDateFormatted.slice(1)}
                      </time>
                    </li>
                    <li class="flex items-center gap-2">
                      <BellRing class="stroke-primary" />
                      <time datetime={eventDateFormatted}>
                        Campanazo inicial:
                        {new Intl.DateTimeFormat("es-CL", {
                          hour: "numeric",
                          minute: "numeric",
                          timeZone: "America/Santiago",
                        }).format(eventDate)}
                      </time>
                    </li>
                    <li class="flex items-center gap-2">
                      <DoorOpen class="stroke-primary" />
                      <span
                        >Apertura de puertas: {new Intl.DateTimeFormat(
                          "es-CL",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            timeZone: "America/Santiago",
                          }
                        ).format(
                          eventDate.setMinutes(
                            eventDate.getMinutes() - event?.doorsOpen
                          )
                        )}</span
                      >
                    </li>
                    {#if event.boveda}
                      <li class="flex items-center gap-2">
                        <MapPin class="stroke-primary" />
                        <span>
                          Bóveda Secreta - <a
                            class="text-primary"
                            target="_blank"
                            rel="noreferrer"
                            href="https://goo.gl/maps/85ZfvTdLAoDpt9xr9"
                          >
                            San Antonio 705, Santiago, Región Metropolitana</a
                          >
                        </span>
                      </li>
                    {:else}
                      <li class="flex items-center gap-2">
                        <MapPin class="stroke-primary" />
                        <span>
                          {event.venue?.venueName} -
                          <a
                            class="text-primary"
                            target="_blank"
                            rel="noreferrer"
                            href={event.venue?.venueUrl}
                          >
                            {event.venue?.venueAdress}</a
                          >
                        </span>
                      </li>
                    {/if}
                  </ul>
                  {#if event.boveda}
                    <p class="border border-dashed border-primary p-4 text-sm">
                      La Bóveda Secreta se encuentra en el 3er piso de la
                      Galería “Nueva Copacabana” ubicada en calle San Antonio
                      #705, Santiago Centro. Las estaciones de Metro más
                      cercanas a ella son <span class="text-primary"
                        >Plaza de Armas</span
                      >,
                      <span class="text-primary">Bellas Artes</span>
                      y
                      <span class="text-primary">Puente Cal y Canto</span>.
                    </p>
                  {/if} -->
                </div>
              {/if}
              <!-- /EVENTO ACTIVO -->
            </div>
            {#if event?.promotion_video}
              <PromotionalVideo url={event?.promotion_video.url} />
            {/if}
          </div>
        </div>
      </div>

      {#if event?.active}
        <div class="container mx-auto px-4 mt-36 lg:mt-10">
          <h3 class="text-3xl font-ibm italic text-white mask text-center">
            <span
              aria-hidden="true"
              class="font-[AtomicMarkerExtras] text-primary">O</span
            >
            Asegura tu cupo
          </h3>
          {#if event.sell_type === "batch"}
            <div class="flex gap-8 my-8 flex-col md:flex-row">
              {#each tandas as tanda}
                <TandasTicketsCard
                  ticket={tanda}
                  dicountPercentage={validatedDiscount?.percentage}
                />
              {/each}
            </div>
          {/if}

          {#if event.sell_type === "ubication"}
            <div class="flex gap-4 mt-4">
              {#each ubications as ubication}
                <UbicationTicketsCard
                  ticket={ubication}
                  dicountPercentage={validatedDiscount?.percentage}
                />
              {/each}
            </div>
          {/if}

          {#if (data.totalTicketsLeftStudio === 0 && event?.active) || !event?.sell}
            <div
              class="alert bg-zinc-900/75 border-none backdrop-blur-sm shadow-lg flex justify-center rounded-none mt-4"
            >
              <Ticket />
              <span class="uppercase tracking-widest">Adhesión agotada</span>
            </div>
          {:else}
            <div class="mt-4">
              {#if event?.disclaimers}
                <DisclaimerModal
                  disclaimers={event?.disclaimers}
                  {disclaimerEvent}
                />
                <!-- CONDICIONAL DE QUE MODAL SE CARGA SI ES DE BATCH O DE UBICATION -->
                <ModalTicketsSell
                  discountCodeExist={event?.discounts}
                  discountResponse={form}
                  {validatedDiscount}
                  sellSystem={event?.sell_type}
                  ticket={event?.sell_type === "ubication"
                    ? event?.ticket?.ubication
                    : event?.ticket?.batch}
                />
              {/if}
              {#if event?.tournament_billboard?.images.length > 0}
                <section class="py-40 space-y-8">
                  <Cartelera
                    billboard={event?.tournament_billboard?.images}
                    title="Luchas del Torneo"
                  />
                </section>
              {/if}
              {#if event?.billboard?.images.length > 0}
                <section class="py-40 space-y-8">
                  <Cartelera billboard={event?.billboard?.images} />
                </section>
              {/if}
              <section class="gap-8 w-full grid grid-cols-1 md:grid-cols-2 my-20">
                {#if event?.agenda && event?.attraction}
                  <Agenda agenda={event?.agenda[0]} alone={false} />
                  <Attraction
                    attractions={event?.attraction[0]}
                    alone={false}
                  />
                {:else if event?.agenda}
                  <Agenda agenda={event?.agenda[0]} alone={true} />
                {:else if event?.attraction}
                  <Attraction attractions={event?.attraction[0]} alone={true} />
                {/if}
              </section>
              <!-- VIDEO TESTIMONIO -->
              <Video
                title="¿Qué dicen los asistentes a 5 Luchas Clandestino?"
                url="https://youtu.be/v5Nj6oG-Fs0?si=eFCH8txRzc6vYMTd"
              />
              {#if event?.faq}
                <Faq
                  questions={event?.faq[0].faq.doubt}
                  poster={event?.poster}
                />
              {/if}
              {#if event?.sponsors_array?.sponsors.length > 0}
                <Sponsors
                  sponsors={event.sponsors_array.sponsors}
                  title="Auspiciadores"
                />
              {/if}
            </div>
          {/if}
        </div>
      {/if}
    </div>
    {#if event?.active}
      <Doubt />
    {/if}

    {#if validatedDiscount?.success && event?.active}
      <ChatBubble />
    {/if}

    {#if hasPhotos.length > 0}
      <section class="md:mt-20">
        <h2 class="sub-title px-4">Galería de imagenes</h2>
        <div
          class="container p-4 mx-auto w-full flex flex-col justify-center h-fit"
        >
          <Gallery id={event.slug} images={event.gallery} />
        </div>
      </section>
    {/if}
  </div>
  {#if event.videoUrl && !event.active}
    <Youtube
      link={event.videoUrl}
      image={event?.gallery
        ? event?.gallery[0]
        : "https://res.cloudinary.com/dtj5xnlou/image/upload/f_auto,q_auto/v1/5LC/boveda"}
    />
  {/if}
  {#if event.playlist && !event.active}
    <Spotify src={event.playlist} />
  {/if}
{:else}
  <h1>Ups! no encontramos el evento que buscas.</h1>
{/if}

<style>
  .wrap {
    display: grid;
    & > * {
      grid-column: 1;
      grid-row: 1;
    }
  }
</style>
