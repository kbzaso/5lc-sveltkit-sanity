<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import Header from "$lib/components/Header.svelte";
  import { PortableText } from "@portabletext/svelte";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import ModalTickets from "$lib/components/ModalTickets.svelte";

  export let data: PageData;

  $: ({ settings, welcome, nextEvent } = data);

  $: eventDate = new Date(nextEvent.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);
  $: hours = eventDate.getHours();
  $: minutes = eventDate.getMinutes();

  let seo_image = urlForImage($page.data.settings?.logo).url();
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

<div class="">
  <Header
    imageTitle={urlForImage(welcome.imageTitle).crop("focalpoint").url()}
    preTitle={welcome.preTitle}
    textTitle={welcome.textTitle}
    description={welcome.description}
  />

  {#if nextEvent}
    <div
      class="container xl:mx-auto min-w-[350px] mx-auto px-4 -mt-32 md:-mt-48 h-min"
    >
      <div
        id="nextEvent"
        class="relative h-fit mt-28 flex flex-col lg:flex-row md:gap-4 lg:gap-0"
      >
        <div class="lg:relative lg:inset-y-0 lg:left-0 lg:w-1/3 z-30">
          <img
            class="object-contain -rotate-2 md:rounded-sm"
            loading="lazy"
            width="600"
            height="750"
            src={urlForImage(nextEvent.poster).width(600).height(750).url()}
            alt="Afiche del próximo evento"
          />
        </div>
        <div class="relative pb-16 ">
          <div class="lg:pl-8 mt-4 lg:mt-0">
            <div class="mx-auto text-base lg:ml-auto lg:mr-0">
              <h2
                class="font-semibold leading-6 text-primary uppercase tracking-widest"
              >
                Próximo evento
              </h2>
              <h1
                class="mt-2 text-3xl font-bold leading-8 text-white sm:text-4xl"
              >
                {nextEvent.title}
                <span
                  class="font-semibold leading-6 text-primary uppercase tracking-widest text-lg"
                  >(+18)</span
                >
              </h1>
              <div class="prose prose-indigo mt-5">
                <p>
                  <PortableText value={nextEvent.description} />
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
                  {#if nextEvent.boveda}
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
                      {nextEvent.venue?.venueName} -
                      <a
                        class="text-primary"
                        target="_blank"
                        rel="noreferrer"
                        href={nextEvent.venue?.venueUrl}
                      >
                        {nextEvent.venue?.venueAdress}</a
                      >
                    </li>
                  {/if}
                </ul>
              </div>

              {#if nextEvent.tickets_sold !== nextEvent.total_tickets && nextEvent.active}
                <!-- TANDAS -->
                <div class="flex gap-4 my-8">
                  <div
                    class:opacity-50={nextEvent.ticket.firsts_tickets.amount ===
                      0}
                    class="w-full border border-success p-2 indicator flex flex-col justify-center items-center pt-4"
                  >
                    <span
                      class="indicator-item indicator-center badge badge-success tracking-widest uppercase"
                      >Tanda Nº1</span
                    >
                    <div class="text-sm">
                      {#if nextEvent.ticket.firsts_tickets.amount !== 0}
                        {#if nextEvent.ticket?.firsts_tickets?.amount <= 10}
                          <p>
                            Quedan {nextEvent.ticket?.firsts_tickets?.amount ||
                              0}
                          </p>
                        {/if}
                        <p>${nextEvent.ticket?.firsts_tickets?.price || 0}</p>
                      {:else}
                        <p>Agotada</p>
                      {/if}
                    </div>
                  </div>
                  <div
                    class:opacity-50={nextEvent.ticket?.seconds_tickets
                      ?.amount === 0}
                    class="w-full border border-info p-2 indicator flex flex-col justify-center items-center pt-4"
                  >
                    <span
                      class="indicator-item indicator-center badge badge-info tracking-widest uppercase"
                      >Tanda Nº2</span
                    >
                    <div class="text-sm">
                      {#if nextEvent.ticket.seconds_tickets.amount !== 0}
                        {#if nextEvent.ticket?.seconds_tickets?.amount <= 10}
                          <p>
                            Quedan {nextEvent.ticket?.seconds_tickets?.amount ||
                              0}
                          </p>
                        {/if}
                        <span
                          >${nextEvent.ticket?.seconds_tickets?.price ||
                            0}</span
                        >
                      {:else}
                        <p>Agotada</p>
                      {/if}
                    </div>
                  </div>
                  <div
                    class:opacity-50={nextEvent.ticket?.thirds_tickets
                      ?.amount === 0}
                    class="w-full border border-error p-2 indicator flex flex-col justify-center items-center pt-4 h-20"
                  >
                    <span
                      class="indicator-item indicator-center badge badge-error tracking-widest uppercase"
                      >Tanda Nº3</span
                    >
                    <div class="text-sm">
                      {#if nextEvent.ticket.thirds_tickets.amount !== 0}
                        {#if nextEvent.ticket?.thirds_tickets?.amount <= 10}
                          <p>
                            Quedan {nextEvent.ticket?.thirds_tickets?.amount ||
                              0}
                          </p>
                        {/if}
                        <span
                          >${nextEvent.ticket?.thirds_tickets?.price || 0}</span
                        >
                      {:else}
                        <p>Agotada</p>
                      {/if}
                    </div>
                  </div>
                </div>
                <!-- PROGRESS -->
                <div>
                  <div class="flex justify-between">
                    <span class="text-gray-400"
                      >🎟️ {nextEvent.ticket?.seconds_tickets?.amount <= 10
                        ? "¡Últimas entradas!, no te quedes fuera."
                        : "Progreso de venta de tickets"}</span
                    >
                    <span>🔥</span>
                  </div>
                  <progress
                    class={`progress w-full ${
                      nextEvent.ticket?.firsts_tickets?.amount !== 0
                        ? "progress-success"
                        : nextEvent.ticket?.seconds_tickets?.amount !== 0
                        ? "progress-info"
                        : "progress-error"
                    }`}
                    value={nextEvent?.tickets_sold}
                    max={nextEvent?.total_tickets}
                  />
                </div>
              {/if}
              {#if nextEvent.tickets_sold === nextEvent.total_tickets && nextEvent.active}
                <div
                  class="alert alert-error shadow-lg flex justify-center rounded-none mt-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                    />
                  </svg>

                  <span class="uppercase tracking-widest">Adhesión agotada</span
                  >
                </div>
              {:else}
                <div class="mt-4">
                  <ModalTickets {nextEvent} />
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
