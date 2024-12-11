<script lang="ts">
  import { PortableText } from "@portabletext/svelte";
  import { onMount } from "svelte";

  export let disclaimers: any;
  export let disclaimerEvent: any;

  let inputs: boolean[] = [];

  onMount(() => {
    disclaimers = disclaimers.map((disclaimer: any) => {
      return {
        ...disclaimer,
        modalId: Math.random().toString(36).substr(2, 9),
      };
    });
    inputs = new Array(disclaimers.length).fill(false);
  });

  $: {
    // Set the store value to true if all inputs are true, false otherwise
    $disclaimerEvent = inputs.every((input) => input);
  }
</script>

{#each disclaimers as disclaimer, i}
  <div class="form-control">
    <label
      class="cursor-pointer label flex gap-4 justify-center"
      for={`input_${disclaimer.modalId}`}
    >
      <input
      bind:checked={inputs[i]}
        type="checkbox"
        id={`input_${disclaimer.modalId}`}
        class="checkbox checkbox-primary "
      />
      <p class="label-text text-primary font-bold text-center">
        Acepto el <span
          class="anchor"
          onclick={`my_modal_${disclaimer.modalId}.showModal()`}
          >{disclaimer.title}</span
        >
      </p>
    </label>
  </div>

  <dialog
    id={`my_modal_${disclaimer.modalId}`}
    class="modal modal-bottom sm:modal-middle bg-black/75"
  >
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-primary absolute right-2 top-2"
          >✕</button
        >
      </form>
      <p
        class="pt-4 prose hover:prose-a:after:text-primary hover:prose-a:decoration-primary prose-a:decoration-blue-500 prose-a:decoration-2 prose-a:underline-offset-2 prose-a:after:content-['_↗'] max-w-prose prose-h3:text-sm prose-h3:uppercase prose-h3:text-primary prose-h3:tracking-widest text-white prose-h1:text-primary prose-h1:text-3xl prose-h1:font-bold prose-h1:sm:text-4xl prose-li:text-gray-300 prose-p:text-gray-300 prose-em:underline prose-em:decoration-2 prose-em:decoration-primary prose-em:underline-offset-2 prose-em:text-gray-300 prose-a:after:text-blue-500 prose-a:after:font-black "
      >
        <PortableText value={disclaimer.disclaimer} />
      </p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
{/each}
