<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import { LocaleConfig } from "$lib/utils/index";
  import type { Event } from "$lib/types";
  export let event: Event;
</script>

<a href={`/eventos/${event.slug}`}>
  <div
    class="relative overflow-hidden w-full group border-gray-600 border hover:scale-105 hover:border-primary rounded-none transition-all h-fit md:h-96 ease-in-out group"
  >
    <!-- {#if (event.ticket.batch.firsts_tickets.amount === 0 && event.ticket.batch.seconds_tickets.amount === 0 && event.ticket.batch.thirds_tickets.amount === 0) || !event.sell}
      <div
        class="badge bg-zinc-900 border-none rounded-sm absolute top-2 right-2 uppercase tracking-widest"
      >
        Adhesión agotada
      </div>
    {/if} -->
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
        class="text-xs md:text-md uppercase tracking-wider md:tracking-widest text-white mt-4 px-4 pt-0"
      >
        <time datetime={event.date.toString()}>
          {new Date(event.date).toLocaleDateString("es-CL", LocaleConfig)}
        </time>
      </p>

      <h2 class="text-primary font-ibm italic text-2xl md:text-4xl px-4 pt-0">
        {event.title}
      </h2>
    </div>
  </div>
</a>
