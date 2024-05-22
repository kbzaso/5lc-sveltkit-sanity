<script lang="ts">
  import { LocaleConfig } from "$lib/utils";
  import type { Event } from "$lib/types";
  import { urlForImage } from "$lib/config/sanity";
  import { PortableText } from "@portabletext/svelte";
  import DisclaimerModal from "./DisclaimerModal.svelte";
  import ModalTickets from "./ModalTickets.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import PlaceDisclaimerBoveda from "./events/PlaceDisclaimerBoveda.svelte";
  import TandasTicketsSell from "./events/TandasTicketsSell.svelte";
  import { calculateUbications } from "$lib/utils/eventUtils";
  import UbicationTicketsSell from "./events/UbicationTicketsSell.svelte";
  import UbicationModalTickets from "./events/UbicationModalTickets.svelte";
  import type { PageData } from "./$types";
  export let event: Event;

  $: eventDate = new Date(event?.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);
  $: hours = eventDate.getHours();
  $: minutes = eventDate.getMinutes();

  let disclaimerEvent = writable([]);

  // Necesito pasar el objeto de tandas a un array para poder ordenarlas
  let ubications = calculateUbications(event.ticket.ubication);
</script>

<div class="container xl:mx-auto min-w-[350px] mx-auto mt-20 h-min">
  <div class="h-fit flex flex-col lg:flex-row md:gap-4 lg:gap-0">
    <div class="relative overflow-hidden">
      <div
        class="absolute w-[640px] h-72 -bottom-5 lg:w-72 lg:h-full z-10  md:top-[480px] lg:top-0 lg:left-[280px] xl:left-[330px] bg-gradient-to-t lg:bg-gradient-to-l from-black/100 via-black/60 to-transparent"
      />
      <img
        class="object-contain md:rounded-sm"
        loading="lazy"
        width="600"
        height="750"
        src={urlForImage(event.poster).width(600).height(750).url()}
        alt="Afiche del próximo evento"
      />
    </div>
    <div class="z-10 relative -top-20 lg:top-0 lg:-left-12 px-4 lg:px-0">
      <div class="mt-4 lg:mt-0">
        <div class="mx-auto text-base lg:ml-auto lg:mr-0">
          {#if event?.active}
            <h2
              class="font-semibold leading-6 text-primary uppercase tracking-widest"
            >
              Próximo evento
            </h2>
            <h1
              class="mt-2 text-3xl font-bold leading-8 text-white sm:text-4xl"
            >
              {event.title}
              <span
                class="font-semibold leading-6 text-primary uppercase tracking-widest text-lg"
                >(+18)</span
              >
            </h1>
            <div class="prose prose-indigo mt-5">
              <p>
                <PortableText value={event?.description} />
              </p>

              <ul>
                <li>
                  <time
                    datetime={new Date(event.date).toLocaleDateString(
                      "es-CL",
                      LocaleConfig
                    )}
                  >
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
                {#if event.boveda}
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
                    {event.venue?.venueName} -
                    <a
                      class="text-primary"
                      target="_blank"
                      rel="noreferrer"
                      href={event.venue?.venueUrl}
                    >
                      {event.venue?.venueAdress}</a
                    >
                  </li>
                {/if}
              </ul>

              {#if event.boveda}
                <PlaceDisclaimerBoveda />
              {/if}
            </div>

            <!-- BATCH -->
            <!-- {#if event.sell_type === "batch"} -->
              <!-- {#if event.active && event.sell} -->
                <!-- TANDAS -->
                <!-- <div class="flex gap-4 my-8">
                  {#each tandas as tanda}
                    <TandasTicketsSell ticket={tanda} />
                  {/each}
                </div> -->
                <!-- PROGRESS -->
                <!-- <div>
                  <div class="flex justify-between">
                    <span class="text-gray-400"
                      >🎟️ {event?.ticket?.seconds_tickets?.amount <= 10
                        ? "¡Últimas entradas!, no te quedes fuera."
                        : "Progreso de venta de tickets"}</span
                    >
                    <span class="animate-bounce">🔥</span>
                  </div>
                  <progress
                    class={`progress w-full ${
                      event?.ticket?.firsts_tickets?.amount !== 0
                        ? "progress-success"
                        : event?.ticket?.seconds_tickets?.amount !== 0
                        ? "progress-info"
                        : "progress-error"
                    }`}
                    value={event.tickets_sold}
                    max={event?.total_tickets}
                  />
                </div> -->
              <!-- {/if} -->
            <!-- {/if} -->


            
              <!-- <div
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

                <span class="uppercase tracking-widest">Adhesión agotada</span>
              </div> -->
{#if event.sell_type === "ubication"}
              <div class="flex gap-4 my-8">
                {#each ubications as ubication}
                  <UbicationTicketsSell ticket={ubication} />
                {/each}
              </div>

              <div class="mt-4">
                {#if event?.disclaimers}
                  <DisclaimerModal
                    disclaimers={event?.disclaimers}
                    {disclaimerEvent}
                  />
                  <UbicationModalTickets ticket={event.ticket.ubication} {disclaimerEvent} />
                {/if}
              </div>
        {/if}

          {/if}
          
          <!-- BATCH -->

          <!-- UBICATION -->

          <!-- UBICATION -->
        </div>
      </div>
    </div>
  </div>
</div>
