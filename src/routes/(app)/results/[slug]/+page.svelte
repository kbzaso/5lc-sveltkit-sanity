<script lang="ts">
  import { previewSubscription } from "$lib/config/sanity";
  import { eventQuery } from "$lib/config/sanity/queries";
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import { PortableText } from "@portabletext/svelte";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  
  import Gallery from "$lib/components/Gallery.svelte";

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
  onMount(() => {
    if ($eventData?.event?.gallery !== null){
      hasPhotos = Object.keys($eventData?.event?.gallery);
    } else {
      hasPhotos = [];
    }
  });
</script>

<svelte:head>
  <title>Resultado {$eventData?.event?.title}</title>

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
  <div class="container mx-auto min-w-[350px]">
    <div class="mt-28 flex flex-col lg:flex-row px-4 gap-8">
      <figure class="mb-8 xl:mb-0 lg:w-1/3">
        <img
          class="h-72 lg:h-full object-cover w-full"
          loading="lazy"
          src={urlForImage($eventData?.event.poster)
            .height(800)
            .quality(100)
            .url()}
          alt="Afiiche de {$eventData?.event?.title}"
          height="800"
        />
      </figure>

      <div class="prose-p:text-lg lg:w-2/3">
        {#if !$eventData?.event?.active}
          <time
            class="italic text-gray-400"
            datetime={eventDateFormatted.charAt(0).toUpperCase() +
              eventDateFormatted.slice(1)}
          >
            {eventDateFormatted.charAt(0).toUpperCase() +
              eventDateFormatted.slice(1)}
          </time>
        {/if}
        <h1
          class="mt-2 text-3xl font-bold leading-8 text-primary sm:text-4xl"
        >
          {$eventData?.event?.title}
          {#if $eventData?.event?.active}
            <span
              class="font-semibold leading-6 text-primary uppercase tracking-widest text-lg"
              >(+18)</span
            >
          {/if}
        </h1>
        <div class="prose mt-5 prose-p:text-gray-400">
          <p>
            {#if $eventData?.event?.active && $eventData?.event?.description}
              <PortableText value={$eventData?.event?.description} />
            {:else if !$eventData?.event?.active && $eventData?.event?.result}
              <p>Estos fueron los resultados:</p>
              <PortableText value={$eventData?.event?.result} />
            {/if}
          </p>

          {#if $eventData?.event?.active}
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
                <span class="italic text-gray-500"
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
                  {$eventData.event.venue?.venueName} -
                  <a
                    class="text-primary"
                    target="_blank"
                    rel="noreferrer"
                    href={$eventData.event.venue?.venueUrl}
                  >
                    {$eventData.event.venue.venueAdress}</a
                  >
                </li>
              {/if}
            </ul>
          {:else if !$eventData?.event.boveda}
            <div class="alert bg-zinc-900 rounded-sm md:gap-4 md:flex md:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-10 h-10 lg:w-6 lg:h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="inline text-center md:text-left">Este evento se realizo en {$eventData.event.venue?.venueName} -
                <a
                  class="hover:text-primary"
                  target="_blank"
                  rel="noreferrer"
                  href={$eventData.event.venue?.venueUrl}
                >
                  {$eventData.event.venue?.venueAdress}</a
                ></span>
            </div>
          {:else}
            <div class="alert bg-zinc-900 rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-10 h-10 lg:w-6 lg:h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="inline text-center md:text-left">Este evento se realizo en Bóveda Secreta - <a
                class="hover:text-primary"
                target="_blank"
                rel="noreferrer"
                href="https://goo.gl/maps/85ZfvTdLAoDpt9xr9"
              >
                San Antonio 705, Santiago, Región Metropolitana</a
              ></span>
            </div>
          {/if}

          {#if $eventData?.event.boveda && $eventData?.event?.active}
            <p class="border border-dashed border-primary p-4">
              La Bóveda Secreta se encuentra en el 3er piso de la Galería “Nueva
              Copacabana” ubicada en calle San Antonio #705, Santiago Centro.
              Las estaciones de Metro más cercanas a ella son <span
                class="underline underline-offset-2 decoration-wavy decoration-primary"
                >Plaza de Armas</span
              >,
              <span
                class="underline underline-offset-2 decoration-wavy decoration-primary"
                >Bellas Artes</span
              >
              y
              <span
                class="underline underline-offset-2 decoration-wavy decoration-primary"
                >Puente Cal y Canto</span
              >.
            </p>
          {/if}
        </div>

        {#if $eventData?.event.ticket.soldOut && $eventData?.event?.active}
          <div
            class="alert alert-error shadow-lg flex justify-center rounded-none mt-4"
          >
            <div>
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

              <span class="uppercase tracking-widest">Adhesión agotadas</span>
            </div>
          </div>
        {:else if !$eventData?.event.ticket.soldOut && $eventData?.event.active && $eventData?.event.ticket.url}
          <div
            class="mt-4 gap-4 flex flex-col md:flex-row sm:justify-center lg:justify-start"
          >
            <div class="rounded-md w-full">
              <a
                href={$eventData?.event?.ticket?.url}
                class="flex w-full items-center rounded-none hover:bg-cyan-500 hover:text-white justify-center border border-transparent bg-yellow-400 uppercase tracking-widest px-8 py-3 text-base font-medium text-black md:py-4 md:px-10 md:text-lg"
                >Entrada General</a
              >
              {#if $eventData?.event.ticket.price}
                <p class="mt-2 text-center text-gray-500 italic leading-4">
                  Precio adhesión: ${$eventData?.event.ticket.price}
                </p>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    </div>
    {#if hasPhotos.length > 0}
      <section class="mt-10 md:mt-20">
        <h2
          class="px-4 text-white container mx-auto mb-4 font-ibm font-black text-2xl italic underline decoration-primary"
        >
          Galería de imagenes
        </h2>
        <div
          class="container p-4 mx-auto w-full flex flex-col justify-center h-fit"
        >
          <Gallery id={$eventData?.event.slug} images={$eventData?.event.gallery} />
        </div>
      </section>
    {/if}
  </div>
{:else}
  <h1>Ups! no encontramos el evento que buscas.</h1>
{/if}
