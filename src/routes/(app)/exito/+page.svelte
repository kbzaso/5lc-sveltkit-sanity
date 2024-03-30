<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import Error from "$lib/components/Error.svelte";

  export let data: PageData;

  $: ({
    customer_email,
    customer_name,
    ticket_amount,
    ticket_price,
    event,
    status,
    method,
  } = data);
</script>


  <main class="min-h-screen relative mx-auto md:flex md:content-center">
    <figure class="z-10 absolute md:opacity-20 lg:opacity-100 lg:relative">
      {#if event !== null && event !== undefined}
        <img
          id="poster"
          class="md:rounded-sm"
          loading="eager"
          width="1000"
          height="750"
          src={urlForImage(event.poster).width(600).height(750).url()}
          alt="Afiche del evento"
        />
      {/if}
    </figure>
    <div
      class="mx-auto prose items-center container px-4 content-center z-10 absolute md:relative md:mt-20 bottom-10"
    >
      <div class="badge badge-accent">{status === 'success' ? "Adhesión exitosa" : status}</div>
      <h1 class="mt-4 text-3xl font-bold text-white sm:text-4xl mb-4">
        {#if data.venue !== null && data.venue !== undefined && customer_name}
          ¡{customer_name} nos vemos en {event.venue.venueName}!
        {:else}
          ¡Nos vemos en el evento!
        {/if}
      </h1>

      <p class="text-white md:text-gray-400 mt-3">
        En unos minutos recibirás un correo <span
          >{customer_email ? `en ${customer_email}` : ""}</span
        > con los detalles de tu adhesión.
      </p>

      <div class="border border-gray-700 border-dashed rounded-sm">
        {#if ticket_amount}
          <ul class="text-white md:text-gray-400 list-none leading-normal">
            <li>
              Cantidad: {ticket_amount}
              {ticket_amount > 1 ? "adhesiones" : "adhesión"} para "{event.title}"
            </li>
            <li>Total: ${ticket_price} CLP</li>
            <li>
              Lugar: <a
                class="text-primary"
                rel="noreferrer"
                target="_blank"
                href={event.venue.venueUrl}>{event.venue.venueAdress}</a
              >
            </li>
            <li>Pasarela de pago: {method}</li>
          </ul>
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
