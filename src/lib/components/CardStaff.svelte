<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { Staff } from "$lib/types";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  export let staff: Staff;

</script>

<div class="relative min-[320px]:h-[210px] min-[375px]:h-[260px] min-[400px]:h-[280px] min-[425px]:h-[290px] min-[500px]:h-[380px] md:h-[270px] lg:h-[290px] xl:h-[385px]  2xl:h-[450px] flex items-end">
<div
  class="relative min-[320px]:h-[160px] min-[375px]:h-[200px] min-[400px]:h-[225px] lg:h-[230px] md:h-[200px] 2xl:h-[350px] w-full transition-all group border-gray-600 border lg:hover:border-primary active:border-primary overflow-y-visible bg-[url('https://res.cloudinary.com/dtj5xnlou/image/upload/c_scale,o_100,w_793,z_3/a_270/v1681216807/1000_F_293406669_YWBByHAkamkhveh3GAQAzWiUEwG8HNof.webp')]"
>
  <figure class="z-10 absolute bottom-1">
    <img
      loading="lazy"
      class=""
      src={urlForImage(staff.staffImage)
        .height(785)
        .width(500)
        .quality(80)
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
    {staff.pseudonym ? staff.pseudonym : ""}
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