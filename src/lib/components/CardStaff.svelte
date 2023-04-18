
<script lang="ts">
    import { urlForImage } from "$lib/config/sanity";
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import AiOutlineInstagram from "svelte-icons-pack/ai/AiOutlineInstagram";
    import AiOutlineFacebook from "svelte-icons-pack/ai/AiOutlineFacebook";
    import AiOutlineYoutube from "svelte-icons-pack/ai/AiOutlineYoutube";
    import FiTwitter from "svelte-icons-pack/fi/FiTwitter";
    import SiTiktok from "svelte-icons-pack/si/SiTiktok";
    import BiLink from "svelte-icons-pack/bi/BiLink";
    import type { Staff } from "$lib/types";

    export let staff: Staff;

</script>

<a href={`staff/${staff.slug}`}>
    <div class="card w-full group border-gray-500 border hover:border-primary rounded-none transition-all h-full">
      <figure class="bg-[url('https://res.cloudinary.com/dtj5xnlou/image/upload/c_scale,o_100,w_793,z_3/a_270/v1681216807/1000_F_293406669_YWBByHAkamkhveh3GAQAzWiUEwG8HNof.webp')]">
        <img loading="lazy" class="object-cover object-top h-40 md:h-96 w-full group-hover:bg-primary" src={urlForImage(staff.staffImage).height(600).width(600).quality(100).url()} alt={staff.title}>
      </figure>
      <div class="bg-zinc-900/50 h-max grow">
        <p class="text-sm md:text-md uppercase tracking-widest text-gray-300 mt-4 px-4 pt-0">{staff.pseudonym ? staff.pseudonym : ''}</p>

        <h3 class="text-primary font-bold text-2xl px-4 pt-0">{staff.title}</h3>
        <ul class="flex space-x-2 mt-4 px-4 pt-0 pb-4">
          {#if staff.social.instagram}
          <li><a target="_blank" href={staff.social.instagram}><Icon src={AiOutlineInstagram} className="fill-white hover:fill-primary" size="26"/></a></li>
          {/if}
          {#if staff.social.facebook}
          <li><a target="_blank" href={staff.social.facebook}><Icon src={AiOutlineFacebook} className="fill-white hover:fill-primary" size="26"/></a></li>
          {/if}
          {#if staff.social.youtube}
          <li><a target="_blank" href={staff.social.youtube}><Icon src={AiOutlineYoutube} className="fill-white hover:fill-primary" size="26"/></a></li>
          {/if}
          {#if staff.social.twitter}
          <li><a target="_blank" href={staff.social.twitter}><Icon src={FiTwitter} className="fill-white hover:fill-primary" size="24"/></a></li>
          {/if}
          {#if staff.social.tiktok}
          <li><a target="_blank" href={staff.social.tiktok}><Icon src={SiTiktok} className="fill-white hover:fill-primary" size="22"/></a></li>
          {/if}
          {#if staff.social.other}
          <li><a target="_blank" href={staff.social.other}><Icon src={BiLink} className="fill-white hover:fill-primary" size="26"/></a></li>
          {/if}
        </ul> 
      </div> 
    </div>
  </a>