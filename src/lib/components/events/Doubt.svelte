<script lang="ts">
  import {BASE_URL_ASSETS} from "$lib/const";

  export let title: string;
  export let background: string;
  export let tallyCode: string;
  export let btnText: string;
</script>

<div class="flex flex-col gap-8 container max-h-[600px] mx-auto">
    <div class="relative w-full overflow-hidden ">
      <img
        src={`${BASE_URL_ASSETS}${background}`}
        alt="Luchadora en el ring"
        class="w-full h-[400px] object-cover lg:object-center"
        width={1200}
        height={600}
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col items-center">
        <h3 class="text-3xl drop-shadow-md md:text-4xl font-ibm italic mb-2 text-center text-pretty max-w-xs">{title}</h3>
        <button data-tally-auto-close="5000" data-tally-open={tallyCode} data-tally-overlay="1" data-tally-emoji-text="🤔" data-tally-emoji-animation="wave"
          class="btn btn-outline  mt-4 w-full max-w-sm"
        >
        {btnText}
        </button>
      </div>
    </div>
  </div>