<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import Header from "$lib/components/Header.svelte";
  import { PortableText } from "@portabletext/svelte";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Modal from "$lib/components/Modal.svelte";

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
    <div class="container mx-auto -mt-48 h-min">
      <div id="nextEvent" class="relative h-fit mt-28 flex flex-col">
        <div class="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 z-30">
          <a href={`/eventos/${nextEvent.slug}`} title="Próximo evento">
            <img
              class="h-56 w-full object-cover lg:hover:scale-105 transition-transform lg:absolute lg:h-full md:rounded-sm"
              loading="lazy"
              src={urlForImage(nextEvent.poster).url()}
              alt="Afiche del próximo evento"
            />
          </a>
        </div>
        <div
          class="relative px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8"
        >
          <div class="lg:col-start-2 lg:pl-8">
            <div
              class="mx-auto max-w-prose text-base lg:ml-auto lg:mr-0 lg:max-w-lg"
            >
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

              {#if nextEvent.ticket.soldOut && nextEvent.active}
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

                  <span class="uppercase tracking-widest"
                    >Adhesión agotadas</span
                  >
                </div>
              {:else if !nextEvent.ticket.soldOut && nextEvent.active && nextEvent.ticket.url}
                <div
                  class="mt-4 gap-4 flex flex-col md:flex-row sm:justify-center lg:justify-start"
                >
                  <div class="rounded-md w-full">
                    <a
                      href={nextEvent.ticket?.url}
                      class="flex w-full items-center rounded-none btn btn-primary cursor-pointer text-black no-underline"
                      >Entrada General</a
                    >
                  </div>
                </div>
              {/if}
              <div class="w-full text-center mt-6">
                <a href="/eventos" class="link text-primary"
                  >Ir a la sección de eventos</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
