<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import { LocaleConfig } from "$lib/utils/index";
  import type { Event } from "$lib/types";
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

<a href={`/eventos/${event.slug}`}>
  <div
    class="relative overflow-hidden w-full group border-gray-600 border hover:scale-105 hover:border-primary rounded-none transition-all h-fit md:h-96 ease-in-out group"
  >
    {#if totalTicketsLeftStudio === 0 || !event.sell}
      <div
        class="badge bg-zinc-900 border-none rounded-sm absolute top-2 right-2 uppercase tracking-widest"
      >
        Adhesión agotada
      </div>
    {/if}
    <figure class="z-10">
      <img
        width="600"
        height="600"
        loading="lazy"
        class="object-cover object-top h-72 md:h-96 w-full"
        src={urlForImage(event.poster).height(600).width(600).quality(80).url()}
        alt={event.title}
      />
    </figure>

    <div
      class="bg-zinc-900/50 h-max grow backdrop-blur-xl absolute bottom-0 z-10 w-full pb-4"
    >
      <p
        class="text-xs md:text-md uppercase tracking-wider md:tracking-widest text-white mt-4 px-2 pt-0 truncate"
      >
        <time datetime={event.date.toString()}>
          {new Date(event.date).toLocaleDateString("es-CL", LocaleConfig)}
        </time>
        -
        <time datetime={eventDateFormatted}>
          {hours}:{minutes < 10 ? "0" + minutes : minutes}
        </time>
      </p>

      <h2 class="text-primary font-ibm italic text-2xl px-2 pt-0">
        {event.title}
      </h2>
      <p
        class="text-xs md:text-md uppercase tracking-wider md:tracking-widest text-white mt-1 px-2 pt-0 truncate"
      >
        {event.boveda ? "Bóveda Secreta" : event.venue.venueName}
      </p>
    </div>
  </div>
</a>
