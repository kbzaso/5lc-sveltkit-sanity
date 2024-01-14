<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  export let image: string;
  export let link: string;
</script>

<div class="mx-auto">
  <div class="mx-auto xl:container">
    <div class="relative isolate overflow-hidden px-4 sm:py-24 lg:py-24">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0"
      >
        <div class="lg:row-start-2 lg:max-w-md">
          <h2
            class="mt-2 text-3xl font-bold leading-8 text-primary sm:text-4xl font-ibm"
          >
            Revive las luchas
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-300">
            Revisa nuestro material audiovisual de este y otros eventos en
            nuestro canal de Youtube.
          </p>
        </div>

        <!-- {#if image} -->
          <a
            rel="noreferrer"
            href={link}
            target="_blank"
            class="relative group min-w-full max-w-7xl rounded-sm ring-1 lg:ring-white/10 rotate-1 lg:rotate-0 ring-primary lg:row-span-4 hover:scale-105 transition-all hover:rotate-1 hover:ring-primary origin-bottom-right"
          >
            <svg
              class="absolute z-10 text-red-600 left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] lg:-top-0 lg:-left-0 lg:-rotate-12 group-hover:text-white group-hover:scale-150 group-hover:rotate-0 group-hover:left-[50%] group-hover:-translate-x-[50%] group-hover:top-[50%] group-hover:-translate-y-[50%] transition-all"
              xmlns="http://www.w3.org/2000/svg"
              width="125"
              height="125"
              viewBox="0 0 24 24"
              ><path
                fill="currentColor"
                d="m10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73Z"
              /></svg
            >
            <img
              src="https://res.cloudinary.com/dtj5xnlou/image/upload/v1696272331/5LC/bg-yt.png"
              alt="Youtube Screenshot"
              class="absolute aspect-video"
              width="736"
              height="414"
            />
            <img
              src={urlForImage(image).height(414).width(736).quality(100).url()}
              alt="Youtube Screenshot"
              class="aspect-video grayscale hover:grayscale-0 transition-all"
              width="736"
              height="414"
            />
          </a>
        <!-- {/if} -->
      </div>
    </div>
  </div>
</div>
