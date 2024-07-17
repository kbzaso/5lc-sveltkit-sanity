<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { urlForImage } from "$lib/config/sanity";

  import BiggerPicture from "bigger-picture/svelte";
  import "bigger-picture/css";

  export let images;
  export let id: string;

  let galleryImages = images.map((image: any) => {
    if (!image.vertical) {
      return {
        img: urlForImage(image).height(1333).width(2000).quality(80).url(),
        thumb: urlForImage(image).width(400).quality(50).url(),
        alt: image.alt,
        height: 2000,
        width: 3000,
        photographer: image.photographer?.name,
        photographerUrl: image.photographer?.imageUrl,
      };
    } else if (image.vertical) {
      return {
        img: urlForImage(image).height(2000).width(1333).quality(80).url(),
        thumb: urlForImage(image).width(400).quality(50).url(),
        alt: image.alt,
        height: 1000,
        width: 750,
        photographer: image.photographer?.name,
        photographerUrl: image.photographer?.imageUrl,
      };
    }
  });

  let bp;

  onMount(() => {
    // initialize BiggerPicture
    bp = BiggerPicture({
      target: document.getElementById("inline")!
    });

    // open inline gallery
    bp.open({
      items: galleryImages,
      inline: true,
      scale: 1,
      intro: "fadeup",
      noClose: true,
    });
  });

  onDestroy(() => {
    if (bp) {
      bp.destroy();
    }
  });
</script>

<section>
  <!-- <div
    id="images"
    class="columns-2 sm:columns-3 md:columns-4 lg:columns-4 xl:columns-5"
  >
    {#each galleryImages as image}
      <a
        class={id}
        href={image?.src}
        data-img={image?.src}
        data-thumb={image?.thumb}
        data-height={image?.height}
        data-width={image?.width}
        data-alt={image?.alt}
        data-caption={`Fotografía de ${image?.photographer} (<a class="underline" target="_blank" href=${image?.photographerUrl}>Instagram</a>)`}
        aria-label={image?.alt}
      >
        <img
          class="mb-2 rounded-sm"
          loading="lazy"
          width="400"
          src={image?.thumb}
          alt={image?.alt}
        />
      </a>
    {/each}
  </div> -->
  <div id="inline" class="inline-gallery" />
</section>

<style>
  * {
    box-sizing: border-box;
  }

  .inline-gallery {
    position: relative;
    background: #222;
    overflow: hidden;
  }
  .inline-gallery:before {
    content: "";
    padding-bottom: 66.66%;
    display: block;
  }
</style>
