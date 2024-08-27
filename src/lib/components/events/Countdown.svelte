<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let date: Date;

  let targetDate = new Date(date).getTime();

  const timeLeft = tweened(
    {
      dias: 0,
      horas: 0,
      min: 0,
      seg: 0,
    },
    {
      duration: 1000,
      easing: cubicOut,
    }
  );

  let interval: NodeJS.Timeout;

  onMount(() => {
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      timeLeft.set({
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        min: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seg: Math.floor((difference % (1000 * 60)) / 1000),
      });
    } else {
      timeLeft.set({ dias: 0, horas: 0, min: 0, seg: 0 });
      clearInterval(interval);
    }
  }
</script>


    <div
    class="fixed backdrop-blur-lg z-20 w-full bottom-0 md:w-96 md:right-10 md:bottom-10 flex items-center justify-center"
    >
    <div class="bg-gradient-to-r from-red-400 to-primary h-1 w-full absolute top-0" />
    <div class="relative text-white text-center py-2">
      <span class="text-sm md:text-lg uppercase">Quedan para el evento ...</span>
      <div class="flex space-x-4 md:space-x-8">
        {#each Object.entries($timeLeft) as [unit, value]}
          <div class="flex flex-col items-center">
            <span
              class="text-4xl font-bold tabular-nums text-primary"
            >
              {Math.floor(value).toString().padStart(2, "0")}
            </span>
            <span class="text-sm md:text-lg uppercase">{unit}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
