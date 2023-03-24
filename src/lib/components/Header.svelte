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

<div id="header" class={`bg-[url('${backgroundImage}')] bg-cover bg-center h-screen relative`}>
    <div class="absolute bottom-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent h-96 w-full">
    </div>
    <div class="container relative mx-auto flex flex-col justify-end h-screen pb-40 px-4">
        <h1 class="text-md font-bold uppercase tracking-widest lg:-mb-4 text-white">{preTitle}</h1>
        <div class="w-full">
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
