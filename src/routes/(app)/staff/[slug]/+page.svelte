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
  import Carousel from "$lib/components/Carousel.svelte";
  import { element, onMount } from "svelte/internal";

  export let data: PageData;

  $: ({ initialData, previewMode, slug } = data);
  $: ({ data: staffData } = previewSubscription(staffQuery, {
    params: { slug },
    initialData,
    enabled: previewMode && !!slug,
  }));

  $: eventDate = new Date($staffData.staff.data.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);

  let authors: string[] = []
  onMount(() => {
    let gallery = $staffData.staff.gallery.images
    authors = gallery.map(image => image.author).filter(Boolean).join(", ")
  })

  let innerWidth = 0
	let innerHeight = 0
	
	$: condition = innerWidth < 768


</script>

<svelte:window bind:innerWidth />

<div class="relative">
  <header
    class={`relative overflow-hidden bg-[url('https://res.cloudinary.com/dtj5xnlou/image/upload/v1671485780/5LC/hero-image.webp')] bg-fixed bg-cover bg-center bg-no-repeat`}
  >
    <div class="pt-24 z-10 w-full flex flex-col xl:flex-row justify-center ">
      {#if $staffData?.staff}
        <div class="flex flex-col items-center">
          <figure class="relative max-w-[670px] md:min-w-[670px] flex justify-center">
            {#if condition}
              <img 
                fetchpriority="high"
                src={urlForImage($staffData.staff.staffImage).width(600).height(1000).quality(70).url()}
                alt={$staffData.staff.title}
              />
              {:else}
              <img 
                fetchpriority="high"
                src={urlForImage($staffData.staff.staffImage).width(800).quality(70).url()}
                alt={$staffData.staff.title}
              />
            {/if}
          </figure>
          <div
            class="absolute bottom-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent h-96 w-full invisible xl:visible"
          />
        </div>
        <section
          class="bg-black/50 lg:h-fit p-8  w-full xl:w-fit space-y-2 z-10 -mt-40 xl:mt-10 backdrop-blur-xl"
        >
          <div class="flex flex-col items-center space-y-1 xl:items-start pb-8">
            <h2 class="text-sm uppercase tracking-widest text-white">
              {$staffData?.staff?.pseudonym ? $staffData?.staff?.pseudonym : ''}
            </h2>
              <h1 class="text-5xl md:text-7xl text-primary ">
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
              <h4 class="text-primary font-ibm text-2xl">Redes Sociales</h4>

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
      {/if}
    </div>
    <div
      class="absolute bottom-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent h-96 w-full"
    />
  </header>

  {#if $staffData?.staff.gallery !== null && $staffData.staff.gallery.images.length > 0 }
    <div class="container mx-auto w-full xl:w-1/2 flex flex-col justify-center">
        <Carousel images={$staffData.staff.gallery.images} />
      {#if authors.length > 0}
      <p class="text-gray-500 text-center py-2 text-sm mt-2">
        Fotografós: 
            {#each authors as author}
              <span>{author}</span>
            {/each}
        </p>
      {/if}

    </div>
  {/if}
</div>
