<script lang="ts">
  import { previewSubscription } from "$lib/config/sanity";
  import { staffQuery } from "$lib/config/sanity/queries";
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import { PortableText } from "@portabletext/svelte";
  import { LocaleConfig } from "$lib/utils/index";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import AiOutlineInstagram from "svelte-icons-pack/ai/AiOutlineInstagram";
  import AiOutlineFacebook from "svelte-icons-pack/ai/AiOutlineFacebook";
  import AiOutlineYoutube from "svelte-icons-pack/ai/AiOutlineYoutube";
  import FiTwitter from "svelte-icons-pack/fi/FiTwitter";
  import SiTiktok from "svelte-icons-pack/si/SiTiktok";
  import BiLink from "svelte-icons-pack/bi/BiLink";
  import Gallery from "$lib/components/Gallery.svelte";
  import Splide from "$lib/components/Splide.svelte";
  import { page } from "$app/stores";

  export let data: PageData;

  $: ({ initialData, previewMode, slug, allStaffSlider } = data);
  $: ({ data: staffData } = previewSubscription(staffQuery, {
    params: { slug },
    initialData,
    enabled: previewMode && !!slug,
  }));

  // Función para comparar de forma aleatoria
  function compararAleatoriamente() {
    return Math.random() - 0.5;
  }

  $: seo_image = urlForImage($staffData.staff?.staffImage)
    .width(200)
    .height(200)
    .quality(90)
    .url();

  $: eventDate = new Date($staffData.staff.data.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);

  let innerWidth = 0;
  $: condition = innerWidth < 768;

</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title
    >{$staffData.staff.title} - {$staffData?.staff?.pseudonym
      ? $staffData?.staff?.pseudonym
      : ""}</title
  >
  <meta
    content={`${$page.url.origin}/og?message=${seo_image}`}
    property="og:image"
  />
  <meta name="description" content={`${$staffData.staff.seo_description}`} />
  <meta
    property="twitter:image"
    content={`${$page.url.origin}/og?message=${seo_image}`}
  />
  <meta
    property="twitter:card"
    content={`${$page.url.origin}/og?message=${seo_image}`}
  />
  <meta
    property="twitter:title"
    content={`${$staffData.staff.title} - ${$staffData?.staff?.pseudonym}`}
  />
  <meta
    property="twitter:description"
    content={`${$staffData.staff.seo_description}`}
  />

  <meta
    property="og:title"
    content={`${$staffData.staff.title} - ${$staffData?.staff?.pseudonym}`}
  />
  <meta
    property="og:description"
    content={`${$staffData.staff.seo_description}`}
  />
  <meta property="og:url" content={`${$page.url.href}`} />
</svelte:head>

<div
  class="relative w-full max-w-screen-2xl mx-auto"
  data-sveltekit-preload-data="off"
