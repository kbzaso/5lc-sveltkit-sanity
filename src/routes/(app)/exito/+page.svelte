<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ customer_email, customer_name, ticket_amount, ticket_price, event } =
    data);
</script>

<main class="min-h-screen relative">
  <figure class="z-10 absolute">
    <img
      id="poster"
      class="md:rounded-sm"
      loading="eager"
      width="600"
      height="750"
      src={urlForImage(event.poster).width(600).height(750).url()}
      alt="Afiche del evento"
    />
  </figure>
  <div
    class="mx-auto prose items-center container px-4 content-center z-10 absolute bottom-10"
  >
    <div class="badge badge-accent">Adhesión exitosa</div>
    <h1 class="mt-4 text-3xl font-bold text-white sm:text-4xl mb-4">
      ¡{customer_name} nos vemos en {event.venue.venueName}!
    </h1>

    <p class="text-white mt-3">
      En unos minutos recibirás un correo a <span class="text-primary"
        >{customer_email}</span
      > con los detalles de tu adhesión.
    </p>

    <div class="p-2 border border-gray-700 border-dashed rounded-sm">
      {#if ticket_amount}
        <div class="flex flex-col text-white">
          <span
            >Cantidad: {ticket_amount}
            {ticket_amount > 1 ? "adhesiones" : "adhesión"} para "{event.title}"</span
          >
          <span>Total: ${ticket_price} CLP</span>
          <span
            >Lugar: <a
              class="text-primary"
              rel="noreferrer"
              target="_blank"
              href={event.venue.venueUrl}>{event.venue.venueAdress}</a
            ></span
          >
        </div>
      {/if}
    </div>

      <div class="mt-10 flex justify-center">
        <a
          href="/"
          class="btn btn-primary cursor-pointer text-black no-underline w-full md:w-fit"
          >Volver al inicio</a
        >
      </div>
  </div>
</main>

<style>
  #poster {
    mask-image: linear-gradient(black 10%, transparent 90%);
  }
</style>
