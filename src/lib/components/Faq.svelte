<script lang="ts">
  import { onMount } from "svelte";

  export let questions: { question: string, answer: string }[] = [];

  let isFirst = true;

  onMount(() => {
    const radios = document.querySelectorAll<HTMLInputElement>(
      'input[type="radio"][name="my-accordion-4"]'
    );
    if (radios.length > 0) {
      radios[0].checked = true;
    }
  });

  let indexSelected: number = 0;

  function handleChange(index: number) {
    indexSelected = index;
  }
</script>

<section class="container mx-auto space-y-2 max-w-2xl mb-20 mt-40">
  <h3
    class="text-4xl font-bold text-white mask font-ibm italic mb-4 text-center"
  >
    Preguntas Frecuentes
  </h3>
  {#each questions as { question, answer }, index}
    <div class="collapse rounded-none collapse-arrow">
      <input
        type="radio"
        class="peer"
        name="my-accordion-4"
        checked={index === 0 ? isFirst : false}
        on:change={() => (isFirst = false)}
      />
      <button
        on:click={() => {
          handleChange(index);
        }}
        class="collapse-title bg-transparent text-white peer-checked:bg-primary peer-checked:text-black text-left mask font-ibm italic text-lg"
      >
        {question}
      </button>
      <div
        class="collapse-content text-primary-content peer-checked:border peer-checked:border-primary peer-checked:bg-black/50 peer-checked:text-white pt-2"
      >
        <p>{answer}</p>
      </div>
    </div>
  {/each}
</section>
