<script lang="ts">
  export let info;
  export let width = "w-full";
</script>

<div class={`bg-primary p-0.5 z-10 h-full mx-auto ${width}`}>
  <div class="flex h-full items-center justify-center">
    <div class="p-4">
      <span class="card-title font-ibm italic text-black">{info.title}</span>
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