>
  <header
    id="header"
    class={`bg-[url('https://cdn.sanity.io/images/izngoptr/production/67836059903820f9cb2e62c1dc4afe078516e61d-1500x1000.jpg?q=80&fit=max&auto=format')] relative overflow-hidden bg-cover lg:h-fit bg-center bg-no-repeat`}
  >
    <div
      class="pt-24 z-10 w-full flex flex-col lg:flex-row lg:justify-left items-center"
    >
      {#if $staffData?.staff}
        <div class="">
          <figure
            class="relative max-w-[670px] md:min-w-[670px] flex justify-center min-h-fit"
          >
            <img
              height="850"
              width="670"
              class="object-contain"
              fetchpriority="high"
              src={urlForImage($staffData.staff?.staffImage)
                .width(670)
                .height(850)
                .quality(80)
                .url()}
              alt={$staffData.staff.title}
            />
            {#if $staffData.staff.principalPhotographer !== null && $staffData.staff.principalPhotographer !== undefined}
              <figcaption
                class="absolute bottom-20 lg:bottom-20 italic z-20 left-0 w-full text-sm flex justify-center items-end text-gray-300"
              >
                <span class="bg-black/50 backdrop-blur-lg px-2 py-1 rounded-sm">
                  Fotografo/a:<a
                    class=" ml-2 link hover:text-primary underline"
                    target="_blank"
                    rel="noreferrer"
                    href={$staffData.staff.principalPhotographer.photographer
                      .imageUrl}
                    >{$staffData.staff.principalPhotographer.photographer
                      .name}</a
                  >
                </span>
              </figcaption>
            {/if}
          </figure>
          <div
            class="absolute bottom-0 bg-gradient-to-t lg:from-black/100 lg:via-black/60 from-black/60 via-black/0  to-transparent h-96 w-full invisible lg:visible z-10"
          />
        </div>
      {/if}
    </div>
  </header>
  <section
    class="bg-black/25  lg:bg-black/50 lg:h-fit p-8  w-full lg:w-1/2 space-y-2  -mt-16 lg:mt-10 backdrop-blur-xl lg:absolute top-20 right-5 z-30"
  >
    <div class="flex flex-col items-center space-y-1 lg:items-start pb-8">
      <h2 class="text-sm uppercase tracking-widest text-white text-center">
        {$staffData?.staff?.pseudonym ? $staffData?.staff?.pseudonym : ""}
      </h2>
      <h1
        class="text-6xl md:text-7xl font-black italic text-primary text-center sm:text-left"
      >
        {$staffData.staff.title}
      </h1>
    </div>

    <div class="flex flex-col items-center prose-p:text-lg">
      <div>
        {#if $staffData.staff.data?.weight}
          <p class="text-gray-300">
            Peso: <span class="text-primary font-bold"
              >{$staffData.staff.data?.weight} kgs.</span
            >
          </p>
        {/if}
        {#if $staffData.staff.data?.height}
          <p class="text-gray-300">
            Altura: <span class="text-primary font-bold"
              >{$staffData.staff.data?.height} cms.</span
            >
          </p>
        {/if}
        {#if eventDateFormatted}
          <p class="text-gray-300">
            Debut en la bóveda: <time class="text-primary font-bold"
              >{eventDateFormatted.charAt(0).toUpperCase() +
                eventDateFormatted.slice(1)}</time
            >
          </p>
        {/if}
        {#if $staffData.staff.description}
          <p
            class="pt-4 prose hover:prose-a:after:text-primary hover:prose-a:decoration-primary prose-a:decoration-blue-500 prose-a:decoration-2 prose-a:underline-offset-2 prose-a:after:content-['_↗'] prose-p:text-gray-300 prose-em:underline prose-em:decoration-2  prose-em:decoration-primary prose-em:underline-offset-2 prose-em:text-gray-300 prose-a:after:text-blue-500 prose-a:after:font-black"
          >
            <PortableText value={$staffData.staff.description} />
          </p>
        {/if}

        <div class="mt-8 space-y-4">
          <h4 class="text-primary font-ibm italic text-2xl">Redes Sociales</h4>

          <ul class="flex space-x-4">
            {#if $staffData.staff.social.instagram}
              <li>
                <a
                  title="Perfil en Instagram"
                  aria-label="Perfil en Instagram"
                  target="_blank"
                  rel="noreferrer"
                  href={$staffData.staff.social.instagram}
                  ><Icon
                    src={AiOutlineInstagram}
                    className="fill-white hover:fill-primary"
                    size="26"
                  /></a
                >
              </li>
            {/if}
            {#if $staffData.staff.social.facebook}
              <li>
                <a
                  title="Perfil en Facebook"
                  aria-label="Perfil en Facebook"
                  target="_blank"
                  rel="noreferrer"
                  href={$staffData.staff.social.facebook}
                  ><Icon
                    src={AiOutlineFacebook}
                    className="fill-white hover:fill-primary"
                    size="26"
                  /></a
                >
              </li>
            {/if}
            {#if $staffData.staff.social.youtube}
              <li>
                <a
                  title="Perfil en Youtube"
                  aria-label="Perfil en Youtube"
                  target="_blank"
                  rel="noreferrer"
                  href={$staffData.staff.social.youtube}
                  ><Icon
                    src={AiOutlineYoutube}
                    className="fill-white hover:fill-primary"
                    size="26"
                  /></a
                >
              </li>
            {/if}
            {#if $staffData.staff.social.twitter}
              <li>
                <a
                  title="Perfil en Twitter"
                  aria-label="Perfil en Twitter"
                  target="_blank"
                  rel="noreferrer"
                  href={$staffData.staff.social.twitter}
                  ><Icon
                    src={FiTwitter}
                    className="fill-white hover:fill-primary"
                    size="24"
                  /></a
                >
              </li>
            {/if}
            {#if $staffData.staff.social.tiktok}
              <li>
                <a
                  title="Perfil en TikTok"
                  aria-label="Perfil en TikTok"
                  target="_blank"
                  rel="noreferrer"
                  href={$staffData.staff.social.tiktok}
                  ><Icon
                    src={SiTiktok}
                    className="fill-white hover:fill-primary"
                    size="22"
                  /></a
                >
              </li>
            {/if}
            {#if $staffData.staff.social.other}
              <li>
                <a
                  title="Perfil en una web externa"
                  aria-label="Perfil en una web externa"
                  target="_blank"
                  rel="noreferrer"
                  href={$staffData.staff.social.other}
                  ><Icon
                    src={BiLink}
                    className="fill-white hover:fill-primary"
                    size="26"
                  /></a
                >
              </li>
            {/if}
          </ul>
        </div>
      </div>
    </div>
  </section>

  {#if $staffData?.staff.gallery !== null}
    <section class="md:mt-20 lg:mt-40">
      <h3
        class="px-4 text-white container mx-auto mb-4 font-ibm font-black text-2xl italic underline decoration-primary"
      >
        Galería de imagenes
      </h3>
      <div
        class="container p-4 mx-auto w-full flex flex-col justify-center h-fit"
      >
        <Gallery id={$staffData.staff.slug} images={$staffData.staff.gallery} />
      </div>
    </section>
  {/if}

  <div class="py-4 px-4 mt-10 rounded-md min-w-[320px]">
    <h3
      class="text-white container mx-auto mb-4 font-ibm font-black text-2xl italic underline decoration-primary"
    >
      Otros miembros del equipo
    </h3>
    <Splide allStaff={allStaffSlider.sort(compararAleatoriamente)} />
  </div>
</div>
