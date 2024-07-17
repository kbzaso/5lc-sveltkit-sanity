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
        height: 2000,
        width: 1333,
        photographer: image.photographer?.name,
        photographerUrl: image.photographer?.imageUrl,
      };
    }
  });

  let bp: any;

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
      bp.close();
    }
  });
</script>

<section class="border-2 border-primary">
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
