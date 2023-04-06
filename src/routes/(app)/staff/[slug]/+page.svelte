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
  import { onMount } from "svelte";
  import Carousel from "$lib/components/Carousel.svelte";

  export let data: PageData;

  $: ({ initialData, previewMode, slug } = data);
  $: ({ data: staffData } = previewSubscription(staffQuery, {
    params: { slug },
    initialData,
    enabled: previewMode && !!slug,
  }));

  $: eventDate = new Date($staffData.staff.data.date);
  $: eventDateFormatted = eventDate.toLocaleDateString("es-CL", LocaleConfig);
</script>

<div class="relative">
  <header
    class="relative overflow-hidden bg-[url('https://res.cloudinary.com/dtj5xnlou/image/upload/v1679921653/5LC/background.avif')] bg-cover"
  >
    <div class="pt-24 z-10 w-full flex flex-col xl:flex-row justify-center ">
      {#if $staffData?.staff}
        <div class="flex flex-col items-center">
          <figure class="relative max-w-[670px] md:min-w-[670px]">
            <img
              src={urlForImage($staffData.staff.staffImage).url()}
              alt={$staffData.staff.title}
            />
          </figure>
          <div
            class="absolute bottom-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent h-96 w-full invisible xl:visible"
          />
        </div>
        <section
          class="bg-black/75 lg:h-fit p-8  w-full xl:w-fit space-y-2 z-10 -mt-72 xl:mt-20 backdrop-blur-md"
        >
          <div class="flex flex-col items-center space-y-4 xl:items-start">
            <h2 class="text-sm uppercase tracking-widest text-white">
              {$staffData.staff.pseudonym}
            </h2>
            {#if !$staffData.staff.imageTitle}
              <h1 class="text-4xl font-bold text-primary">
                {$staffData.staff.title}
              </h1>
            {:else}
              <img
                class="pb-10 max-w-sm md:max-w-md"
                src={urlForImage($staffData.staff.imageTitle).url()}
                alt={$staffData.staff.title}
              />
            {/if}
          </div>
          <div class="flex flex-col items-center">
            <div>
              <p class="text-gray-300">
                Peso: <span class="text-primary font-bold"
                  >{$staffData.staff.data.weight} kgs.</span
                >
              </p>
              <p class="text-gray-300">
                Altura: <span class="text-primary font-bold"
                  >{$staffData.staff.data.height} cms.</span
                >
              </p>
              <p class="text-gray-300">
                Debut en la bóveda: <time class="text-primary font-bold"
                  >{eventDateFormatted.charAt(0).toUpperCase() +
                    eventDateFormatted.slice(1)}</time
                >
              </p>
              {#if $staffData.staff.description}
                <p
                  class="pt-4 prose prose-p:text-gray-300 prose-em:underline prose-em:decoration-2  prose-em:decoration-primary prose-em:underline-offset-2 prose-em:text-gray-300"
                >
                  <PortableText value={$staffData.staff.description} />
                </p>
              {/if}

                <ul class="flex space-x-4 pt-10">
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
        </section>
      {/if}
    </div>
    <div
      class="absolute bottom-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent h-96 w-full"
    />
  </header>

  {#if $staffData?.staff.gallery.images.length > 0}
    <div class="container mx-auto w-full xl:w-1/2 flex flex-col justify-center">
      <section
        class=" mx-auto bg-primary p-8"
      >
        <Carousel images={$staffData.staff.gallery.images} />
      </section>
      <p class="text-gray-500 text-center py-2 text-sm mt-2">
        Fotografós: {$staffData.staff.gallery.images.map(
          (image) => image.author
        )}
      </p>
    </div>
  {/if}
</div>
