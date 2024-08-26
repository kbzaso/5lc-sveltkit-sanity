<script>
  import { onMount } from "svelte";

  let loaderHeight = "100vh";
  let isVisible = true;

  onMount(() => {
    loaderHeight = `${document.documentElement.scrollHeight}px`;
    setTimeout(() => {
      isVisible = false;
    }, 1000); // Adjust the timeout to match the animation duration
  });

  function handleAnimationEnd() {
    isVisible = false;
  }
</script>

{#if isVisible}
  <div
    class="loader"
    style="height: {loaderHeight};"
    on:animationend={handleAnimationEnd}
  >
    <svg
      class="h-10 w-10"
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        d="M900 581v-56h-94a131 131 0 0 0-131 131v19h131a94 94 0 0 0 94-94zM394 525h-94v56a94 94 0 0 0 94 94h131v-19a131 131 0 0 0-131-131z"
        fill="#FACC15"
      /><path
        d="M585 720a19 19 0 0 1 30 0l51 68h309V450h-75a19 19 0 0 1-19-19v-32l-56-90v47a19 19 0 0 1-10 17L609 485c-6 3-12 3-18 0L385 373a19 19 0 0 1-10-17v-47l-56 90v32a19 19 0 0 1-19 19h-75v338h309zm353 30h-38v-37h38zm-300-94a169 169 0 0 1 168-169h113a19 19 0 0 1 19 19v75a131 131 0 0 1-132 131H656a19 19 0 0 1-18-18zm-57-131h38v38h-38zM300 750h-37v-37h37zm-37-169v-75a19 19 0 0 1 18-19h113a169 169 0 0 1 169 169v38a19 19 0 0 1-19 19H394a131 131 0 0 1-131-132z"
        fill="#FACC15"
      /><path
        d="m562 286-9 34 38-19c5-3 12-3 17 0l39 20-9-35c-2-7 0-13 5-18l33-33-43-11c-5-1-10-4-12-9l-21-42-21 42c-2 5-7 8-12 9l-43 11 33 33c5 5 7 11 5 18z"
        fill="#FACC15"
      /><path
        d="M281 394c0-4 1-7 3-10l94-150a19 19 0 0 1 34 10v101l188 102 187-102V244a19 19 0 0 1 35-10l94 150c2 3 3 6 3 10v19h54a375 375 0 0 0-746 0h54zm188-174a19 19 0 0 1 14-13l67-17 33-67a20 20 0 0 1 34 0l33 67 67 17a19 19 0 0 1 9 31l-49 49 16 65a19 19 0 0 1-27 21l-66-35-66 35a19 19 0 0 1-27-21l16-65-49-49a19 19 0 0 1-5-18zM900 908v-83h-99c37 23 70 51 99 83zM713 900H488a75 75 0 1 0 0 150h225a75 75 0 1 0 0-150zm37 94H450v-38h300zM399 825h-99v83c29-32 62-60 99-83z"
        fill="#FACC15"
      /><path
        d="M1013 1088H900v-38h75V825h-37v169a19 19 0 0 1-38 0c0-66-122-142-173-169h-71c-6 0-11-3-15-7l-41-55-41 55c-4 4-9 7-15 7h-71c-51 27-173 103-173 169a19 19 0 0 1-37 0V825h-38v225h113v38H188a19 19 0 0 0 0 37h825a19 19 0 0 0 0-37zm-300 0H488a113 113 0 0 1 0-225h225a113 113 0 0 1 0 225zm150 0h-38v-38h38z"
        fill="#FACC15"
      /></svg
    >
  </div>
{/if}

<style>
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: loader 1s linear 1s forwards;
  }

  @keyframes loader {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .loader svg {
    animation: scaling 0.3s ease-in-out infinite;
  }

  @keyframes scaling {
    0% {
      transform: scale(5);
    }
    50% {
      transform: scale(4);
    }
    100% {
      transform: scale(5);
    }
  }
</style>
