<script lang="ts">
  import { previewSubscription } from "$lib/config/sanity";
  import { eventQuery } from "$lib/config/sanity/queries";
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import { PortableText } from "@portabletext/svelte";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import ModalTickets from "$lib/components/ModalTickets.svelte";
  import Gallery from "$lib/components/Gallery.svelte";
  import Youtube from "$lib/components/Youtube.svelte";
  import DisclaimerModal from "$lib/components/DisclaimerModal.svelte";
  import { writable } from "svelte/store";
  import AttendanceStat from "$lib/components/AttendanceStat.svelte";
  import Spotify from "$lib/components/Spotify.svelte";

  export let data: PageData;

  $: ({ initialData, previewMode, slug } = data);
  $: ({ data: eventData } = previewSubscription(eventQuery, {
    params: { slug },
    initialData,
    enabled: previewMode && !!slug,
  }));

  $: eventDate = new Date($eventData?.event?.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);
  $: hours = eventDate.getHours();
  $: minutes = eventDate.getMinutes();

  let seo_image = urlForImage($page.data.initialData.event.poster).url();

  let hasPhotos = [];

  let formattedFirstsPrice: string;
  let formattedSecondsPrice: string;
  let formattedThirthsPrice: string;
  onMount(() => {
    let firstTicketPrice = $eventData?.event.ticket?.firsts_tickets?.price;
    let secondsTicketPrice = $eventData?.event.ticket?.seconds_tickets?.price;
    let thirdsTicketPrice = $eventData?.event.ticket?.thirds_tickets?.price;

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

    if ($eventData?.event?.gallery !== null) {
      hasPhotos = Object.keys($eventData?.event?.gallery);
    } else {
      hasPhotos = [];
    }
  });

  let disclaimerEvent = writable([]);

  console.log($eventData?.event?.playlist);
</script>

<svelte:head>
  <title>{$eventData?.event?.title}</title>

  <meta
    content={`${$page.url.origin}/og?message=${seo_image}`}
    property="og:image"
  />
  <meta name="description" content={`${$eventData?.event?.seo_description}`} />
  <meta
    property="twitter:image"
    content={`${$page.url.origin}/og?message=${seo_image}`}
  />
  <meta
    property="twitter:card"
    content={`${$page.url.origin}/og?message=${seo_image}`}
  />
  <meta property="twitter:title" content={`${$eventData?.event?.title}`} />
  <meta
    property="twitter:description"
    content={`${$eventData?.event?.seo_description}`}
  />

  <meta property="og:title" content={`${$eventData?.event?.title}`} />
  <meta
    property="og:description"
    content={`${$eventData?.event?.seo_description}`}
  />
  <meta property="og:url" content={`${$page.url.href}`} />
</svelte:head>

