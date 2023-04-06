<script lang="ts">
    import { Carousel } from 'flowbite-svelte'
  let showThumbs=false
  let showCaptions=false

  import { urlForImage } from "$lib/config/sanity";

  export let images: any;

  for (let i = 0; i < images.length; i++) {
    images[i].id = i + 1;
}

$: counter = 1
const handleClickSum = () => {
    if (counter !== images.length) {
        counter++
    } 
    console.log(counter)
}

const handleClickMin = () => {
    if (counter !== 1) {
        counter--
    }
    console.log(counter)
}


</script>
<p>
    
</p>

<div class="relative carousel w-full flex">
    {#each images as image }
        <div id={image.id} class="carousel-item relative w-full">
            <img src={urlForImage(image).url()} class="w-full object-cover" alt={image.alt}/>
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">

                <a on:click={handleClickMin} href={`#${counter}`} class={`transition-all delay-300 btn btn-circle ${counter !== 1 ? 'opacity-100' : 'opacity-0' }`}>❮</a> 

                <a on:click={handleClickSum} href={`#${counter}`} class={`transition-all delay-0 btn btn-circle ${counter !== images.length ? 'opacity-100' : 'opacity-0' }`}>❯</a>
            </div>
        </div> 
    {/each}
  </div>
