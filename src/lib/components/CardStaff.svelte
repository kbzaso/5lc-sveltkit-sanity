<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { Staff } from "$lib/types";
  import { onMount } from "svelte";

  export let staff: Staff;

  let current = "";
  const handleClick = (e: any) => {
    current = e.target.alt;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={handleClick}
  class="lg:hover:scale-105 origin-bottom lg:hover:grayscale-0 lg:hover:opacity-100  transition-all lg:grayscale lg:opacity-75 relative min-[320px]:h-[210px] min-[335px]:h-[225px] min-[345px]:h-[240px] min-[375px]:h-[260px] min-[400px]:h-[280px] min-[425px]:h-[290px] min-[440px]:h-[320px] min-[450px]:h-[320px] min-[448px]:h-[320px] min-[458px]:h-[320px] min-[480px]:h-[340px] min-[500px]:h-[355px] min-[520px]:h-[360px] min-[530px]:h-[375px] min-[540px]:h-[385px] min-[560px]:h-[400px] min-[575px]:h-[400px] min-[585px]:h-[420px] min-[610px]:h-[430px] min-[620px]:h-[450px] min-[635px]:h-[455px] min-[655px]:h-[480px] min-[685px]:h-[490px] md:h-[290px] lg:h-[300px] xl:h-[385px]  2xl:h-[480px] flex items-end"
>
  <div
    class:selected={current === staff.title}
    class="relative min-[320px]:h-[160px] min-[375px]:h-[200px] min-[400px]:h-[225px] lg:h-[230px] md:h-[200px] 2xl:h-[350px] w-full transition-all group border-gray-600 border lg:hover:border-primary active:border-primary active:scale-105 overflow-y-visible bg-[url('https://res.cloudinary.com/dtj5xnlou/image/upload/c_scale,o_100,w_793,z_3/a_270/v1681216807/1000_F_293406669_YWBByHAkamkhveh3GAQAzWiUEwG8HNof.webp')]"
  >
    <figure class="z-10 absolute bottom-1">
      <img
        width="500"
        height="785"
        loading="lazy"
        src={urlForImage(staff.staffImage)
          .height(785)
          .width(500)
          .quality(40)
          .url()}
        alt={staff.title}
      />
    </figure>

    <div
      class="bg-zinc-900/50 h-max grow backdrop-blur-xl absolute bottom-0 z-20 w-full"
    >
      <p
        class="text-xs md:text-md uppercase tracking-wider md:tracking-widest text-gray-300 mt-4 px-2 pt-0 truncate"
      >
        {staff?.pseudonym ? staff?.pseudonym : ""}
      </p>
      <h3
        class="text-primary font-ibm font-black text-2xl italic md:text-4xl px-2 pb-2 pt-0 truncate"
      >
        {staff.title}
      </h3>
    </div>
  </div>
</div>

<!-- sm:h-40 h-40  w-full md:mt-40 lg:mt-28 xl:mt-44  md:h-60 lg:h-52 -->
<style>
  .selected {
    border: 1px solid #facc15;
    background-image: none;
    background-color: #facc15;
  }
</style>
