<script lang="ts">
  export let info;
</script>
<section
  class="flex w-full md:w-64 items-center justify-center relative mt-20 md:mt-0 lg:min-w-64"
>
  <div class="bg-primary p-0.5 z-10 md:h-96">
    <div class="flex h-full w-full items-center justify-center">
        <div class="p-4">
          <span class="card-title font-ibm italic text-black"
            >{info.title}</span
          >
          <p class="text-pretty text-black">
            {info.description}
          </p>
          <div class="card-actions justify-end">
            <button
              class="btn btn-black w-full mt-4 hover:scale-105"
              data-tally-open="meAW1q"
              data-tally-overlay="1"
              data-tally-emoji-text="✉️"
              data-tally-emoji-animation="wave">{info.btn}</button
            >
          </div>
        </div>
    </div>
  </div>
</section>

