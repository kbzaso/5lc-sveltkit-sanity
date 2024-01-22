<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import Header from "$lib/components/Header.svelte";
  import { PortableText } from "@portabletext/svelte";
  import { LocaleConfig } from "$lib/utils/index";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import ModalTickets from "$lib/components/ModalTickets.svelte";
  import InfiniteScroll from "$lib/components/InfiniteScroll.svelte";

  export let data: PageData;

  $: ({ settings, welcome, nextEvent, events } = data);

  $: eventDate = new Date(nextEvent.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);
  $: hours = eventDate.getHours();
  $: minutes = eventDate.getMinutes();

  let seo_image = urlForImage($page.data.settings?.logo).url();

  let formattedFirstsPrice: string;
  let formattedSecondsPrice: string;
  let formattedThirthsPrice: string;
  onMount(() => {
    let firstTicketPrice = nextEvent.ticket?.firsts_tickets?.price;
    let secondsTicketPrice = nextEvent.ticket?.seconds_tickets?.price;
    let thirdsTicketPrice = nextEvent.ticket?.thirds_tickets?.price;

    formattedFirstsPrice = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(firstTicketPrice);
    formattedSecondsPrice = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(secondsTicketPrice);
    formattedThirthsPrice = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(thirdsTicketPrice);
  });
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

<div>
  {#if $page.data.welcome.horizontalLine}
    <InfiniteScroll />
  {/if}
  <Header
    imageTitle={urlForImage(welcome.imageTitle).crop("focalpoint").url()}
    preTitle={welcome.preTitle}
    textTitle={welcome.textTitle}
    description={welcome.description}
  />
  <main class="container px-4 mt-10 mx-auto">
    {#if events && events.length > 0}
      <h1 class="text-3xl sub-title text-white sm:text-4xl">
        Próximos eventos
      </h1>
      <div class="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {#each events as event}
          <a href={`/eventos/${event.slug}`}>
            <div
              class="relative overflow-hidden w-full group border-gray-600 border hover:border-primary rounded-none transition-all h-fit md:h-96"
            >
              {#if event.ticket.firsts_tickets.amount === 0 && event.ticket.seconds_tickets.amount === 0 && event.ticket.thirds_tickets.amount === 0}
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
                  src={urlForImage(event.poster)
                    .height(600)
                    .width(600)
                    .quality(80)
                    .url()}
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
                    {new Date(event.date).toLocaleDateString(
                      "es-CL",
                      LocaleConfig
                    )}
                  </time>
                </p>

                <h2
                  class="text-primary font-ibm italic text-2xl md:text-4xl px-4 pt-0"
                >
                  {event.title}
                </h2>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </main>
</div>
