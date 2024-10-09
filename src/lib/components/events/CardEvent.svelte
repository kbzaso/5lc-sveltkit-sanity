<script lang="ts">
  import { CalendarRange, MapPin } from "lucide-svelte";
  import { urlForImage } from "$lib/config/sanity";
  import { LocaleConfig } from "$lib/utils/index";
  import type { Event } from "$lib/types";
  import { onMount } from "svelte";
  export let event: Event;

  $: eventDate = new Date(event?.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);
  $: hours = eventDate.getHours();
  $: minutes = eventDate.getMinutes();

  let totalTicketsLeftStudio;

  if (event?.sell_type === "batch") {
    // Suma de tickets que quedan en el Studio
    totalTicketsLeftStudio =
      event?.ticket?.batch?.firsts_tickets?.amount +
      event?.ticket?.batch?.seconds_tickets?.amount +
      event?.ticket?.batch?.thirds_tickets?.amount;
    // Suma de tickets que quedan en el Studio + los que se han vendido
  } else {
    totalTicketsLeftStudio =
      event?.ticket?.ubication?.ringside_tickets?.amount +
      event?.ticket?.ubication?.general_tickets?.amount;
  }


</script>

<a href={`/eventos/${event.slug}`} class="group">
  <div
    class="overflow-hidden w-64 h-fit hover:border-primary rounded-none transition-all md:h-96 ease-in-out group relative"
  >
    {#if totalTicketsLeftStudio === 0 || !event.sell}
      <div
        class="badge bg-red-500/90 text-black font-extrabold border-none rounded-sm absolute py-4 uppercase tracking-widest z-10 w-full top-0 transition-all lg:group-hover:-top-12"
      >
        Adhesión agotada
      </div>
    {/if}
    <figure class="z-10 drop-shadow-xl">
      <img
        width="600"
        height="600"
        loading="lazy"
        class={`object-cover object-top h-72 md:h-96 w-full hover:scale-110 ease-in hover:rotate-2 transition-all ${totalTicketsLeftStudio === 0 || !event.sell ? 'grayscale lg:group-hover:grayscale-0 delay-150' : ''}`}
        src={urlForImage(event.poster).height(600).width(600).quality(80).url()}
        alt={event.title}
      />
    </figure>
  </div>
  <div class="h-max grow z-10 w-full">
    <h2 class="text-primary font-ibm italic text-xl pt-2 mask">
      {event.title}
    </h2>
    <p
      class="text-xs md:text-md uppercase tracking-wider md:tracking-widest text-white mt-1 truncate"
    >
      <time class="flex items-center gap-2" datetime={event.date.toString()}>
        <CalendarRange />
        {new Date(event.date).toLocaleDateString("es-CL", LocaleConfig)}
      </time>
    </p>
    <p
      class="text-xs md:text-md uppercase tracking-wider md:tracking-widest text-white mt-1 truncate flex gap-2 items-center"
    >
      <MapPin />
      {event.boveda ? "Bóveda Secreta" : event.venue.venueName}
    </p>
  </div>
</a>