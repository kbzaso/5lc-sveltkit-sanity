<script>
    import {PortableText} from '@portabletext/svelte'

    export let preTitle = '';
    export let backgroundImage = '';
    export let description = '';
    export let imageTitle = '';
    export let textTitle = '';


    import { onMount } from 'svelte';

    onMount(() => {
        let header = document.querySelector('#header');
        header.style.backgroundImage = `url(${backgroundImage})`;
    });

</script>

<div id="header" class={`bg-[url('${backgroundImage}')] bg-cover bg-center h-screen`}>
    <div class="absolute bottom-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent h-96 w-full">
    </div>
    <div class="container absolute lg:bottom-32 mb-10 bottom-0 space-y-2 left-[50%] px-4 -translate-x-[50%]">
        <h1 class="text-md font-bold uppercase tracking-widest lg:-mb-4 text-white">{preTitle}</h1>
        <div class="w-full">
            <p></p>
            {#if !imageTitle}
                <h1>{textTitle}</h1>
            {:else}
                <img src={imageTitle} class="" alt="Siempre buena onda">
            {/if}
        </div>
        
        <p class="text-sm md:text-lg lg:max-w-4xl">
            <PortableText
            value={description}
            />
        </p>
    </div>
</div>
