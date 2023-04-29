<script>
  import BiggerPicture from "bigger-picture/svelte";
  import { onMount } from "svelte";
  import Macy from "macy";
  import { urlForImage } from "$lib/config/sanity";
  export let images;
  import "bigger-picture/css";

  const galleryImages = images.map((image) => {
    if (!image.vertical) {
      return {
        src: urlForImage(image).height(750).width(1000).quality(90).url(),
        thumb: urlForImage(image).width(400).quality(50).url(),
        alt: image.alt,
        height: 750,
        width: 1000,
      };
    } else if (image.vertical) {
      return {
        src: urlForImage(image).height(1000).width(750).quality(90).url(),
        thumb: urlForImage(image).width(400).quality(50).url(),
        alt: image.alt,
        height: 1000,
        width: 750,
      };
    }
  });

  onMount(() => {
    // initialize
    let bp = BiggerPicture({
      target: document.body,
    });

    // grab image links
    const imageLinks = document.querySelectorAll("#images > a");

    // add click listener to open BiggerPicture
    for (let link of imageLinks) {
      link.addEventListener("click", openGallery);
    }

    // open BiggerPicture
    function openGallery(e) {
      e.preventDefault();
      bp.open({
        items: imageLinks,
        el: e.currentTarget,
      });
    }

    // masonry grid
    Macy({
      container: "#images",
      trueOrder: true,
      margin: {
        x: 10,
        y: 10,
      },
      columns: 3,
      breakAt: {
        520: {
          columns: 2,
        },
      },
    });
  });
</script>

<div id="images">
  {#each galleryImages as image}
      <a
        href={image.src}
        data-img={image.src}
        data-thumb={image.thumb}
        data-height={image.height}
        data-width={image.width}
        data-alt={image.alt}
      >
        <img
          loading="lazy"
          src={image.thumb}
          alt={image.alt}
        />
      </a>
  {/each}
</div>