{#if $eventData?.event}
  <div class="xl:container xl:mx-auto min-w-[350px]">
    <div class="container xl:mx-auto min-w-[350px] mx-auto px-4 mt-20 h-min">
      <div
        id="$eventData?.event"
        class="h-fit flex flex-col lg:flex-row md:gap-4 lg:gap-0"
      >
        <div class="relative overflow-hidden">
          <div
            class="absolute w-[640px] h-72 -bottom-5 lg:w-72 lg:h-full z-10  md:top-[480px] lg:top-0 lg:left-[280px] xl:left-[330px] bg-gradient-to-t lg:bg-gradient-to-l from-black/100 via-black/60 to-transparent"
          />
          <img
            class="object-contain md:rounded-sm"
            loading="lazy"
            width="600"
            height="750"
            src={urlForImage($eventData?.event.poster)
              .width(600)
              .height(750)
              .url()}
            alt="Afiche del próximo evento"
          />
        </div>
        <div class="z-10 relative -top-20 lg:top-0 xl:top-20 lg:-left-12">
          <div class="mt-4 lg:mt-0">
            <div class="mx-auto text-base lg:ml-auto lg:mr-0">
              <!-- EVENTO PASADO -->
              {#if !$eventData?.event?.active}
                <time
                  class="italic text-gray-500"
                  datetime={eventDateFormatted.charAt(0).toUpperCase() +
                    eventDateFormatted.slice(1)}
                >
                  {eventDateFormatted.charAt(0).toUpperCase() +
                    eventDateFormatted.slice(1)}
                </time>
                <h1
                  class="mt-2 text-3xl font-bold leading-8 text-primary sm:text-4xl"
                >
                  {$eventData?.event?.title}
                  <span
                    class="font-semibold leading-6 text-primary uppercase tracking-widest text-lg"
                    >(+18)</span
                  >
                </h1>
                <p
                  class="prose prose-h3:text-primary prose-h2:font-ibm prose-h3:font-ibm prose-h2:text-primary prose-h1:text-primary prose-indigo mt-5"
                >
                  {#if $eventData?.event?.result}
                    <p>Estos fueron los resultados:</p>
                    <PortableText value={$eventData?.event?.result} />
                  {/if}
                  {#if !$eventData?.event.boveda}
                    <p>
                      Este evento se realizo en {$eventData.event.venue
                        ?.venueName} -
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={$eventData.event.venue?.venueUrl}
                      >
                        {$eventData.event.venue?.venueAdress}</a
                      >
                    </p>
                  {:else}
                    <p>
                      Este evento se realizo en Bóveda Secreta - <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://goo.gl/maps/85ZfvTdLAoDpt9xr9"
                      >
                        San Antonio 705, Santiago, Región Metropolitana</a
                      >
                    </p>
                  {/if}
                </p>
                {#if $eventData?.event?.assistance && !$eventData?.event?.active}
                  <AttendanceStat
                    assistance={$eventData.event.assistance}
                    event={$eventData.event.title}
                  />
                {/if}
              {/if}

              <!-- EVENTO ACTIVO -->

              {#if $eventData?.event?.active}
                <h2
                  class="font-semibold leading-6 text-primary uppercase tracking-widest"
                >
                  Próximo evento
                </h2>
                <h1
                  class="mt-2 text-3xl font-bold leading-8 text-white sm:text-4xl"
                >
                  {$eventData?.event.title}
                  <span
                    class="font-semibold leading-6 text-primary uppercase tracking-widest text-lg"
                    >(+18)</span
                  >
                </h1>
                <div class="prose prose-indigo mt-5">
                  <p>
                    <PortableText value={$eventData?.event?.description} />
                  </p>

                  <ul>
                    <li>
                      <time datetime={eventDateFormatted}>
                        {eventDateFormatted.charAt(0).toUpperCase() +
                          eventDateFormatted.slice(1)}
                      </time>
                    </li>
                    <li>
                      <time datetime={eventDateFormatted}>
                        {hours}:{minutes < 10 ? "0" + minutes : minutes}
                      </time>
                      → Inicio show
                      <span class="italic text-gray-400"
                        >(apertura 45 minutos antes)</span
                      >
                    </li>
                    {#if $eventData?.event.boveda}
                      <li>
                        Bóveda Secreta - <a
                          class="text-primary"
                          target="_blank"
                          rel="noreferrer"
                          href="https://goo.gl/maps/85ZfvTdLAoDpt9xr9"
                        >
                          San Antonio 705, Santiago, Región Metropolitana</a
                        >
                      </li>
                    {:else}
                      <li>
                        {$eventData?.event.venue?.venueName} -
                        <a
                          class="text-primary"
                          target="_blank"
                          rel="noreferrer"
                          href={$eventData?.event.venue?.venueUrl}
                        >
                          {$eventData?.event.venue?.venueAdress}</a
                        >
                      </li>
                    {/if}
                  </ul>

                  {#if $eventData?.event.boveda}
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
                  {/if}
                </div>

                {#if $eventData?.event.tickets_sold !== $eventData?.event.total_tickets && $eventData?.event.active && $eventData?.event.sell}
                  <!-- TANDAS -->
                  <div class="flex gap-4 my-8">
                    <div
                      class:opacity-50={$eventData?.event?.ticket
                        ?.firsts_tickets.amount === 0}
                      class="w-full border border-success p-2 indicator flex flex-col justify-center items-center pt-4"
                    >
                      <span
                        class="indicator-item indicator-center badge badge-success tracking-widest uppercase"
                        >Tanda Nº1</span
                      >
                      <div class="text-sm">
                        {#if $eventData?.event?.ticket?.firsts_tickets?.amount !== 0}
                          {#if $eventData?.event?.ticket?.firsts_tickets?.amount <= 15}
                            <p>
                              Quedan {$eventData?.event?.ticket?.firsts_tickets
                                ?.amount || 0}
                            </p>
                          {/if}
                          <p>{formattedFirstsPrice || 0}</p>
                        {:else}
                          <p>Agotada</p>
                        {/if}
                      </div>
                    </div>
                    <div
                      class:opacity-50={$eventData?.event.ticket
                        ?.seconds_tickets?.amount === 0}
                      class="w-full border border-info p-2 indicator flex flex-col justify-center items-center pt-4"
                    >
                      <span
                        class="indicator-item indicator-center badge badge-info tracking-widest uppercase"
                        >Tanda Nº2</span
                      >
                      <div class="text-sm">
                        {#if $eventData?.event?.ticket?.seconds_tickets?.amount !== 0}
                          {#if $eventData?.event?.ticket?.seconds_tickets?.amount <= 15}
                            <p>
                              Quedan {$eventData?.event?.ticket?.seconds_tickets
                                ?.amount || 0}
                            </p>
                          {/if}
                          <span>{formattedSecondsPrice || 0}</span>
                        {:else}
                          <p>Agotada</p>
                        {/if}
                      </div>
                    </div>
                    <div
                      class:opacity-50={$eventData?.event?.ticket
                        ?.thirds_tickets?.amount === 0}
                      class="w-full border border-error p-2 indicator flex flex-col justify-center items-center pt-4 h-20"
                    >
                      <span
                        class="indicator-item indicator-center badge badge-error tracking-widest uppercase"
                        >Tanda Nº3</span
                      >
                      <div class="text-sm">
                        {#if $eventData?.event?.ticket?.thirds_tickets?.amount <= 15}
                          <p>
                            Quedan {$eventData?.event?.ticket?.thirds_tickets
                              ?.amount || 0}
                          </p>
                        {/if}
                        <span>{formattedThirthsPrice || 0}</span>
                      </div>
                    </div>
                  </div>
                  <!-- PROGRESS -->
                  <div>
                    <div class="flex justify-between">
                      <span class="text-gray-400"
                        >🎟️ {$eventData?.event?.ticket?.seconds_tickets
                          ?.amount <= 10
                          ? "¡Últimas entradas!, no te quedes fuera."
                          : "Progreso de venta de tickets"}</span
                      >
                      <span class="animate-bounce">🔥</span>
                    </div>
                    <progress
                      class={`progress w-full ${
                        $eventData?.event?.ticket?.firsts_tickets?.amount !== 0
                          ? "progress-success"
                          : $eventData?.event?.ticket?.seconds_tickets
                              ?.amount !== 0
                          ? "progress-info"
                          : "progress-error"
                      }`}
                      value={$eventData?.event?.tickets_sold}
                      max={$eventData?.event?.total_tickets}
                    />
                  </div>
                {/if}
                {#if ($eventData?.event?.tickets_sold === $eventData?.event?.total_tickets && $eventData?.event?.active) || !$eventData?.event?.sell}
                  <div
                    class="alert bg-zinc-900/75 border-none backdrop-blur-sm shadow-lg flex justify-center rounded-none mt-4"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21v-3.904q-.917-.386-1.655-1.012q-.737-.626-1.26-1.43q-.522-.804-.803-1.733Q3 11.992 3 11q0-3.527 2.52-5.763Q8.04 3 11.998 3t6.48 2.237Q21 7.473 21 11q0 .992-.282 1.921t-.804 1.733q-.522.804-1.26 1.43q-.737.626-1.654 1.016V21zm1-1h1.423v1h1.539v-1h2.076v1h1.539v-1H16v-3.55q.912-.283 1.65-.817q.737-.535 1.262-1.251q.525-.716.806-1.581Q20 11.937 20 11q0-3.125-2.212-5.062T12 4Q8.425 4 6.212 5.938T4 11q0 .937.282 1.801q.281.864.806 1.58q.525.717 1.266 1.252q.74.534 1.646.817zm2.692-4.827h2.616L12 12.558zm-2.189-2.558q.668 0 1.14-.475q.472-.476.472-1.143t-.475-1.14q-.476-.472-1.143-.472t-1.14.475q-.472.476-.472 1.143t.475 1.14q.476.472 1.143.472m7 0q.668 0 1.14-.475q.472-.476.472-1.143t-.475-1.14q-.476-.472-1.143-.472t-1.14.475q-.472.476-.472 1.143t.475 1.14q.476.472 1.143.472M8 20v-3.55q-.906-.283-1.646-.817q-.74-.535-1.266-1.251q-.525-.716-.806-1.581Q4 11.937 4 11q0-3.125 2.213-5.062T12 4q3.575 0 5.788 1.938T20 11q0 .937-.282 1.801q-.281.864-.806 1.58q-.525.717-1.263 1.252q-.737.534-1.649.817V20h-1.423v-.923h-1.539V20h-2.076v-.923H9.423V20z"/></svg>

                    <span class="uppercase tracking-widest"
                      >Adhesión agotada</span
                    >
                  </div>
                {:else}
                  <div class="mt-4">
                    {#if $eventData?.event?.disclaimers}
                      <DisclaimerModal
                        disclaimers={$eventData?.event?.disclaimers}
                        {disclaimerEvent}
                      />
                      <ModalTickets
                        nextEvent={$eventData?.event}
                        {disclaimerEvent}
                      />
                    {/if}
                  </div>
                {/if}
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>

    {#if hasPhotos.length > 0}
      <section class="md:mt-20">
        <h2 class="sub-title px-4">Galería de imagenes</h2>
        <div
          class="container p-4 mx-auto w-full flex flex-col justify-center h-fit"
        >
          <Gallery
            id={$eventData?.event.slug}
            images={$eventData?.event.gallery}
          />
        </div>
      </section>
    {/if}
  </div>
  {#if $eventData?.event.videoUrl && !$eventData?.event.active}
    <Youtube
      link={$eventData?.event.videoUrl}
      image={$eventData?.event?.gallery
        ? $eventData?.event?.gallery[0]
        : $page.data.welcome.heroImage}
    />
  {/if}
  {#if $eventData?.event.playlist && !$eventData?.event.active}
    <Spotify src={$eventData.event.playlist} />
  {/if}
{:else}
  <h1>Ups! no encontramos el evento que buscas.</h1>
{/if}
