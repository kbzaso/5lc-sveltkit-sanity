<script lang="ts">
  import { PortableText } from "@portabletext/svelte";
  import { page } from "$app/stores";
</script>

<main class="container mx-auto mt-24 px-4 flex justify-center">
  <p
    class="pt-4 prose hover:prose-a:after:text-primary hover:prose-a:decoration-primary prose-a:decoration-blue-500 prose-a:decoration-2 prose-a:underline-offset-2 prose-a:after:content-['_↗'] max-w-prose prose-h3:text-sm prose-h3:uppercase prose-h3:text-primary prose-h3:tracking-widest text-white prose-h1:text-primary prose-h1:text-3xl prose-h1:font-bold prose-h1:sm:text-4xl prose-li:text-gray-300 prose-p:text-gray-300 prose-em:underline prose-em:decoration-2 prose-em:decoration-primary prose-em:underline-offset-2 prose-em:text-gray-300 prose-a:after:text-blue-500 prose-a:after:font-black prose-p:text-lg prose-li:text-lg"
  >
    <PortableText value={$page.data.settings.behavior} />
  </p>
</main>
