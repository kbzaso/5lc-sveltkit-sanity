
<script lang="ts">
    import { urlForImage } from "$lib/config/sanity";
    import type { Staff } from "$lib/types";

    export let staff: Staff;

</script>

<a href={`staff/${staff.slug}`} data-sveltekit-preload-data>
    <div class="relative overflow-hidden w-full group border-gray-600 border hover:border-primary rounded-none transition-all h-fit md:h-96 bg-[url('https://res.cloudinary.com/dtj5xnlou/image/upload/c_scale,o_100,w_793,z_3/a_270/v1681216807/1000_F_293406669_YWBByHAkamkhveh3GAQAzWiUEwG8HNof.webp')]">
      <figure class="z-10">
        <img loading="lazy" class="object-cover object-top w-full group-hover:bg-primary" src={urlForImage(staff.staffImage).height(600).width(337).quality(100).url()} alt={staff.title}>
      </figure>

      <div class="bg-zinc-900/50 h-max grow backdrop-blur-xl absolute bottom-0 z-20 w-full pb-4">
        <p class="text-xs md:text-md uppercase tracking-wider md:tracking-widest text-gray-300 mt-4 px-4 pt-0">{staff.pseudonym ? staff.pseudonym : ''}</p>

        <h3 class="text-primary font-ibm text-2xl md:text-4xl px-4 pt-0">{staff.title}</h3>
      </div> 
    </div>
  </a>