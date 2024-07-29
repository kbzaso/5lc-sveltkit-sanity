<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import Error from "$lib/components/Error.svelte";
  import { LocaleConfig } from "$lib/utils";
  import { paymentIdService } from "$lib/stores/paymentIdService";
  import { VENUE } from "$lib/const";
  export let data: PageData;

  $: ({
    customer_email,
    customer_name,
    ticket_amount,
    ticket_price,
    event,
    status,
    tcketType,
    payment_id_service,
  } = data);

  $: eventDate = new Date(event?.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);
  $: hours = eventDate.getHours();
  $: minutes = eventDate.getMinutes();

  $: formattedFinalPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(Number(ticket_price));
</script>

<main class="min-h-screen relative mx-auto md:flex md:content-center">
  {#if status === "success"}
    <figure class="z-10 absolute md:opacity-20 lg:opacity-100 lg:relative">
      <img
        id="poster"
        class="md:rounded-sm"
        loading="eager"
        width="1000"
        height="750"
        src={urlForImage(event.poster).width(600).height(750).url()}
        alt="Afiche del evento"
      />
    </figure>
  {/if}

  <div
    class="mx-auto prose items-center container px-4 content-center z-10 absolute md:relative md:mt-20 bottom-10"
  >
    <div
      class={`badge ${status === "success" ? "badge-accent" : "badge-error"}`}
    >
      {status === "success" ? "Adhesión exitosa" : "Error en la adhesión"}
    </div>

    <h1 class="mt-4 text-3xl font-bold text-white sm:text-4xl mb-4">
      {status === "success"
        ? "¡Gracias por tu adhesión!"
        : "¡Ups! Algo salió mal"}
    </h1>

    <p class="text-white md:text-gray-400 mt-3">
      {status === "success"
        ? `${customer_name} en unos minutos recibirás un correo en ${customer_email} con los detalles de tu compra para "${event.title}".`
        : `Lo sentimos, algo paso en el proceso de pago y finalmente el cobro no se ha realizado a tu cuenta, te pedimos lo vuelvas a intentar. 🙏`}
    </p>
    {#if status === "success"}
      <div class="border border-gray-700 border-dashed rounded-sm">
        {#if ticket_amount}
          <ul class="text-white list-none leading-normal">
            <li class="text-white">
              {ticket_amount}
              {ticket_amount > 1 ? "entradas" : "entrada"}
              <div class="badge badge-primary badge-outline">{tcketType}</div>
            </li>
            <li />
            <li>N.º de orden: {payment_id_service}</li>
            <li>Total pagado: {formattedFinalPrice} CLP</li>
            <li>
              Lugar: <a
                class="text-primary"
                rel="noreferrer"
                target="_blank"
                href={event?.venue?.venueUrl
                  ? event?.venue?.venueUrl
                  : VENUE.MAP_URL}
                >{event?.venue?.venueAdress
                  ? event?.venue?.venueAdress
                  : VENUE.ADDRESS}</a
              >
            </li>
          </ul>
        {/if}
      </div>
    {/if}

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
