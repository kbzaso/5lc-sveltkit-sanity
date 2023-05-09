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
  import { element, onMount } from "svelte/internal";
  import Gallery from "$lib/components/Gallery.svelte";

  export let data: PageData;

  $: ({ initialData, previewMode, slug, welcome } = data);
  $: ({ data: staffData } = previewSubscription(staffQuery, {
    params: { slug },
    initialData,
    enabled: previewMode && !!slug,
  }));

  $: eventDate = new Date($staffData.staff.data.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);

  let backgroundImage: string;
  onMount(() => {
    console.log($staffData.staff.gallery);
    backgroundImage = urlForImage(welcome.backgroundImage).quality(90).url();
    let header: HTMLElement | null = document.querySelector("#header");
    if (header !== null && header !== undefined) {
      header.style.backgroundImage = `url(${backgroundImage})`;
    } else {
      throw new Error("Header not found");
    }
  });

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
</svelte:head>

<div class="relative w-full max-w-screen-2xl mx-auto">
  <header
    id="header"
    class={`relative overflow-hidden bg-cover lg:h-fit bg-center bg-no-repeat`}
  >
    <div
      class="pt-24 z-10 w-full flex flex-col xl:flex-row xl:justify-left items-center"
    >
      {#if $staffData?.staff}
        <div class="">
          <figure
            class="relative max-w-[670px] md:min-w-[670px] flex justify-center min-h-[500px] xl:min-h-[600px] 2xl:min-h-[700px] 3xl:min-h-[800px]"
          >
            {#if condition}
              <img
                fetchpriority="high"
                src={urlForImage($staffData.staff.staffImage)
                  .width(500)
                  .height(700)
                  .quality(70)
                  .url()}
                alt={$staffData.staff.title}
              />
            {:else}
              <img
                fetchpriority="high"
                src={urlForImage($staffData.staff.staffImage)
                  .width(800)
                  .quality(70)
                  .url()}
                alt={$staffData.staff.title}
              />
            {/if}
            <figcaption
              class="absolute bottom-44 xl:bottom-20 italic z-20 left-0 w-full h-full text-sm flex justify-center items-end text-gray-300"
            >
              <span class="bg-black/25 backdrop-blur-lg px-2 py-1 rounded-sm">
                Fotografo/a:<a
                  class=" ml-2 link hover:text-primary"
                  target="_blank"
                  rel="noreferrer"
                  href={$staffData.staff.principalPhotographer.photographer
                    .imageUrl}
                  >{$staffData.staff.principalPhotographer.photographer.name}</a
                >
              </span>
            </figcaption>
          </figure>
          <div
            class="absolute bottom-0 bg-gradient-to-t xl:from-black/100 xl:via-black/60 from-black/60 via-black/0  to-transparent h-96 w-full invisible xl:visible z-10"
          />
        </div>
      {/if}
    </div>
  </header>
  <section
    class="bg-black/25  xl:bg-black/50 lg:h-fit p-8  w-full xl:w-fit space-y-2  -mt-40 xl:mt-10 backdrop-blur-xl xl:absolute top-20 right-5 z-30"
  >
    <div class="flex flex-col items-center space-y-1 xl:items-start pb-8">
      <h2 class="text-sm uppercase tracking-widest text-white text-center">
        {$staffData?.staff?.pseudonym ? $staffData?.staff?.pseudonym : ""}
      </h2>
      <h1
        class="text-6xl md:text-7xl font-black italic text-primary text-center"
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
            class="pt-4 prose prose-p:text-gray-300 prose-em:underline prose-em:decoration-2  prose-em:decoration-primary prose-em:underline-offset-2 prose-em:text-gray-300"
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
    <div
      class="container mx-auto w-full flex flex-col justify-center md:mt-20 lg:mt-40"
    >
      <Gallery images={$staffData.staff.gallery} />
    </div>
  {/if}
</div>
