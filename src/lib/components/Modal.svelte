<script lang="ts">
  let open = true;

  function toggle() {
    open = !open;
  }
</script>

<button
  class={`transition-all ease-in-out z-50 bg-primary fixed bottom-20 right-4 ml-auto left-4 overflow-hidden shadow-xl border border-primary ${
    open ? "h-fit w-auto md:w-72" : "h-36 w-32"
  }`}
>
  <button
    class={`absolute transition-all ease-in-out delay-300 h-11 w-11 grid place-items-center right-2 top-2 bg-primary text-black ${
      !open ? "rotate-180" : "rotate-0"
    }`}
    on:click={toggle}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      ><path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M19 6L6 19m0 0V6.52M6 19h12.48"
      /></svg
    >
  </button>

  {#if open}
    <button
      data-tally-open="mBdpbN"
      data-tally-overlay="1"
      data-tally-emoji-text="👋"
      data-tally-emoji-animation="wave"
      data-tally-auto-close="3000000"
      data-tally-hide-title="1"
      class="absolute z-10 bottom-2 left-2 right-2 btn btn-primary w-auto"
    >
      Venta de Poleron Cincogramaton
    </button>
  {/if}
  <img
    src="https://res.cloudinary.com/dtj5xnlou/image/upload/v1691268474/5LC/hoodie.jpg"
    alt="Hoddie oficial de 5LC. lucha libre chilena"
    class="object-cover w-full h-full"
  />
</button>
