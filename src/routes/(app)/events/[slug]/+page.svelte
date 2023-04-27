<script lang="ts">
  import { previewSubscription } from "$lib/config/sanity";
  import { eventQuery } from "$lib/config/sanity/queries";
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import {PortableText} from '@portabletext/svelte'
  import { LocaleConfig } from '$lib/utils/index'

  export let data: PageData;

  $: ({ initialData, previewMode, slug } = data);
  $: ({ data: eventData } = previewSubscription(eventQuery, {
    params: { slug },
    initialData,
    enabled: previewMode && !!slug,
  }));

  $: eventDate = new Date($eventData?.event?.date)
  $: eventDateFormatted = eventDate.toLocaleDateString('es-CL', LocaleConfig)
  $: hours = eventDate.getHours()
  $: minutes = eventDate.getMinutes()
</script>

<svelte:head>
  <title>{$eventData?.event?.title}</title>
</svelte:head>

{#if $eventData?.event}
<div class="xl:container xl:mx-auto min-w-[350px]">
<div class="mt-28 flex flex-col md:flex-row px-4 gap-4">
    <figure class="mb-8 md:w-2/3">
      <img class="h-72 md:h-full object-cover w-fit" loading="lazy" src={urlForImage($eventData?.event.poster).width(800).quality(90).url()} alt="Boveda Secreta">
    </figure>  

      <div class="mx-auto max-w-prose prose-p:text-lg">
        {#if !$eventData?.event?.active}
        <time class="italic text-gray-500" datetime={eventDateFormatted.charAt(0).toUpperCase() + eventDateFormatted.slice(1)}>
          {eventDateFormatted.charAt(0).toUpperCase() + eventDateFormatted.slice(1)}
        </time>
        {/if}
        <h1 class="mt-2 text-3xl font-bold leading-8 tracking-tight text-primary sm:text-4xl">{$eventData?.event?.title} 
          {#if $eventData?.event?.active}
          <span class="font-semibold leading-6 text-primary uppercase tracking-widest text-lg">(+18)</span>
          {/if}
        </h1>
        <div class="prose prose-indigo mt-5">
          <p>
            {#if $eventData?.event?.active && $eventData?.event?.description}
            <PortableText
            value={$eventData?.event?.description}
            />
            {:else if !$eventData?.event?.active && $eventData?.event?.result}
            <p>Estos fueron los resultados:</p>
            <PortableText
            value={$eventData?.event?.result}
            />
            {/if}
          </p>

          {#if $eventData?.event?.active}
          <ul>
            <li>
              <time datetime={eventDateFormatted}>
                {eventDateFormatted.charAt(0).toUpperCase() + eventDateFormatted.slice(1)}
              </time>
            </li>
            <li>
              <time datetime={eventDateFormatted}>
                {hours}:{minutes < 10 ? '0' + minutes : minutes}
              </time>
              → Inicio show <span class="italic text-gray-500">(apertura 45 minutos antes)</span>
            </li>
            {#if $eventData?.event.boveda}
            <li>Bóveda Secreta - <a class="text-primary" target="_blank" rel="noreferrer" href="https://goo.gl/maps/85ZfvTdLAoDpt9xr9"> San Antonio 705, Santiago, Región Metropolitana</a></li>
            {:else}
             <li>{$eventData.event.venue?.venueName} - <a class="text-primary" target="_blank" rel="noreferrer" href={$eventData.event.venue?.venueUrl}> {$eventData.event.venue.venueAdress}</a></li>
            {/if}
          </ul>
          {:else}
          {#if !$eventData?.event.boveda}
            <p>Este evento se realizo en {$eventData.event.venue?.venueName} - <a target="_blank" rel="noreferrer" href={$eventData.event.venue?.venueUrl}> {$eventData.event.venue?.venueAdress}</a></p>
          {:else}
            <p>Este evento se realizo en Bóveda Secreta - <a target="_blank" rel="noreferrer" href="https://goo.gl/maps/85ZfvTdLAoDpt9xr9"> San Antonio 705, Santiago, Región Metropolitana</a></p>
            {/if}
          {/if} 



          {#if $eventData?.event.boveda && $eventData?.event?.active}
            <p class="border border-dashed border-primary p-4">
              La Bóveda Secreta se encuentra en el 3er piso de la Galería “Nueva Copacabana” ubicada en calle San Antonio #705, Santiago Centro. Las estaciones de Metro más cercanas a ella son <span class="underline underline-offset-2 decoration-wavy decoration-primary">Plaza de Armas</span>, <span class="underline underline-offset-2 decoration-wavy decoration-primary">Bellas Artes</span> y <span class="underline underline-offset-2 decoration-wavy decoration-primary">Puente Cal y Canto</span>. 
            </p>
          {/if}
        
        </div>

        {#if $eventData?.event.ticket.soldOut && $eventData?.event?.active}
          <div class="alert alert-error shadow-lg flex justify-center rounded-none mt-4">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
              </svg>
                      
              <span class="uppercase tracking-widest">Adhesión agotadas</span>
            </div>
          </div>
        {:else if !$eventData?.event.ticket.soldOut && $eventData?.event.active && $eventData?.event.ticket.url }
          <div class="mt-4 gap-4 flex flex-col md:flex-row sm:justify-center lg:justify-start">
            <div class="rounded-md w-full">
              <a href={$eventData?.event?.ticket?.url} class="flex w-full items-center rounded-none hover:bg-cyan-500 hover:text-white justify-center border border-transparent bg-yellow-400 uppercase tracking-widest px-8 py-3 text-base font-medium text-black md:py-4 md:px-10 md:text-lg">Entrada General</a>
              {#if $eventData?.event.ticket.price}
                <p class="mt-2 text-center text-gray-500 italic leading-4">Precio adhesión: ${$eventData?.event.ticket.price}</p>
              {/if}
            </div>
          </div>
        {/if}
        
      </div>

</div>
</div>
{:else}
  <h1>Ups! no encontramos el evento que buscas.</h1>
{/if}
