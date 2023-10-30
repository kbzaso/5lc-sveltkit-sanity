<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import Header from "$lib/components/Header.svelte";
  import { PortableText } from "@portabletext/svelte";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Modal from "$lib/components/Modal.svelte";
  import { enhance } from "$app/forms";

  export let data: PageData;

  $: ({ settings, welcome, nextEvent } = data);

  $: eventDate = new Date(nextEvent.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);
  $: hours = eventDate.getHours();
  $: minutes = eventDate.getMinutes();

  let seo_image = urlForImage($page.data.settings?.logo).url();

  let selectedOption: string;
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
    <div
      class="xl:container xl:mx-auto min-w-[350px] mx-auto px-4 -mt-32 md:-mt-48 h-min"
    >
      <div
        id="nextEvent"
        class="relative h-fit mt-28 flex flex-col md:flex-row md:gap-4 lg:gap-0"
      >
        <div class="lg:relative lg:inset-y-0 lg:left-0 lg:w-1/3 z-30">
          <a href={`/eventos/${nextEvent.slug}`} title="Próximo evento">
            <img
              class="object-contain lg:hover:rotate-2 lg:hover:scale-105 transition-transform md:rounded-sm"
              loading="lazy"
              width="600"
              height="750"
              src={urlForImage(nextEvent.poster).width(600).height(750).url()}
              alt="Afiche del próximo evento"
            />
          </a>
        </div>
        <div class="relative pb-16 ">
          <div class="lg:pl-8 mt-4 lg:mt-0">
            <div class="mx-auto text-base lg:ml-auto lg:mr-0">
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
              <div class="mt-6 flex gap-2">
                <svg
                  class="mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  ><path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2"
                  /></svg
                >
                <h3 class="text-white font-ibm font-black text-2xl italic">Adhesión al evento</h3>
              </div>
              <form
                action="?/pay"
                method="POST"
                use:enhance
                class="grid gap-y-4 grid-cols-1 md:grid-cols-2 mt-4"
              >
                <input
                  type="text"
                  placeholder="Nombre"
                  id="name"
                  name="name"
                  required
                  class="input input-bordered input-primary w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="RUT"
                  id="rut"
                  name="rut"
                  required
                  class="input input-bordered input-primary w-full max-w-xs"
                />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  class="input input-bordered input-primary w-full max-w-xs"
                />

                <select
                  id="tickets"
                  name="tickets"
                  required
                  class="select select-warning w-full max-w-xs outline-none ring-0"
                >
                  <option disabled selected>Numero de entradas</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <button
                  type="submit"
                  class="flex grow items-center rounded-none btn btn-primary cursor-pointer text-black no-underline col-span-2"
                  >Comprar</button
                >
              </form>

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
