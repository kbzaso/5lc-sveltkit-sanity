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
  import { writable } from "svelte/store";
  import AttendanceStat from "$lib/components/AttendanceStat.svelte";
  import Spotify from "$lib/components/Spotify.svelte";
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
  import { BellRing, CalendarDays, DoorOpen, MapPin } from "lucide-svelte";
  import Countdown from "$lib/components/events/Countdown.svelte";

  export let data: PageData;
  export let form;

  $: ({ event, validatedDiscount } = data);

  $: eventDate = new Date(event?.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);
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

  $: disclaimerEvent = writable([]);
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
  <div class="container mx-auto max-w-6xl min-w-[350px]">
    {#if event?.active && validatedDiscount?.error}
      <Countdown date={eventDate} />
    {/if}
    <div class="container xl:mx-auto min-w-[350px] mx-auto mt-20 h-min">
      <div id="event" class="relative h-fit flex flex-col md:gap-4 lg:gap-0">
          <img
            class="object-cover blur-sm object-top md:w-full h-96 md:h-[500px] md:rounded-sm poster opacity-40 maskImages"
            loading="lazy"
            width="800"
            height="1000"
            src={urlForImage(data.event.poster).width(800).height(1000).url()}
            alt="Afiche del evento"
          />
        <div
          class="z-10 absolute lg:left-[50%] lg:-translate-x-[50%] top-[50%] -translate-y-[50%] px-4 lg:w-max"
        >
          <div class="mt-4 lg:mt-0">
            <div class="mx-auto text-base lg:ml-auto lg:mr-0">
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
                <h2
                  class="text-primary uppercase tracking-widest text-sm text-center"
                >
                  Próximo evento
                </h2>
                <h1 class="text-5xl lg:text-7xl font-bold mask text-white text-center">
                  {event.title}
                </h1>
                <div class="prose prose-indigo text-white text-xl text-center">
                  <p>
                    <PortableText value={event?.description} components={{}} />
                  </p>
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
                {#if validatedDiscount?.success && event?.active}
                  <ChatBubble />
                {/if}
              {/if}
            </div>
          </div>
        </div>
      </div>
      <div class="mx-4">
        <h3 class="text-3xl font-ibm italic text-white mask text-center">Adhierete ahora</h3>
              <div class="flex gap-8 my-8 flex-col md:flex-row">
                {#if event.sell_type === "batch"}
                  {#each tandas as tanda}
                    <TandasTicketsCard
                      ticket={tanda}
                      dicountPercentage={validatedDiscount?.percentage}
                    />
                  {/each}
                {:else}
                  {#each ubications as ubication}
                    <UbicationTicketsCard
                      ticket={ubication}
                      dicountPercentage={validatedDiscount?.percentage}
                      {disclaimerEvent}
                      {validatedDiscount}
                    />
                  {/each}
                {/if}
              </div>

              {#if (data.totalTicketsLeftStudio === 0 && event?.active) || !event?.sell}
                <div
                  class="alert bg-zinc-900/75 border-none backdrop-blur-sm shadow-lg flex justify-center rounded-none mt-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    ><path
                      fill="currentColor"
                      d="M7 21v-3.904q-.917-.386-1.655-1.012q-.737-.626-1.26-1.43q-.522-.804-.803-1.733Q3 11.992 3 11q0-3.527 2.52-5.763Q8.04 3 11.998 3t6.48 2.237Q21 7.473 21 11q0 .992-.282 1.921t-.804 1.733q-.522.804-1.26 1.43q-.737.626-1.654 1.016V21zm1-1h1.423v1h1.539v-1h2.076v1h1.539v-1H16v-3.55q.912-.283 1.65-.817q.737-.535 1.262-1.251q.525-.716.806-1.581Q20 11.937 20 11q0-3.125-2.212-5.062T12 4Q8.425 4 6.212 5.938T4 11q0 .937.282 1.801q.281.864.806 1.58q.525.717 1.266 1.252q.74.534 1.646.817zm2.692-4.827h2.616L12 12.558zm-2.189-2.558q.668 0 1.14-.475q.472-.476.472-1.143t-.475-1.14q-.476-.472-1.143-.472t-1.14.475q-.472.476-.472 1.143t.475 1.14q.476.472 1.143.472m7 0q.668 0 1.14-.475q.472-.476.472-1.143t-.475-1.14q-.476-.472-1.143-.472t-1.14.475q-.472.476-.472 1.143t.475 1.14q.476.472 1.143.472M8 20v-3.55q-.906-.283-1.646-.817q-.74-.535-1.266-1.251q-.525-.716-.806-1.581Q4 11.937 4 11q0-3.125 2.213-5.062T12 4q3.575 0 5.788 1.938T20 11q0 .937-.282 1.801q-.281.864-.806 1.58q-.525.717-1.263 1.252q-.737.534-1.649.817V20h-1.423v-.923h-1.539V20h-2.076v-.923H9.423V20z"
                    /></svg
                  >

                  <span class="uppercase tracking-widest"
                    >Adhesión agotada</span
                  >
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
                      {disclaimerEvent}
                    />
                  {/if}
                </div>
              {/if}
      </div>
    </div>

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
