<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  export let image;
  export let link;
</script>

<div class="container mx-auto">
  <div class="mx-auto sm:px-6 lg:px-0">
    <div
      class="relative isolate overflow-hidden  px-4 py-20 sm:py-24 lg:py-24 xl:px-24"
    >
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0"
      >
        <div class="lg:row-start-2 lg:max-w-md">
          <h2
            class="mt-2 text-3xl font-bold leading-8 text-primary sm:text-4xl font-ibm"
          >
            Revive las luchas del evento
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-300">
            Revisa nuestro material audiovisual de este y otros eventos en
            nuestro canal de Youtube, y totalmente gratis.
          </p>
        </div>

        <a
          href={link}
          target="_blank"
          class="relative min-w-full max-w-xl rounded-sm ring-1 ring-white/10 lg:row-span-4 hover:scale-105 transition-all hover:rotate-1 hover:ring-primary"
        >
          <img
            src="https://res.cloudinary.com/dtj5xnlou/image/upload/v1696272331/5LC/bg-yt.png"
            alt="Youtube Screenshot"
            class="absolute aspect-video"
            width="1000"
            height="500"
          />

          <img
            src={urlForImage(image).url()}
            alt="Youtube Screenshot"
            class="aspect-video"
            width="1000"
            height="500"
          />
        </a>
      </div>
      <div
        class="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:bottom-[-12rem] lg:top-auto lg:translate-y-0 lg:transform-gpu"
        aria-hidden="true"
      >
        <div
          class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#f9c414] to-[#f9c414] opacity-25"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        />
      </div>
    </div>
  </div>
</div>
