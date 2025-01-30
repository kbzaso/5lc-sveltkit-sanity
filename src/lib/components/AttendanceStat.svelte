<script lang="ts">
  export let assistance: number;
  export let event: string;
  export let venue: string;

  console.log(venue)
</script>

<div
  class="bg-primary w-full mt-10 flex justify-start"
>
  <div class="w-fit flex items-center p-6 gap-6">
    <div class="stat-value text-white mask bg-black p-4">{assistance}</div>
    <p class="text-black text-pretty">Personas se reunieron en {venue} para compartir en {event}</p>
  </div>
</div>
