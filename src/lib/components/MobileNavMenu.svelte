<script lang="ts">
  // NAVBAR MOBILE
  import { fade, fly, slide } from "svelte/transition";
  import { spring } from "svelte/motion";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let isOpen = false;
  let startY: number;
  let currentY: number;
  const sheetHeight = spring(100, { stiffness: 0.1, damping: 0.7 });

  let navItems: {
    name: string;
    link: string;
    icon?: string;
    subItems?: { name: string; link: string; icon?: string }[];
    isOpen?: boolean;
  }[] = [
    {
      name: "Home",
      link: "/",
      icon: `
        <svg class="h-10 w-10" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg"><path d="M1106 375h-37c-8 0-15 5-17 11L638 150v-19c0-10-9-19-19-19h-38c-10 0-18 9-18 19v19L149 386c-3-6-10-11-18-11H94c-11 0-19 8-19 19v243l75 43v-72l413 236v-43L150 565v-43l7-4 406 232v-56c0-11 8-19 18-19h38c10 0 19 8 19 19v56l405-232 7 4v43L638 801v43l412-236v72l75-43V394c0-11-8-19-19-19zm-56 54v42l-7 4-405-231v-51l412 236zM563 244 157 475l-7-4v-42l413-236zM258 533l-63-36 368-210v72zm684 0L638 359v-72l367 210z" fill="#fff"/><path d="M600 975c-6 0-13-2-19-5L75 681v125l525 300 525-300V681L619 970c-6 4-13 5-19 5z" fill="#fff"/><path d="M188 673v7c0 7-2 13-5 19l379 217v-29zM638 887v29l379-217c-3-6-5-12-5-19v-7z" fill="#fff"/></svg>
      `,
    },
    {
      name: "Equipo",
      link: "/equipo",
      icon: `
        <svg class="h-10 w-10" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg"><path d="m546 592 33-67-127-235-2-9V75h-75v206c0 136-60 260-131 279v209h37V600c0-7 4-13 9-16 85-51 104-173 104-174l37 5c-1 6-20 133-112 195v159h168a19 19 0 0 1 19 19v150a19 19 0 0 1-19 18H319v60l172 34-7 37-188-37a19 19 0 0 1-15-19v-75h-37v116l271 51 63-110-31-46c-2-3-3-7-3-11V600c0-3 0-6 2-8z" fill="#fff"/><path d="M713 277V75h-38v75H525V75h-37v202l112 208zM469 806H244v113h225zm-131 75h-38v-37h38zm75 0h-38v-37h38z" fill="#fff"/><path d="M563 75h75v38h-75zM825 281V75h-75v206l-2 9-167 314v347l104 172 271-51V560c-71-19-131-143-131-279zM675 825v-45l-27-13a19 19 0 0 1-11-17v-37a124 124 0 0 1 132-132 124 124 0 0 1 131 132v37a19 19 0 0 1-10 17l-28 13v45a19 19 0 0 1-18 19H694a19 19 0 0 1-19-19zm244 206a19 19 0 0 1-15 19l-94 18-7-36 78-16v-97h38z" fill="#fff"/><path d="M863 713c0-59-36-94-94-94s-94 35-94 94v25l27 14a19 19 0 0 1 11 17v37h37v-56h38v56h37v-37a19 19 0 0 1 10-17l28-14zm-113 0h-37v-38h37zm75 0h-37v-38h37z" fill="#fff"/></svg>
      `,
      subItems: [
        {
          name: "Luchadores",
          link: "/equipo/luchadores",
          icon: `
        <svg class="h-10 w-10" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg"><path d="M900 581v-56h-94a131 131 0 0 0-131 131v19h131a94 94 0 0 0 94-94zM394 525h-94v56a94 94 0 0 0 94 94h131v-19a131 131 0 0 0-131-131z" fill="#FACC15"/><path d="M585 720a19 19 0 0 1 30 0l51 68h309V450h-75a19 19 0 0 1-19-19v-32l-56-90v47a19 19 0 0 1-10 17L609 485c-6 3-12 3-18 0L385 373a19 19 0 0 1-10-17v-47l-56 90v32a19 19 0 0 1-19 19h-75v338h309zm353 30h-38v-37h38zm-300-94a169 169 0 0 1 168-169h113a19 19 0 0 1 19 19v75a131 131 0 0 1-132 131H656a19 19 0 0 1-18-18zm-57-131h38v38h-38zM300 750h-37v-37h37zm-37-169v-75a19 19 0 0 1 18-19h113a169 169 0 0 1 169 169v38a19 19 0 0 1-19 19H394a131 131 0 0 1-131-132z" fill="#FACC15"/><path d="m562 286-9 34 38-19c5-3 12-3 17 0l39 20-9-35c-2-7 0-13 5-18l33-33-43-11c-5-1-10-4-12-9l-21-42-21 42c-2 5-7 8-12 9l-43 11 33 33c5 5 7 11 5 18z" fill="#FACC15"/><path d="M281 394c0-4 1-7 3-10l94-150a19 19 0 0 1 34 10v101l188 102 187-102V244a19 19 0 0 1 35-10l94 150c2 3 3 6 3 10v19h54a375 375 0 0 0-746 0h54zm188-174a19 19 0 0 1 14-13l67-17 33-67a20 20 0 0 1 34 0l33 67 67 17a19 19 0 0 1 9 31l-49 49 16 65a19 19 0 0 1-27 21l-66-35-66 35a19 19 0 0 1-27-21l16-65-49-49a19 19 0 0 1-5-18zM900 908v-83h-99c37 23 70 51 99 83zM713 900H488a75 75 0 1 0 0 150h225a75 75 0 1 0 0-150zm37 94H450v-38h300zM399 825h-99v83c29-32 62-60 99-83z" fill="#FACC15"/><path d="M1013 1088H900v-38h75V825h-37v169a19 19 0 0 1-38 0c0-66-122-142-173-169h-71c-6 0-11-3-15-7l-41-55-41 55c-4 4-9 7-15 7h-71c-51 27-173 103-173 169a19 19 0 0 1-37 0V825h-38v225h113v38H188a19 19 0 0 0 0 37h825a19 19 0 0 0 0-37zm-300 0H488a113 113 0 0 1 0-225h225a113 113 0 0 1 0 225zm150 0h-38v-38h38z" fill="#FACC15"/></svg>
      `,
        },
        {
          name: "Arbitros",
          link: "/equipo/arbitros",
          icon: `
        <svg class="h-10 w-10" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg"><path d="m1123 460-16-25-158-248-3-3-184-89c-1-1-3-2-6-1a558 558 0 0 1-318 1l-183 89-4 3L77 460c-7 12-4 26 6 34l167 119c4 4 10 5 15 5 7 0 15-3 20-9l19-25v497c0 14 12 25 26 25h541c14 0 25-11 25-25V584l19 24a25 25 0 0 0 35 5l166-119c11-8 14-22 7-34zM115 440l169-176a527 527 0 0 1 14 53L153 468zm189 53-47 49-38-28 85-89zm115 545h-42V143l42-21zm117 0h-42V226c12 10 26 17 42 23zm116 0h-42V259c14 0 29-3 42-7zm-52-794c-69 0-144-41-150-131l19 4 15 4 25 5 14 2 29 3 9 1c26 2 52 2 78 0l9-1 29-3 14-2 25-5 15-4 19-4c-6 90-81 131-150 131zm169 794h-42V208c21-23 36-54 39-94l3 2zm110-653v653h-35V153l86 42c-33 58-51 123-51 190zm62 158-45-47v-68l84 88zm104-74L902 320c3-18 8-36 14-54l168 175z" fill="#facc14"/></svg>
      `,
        },
        {
          name: "Presentadores",
          link: "/equipo/presentadores",
          icon: `
        <svg class="h-10 w-10" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg"><path d="m81 956 163 163 64-55-172-172zM1090 611a37 37 0 0 0 0-53L642 110a37 37 0 0 0-53 0 37 37 0 0 0 0 53l448 448c14 14 39 14 53 0zM336 1039l408-355-228-228-355 408zm68-336 85-85c25-25 68-25 93 0a65 65 0 0 1 0 93l-85 85a65 65 0 0 1-93 0 65 65 0 0 1 0-93zM1039 162a297 297 0 0 0-347-55l401 401c59-114 38-254-54-346zM533 420l247 247c75 12 151-5 213-47L580 207c-42 62-59 138-47 213z" fill="#facc14"/><path d="m470 769 86-85a28 28 0 0 0 0-40c-6-5-13-8-20-8s-15 3-20 8l-85 86a28 28 0 0 0 0 39c10 11 29 11 39 0z" fill="#facc14"/></svg>
      `,
        },
      ],
    },
    {
      name: "Próximos Eventos",
      link: "/#events",
      icon: `
        <svg class="h-10 w-10" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg"><path d="M161 813h115v16H161zM161 721h115v16H161zM396 730h385v45H396zM161 906h115v16H161zM785 588a42 42 0 1 1-84 0 42 42 0 0 1 84 0M689 397a38 38 0 1 0 1-76 38 38 0 0 0-1 76zM161 576h395v26H161zM1090 442l-43-231a35 35 0 0 0-41-28l-196 36 45 223zm-56-64a12 12 0 0 1-9 13l-122 20h-2a12 12 0 0 1-2-23l122-20c6-1 12 3 13 10zm-150-80 122-21c6-1 12 3 13 9a12 12 0 0 1-9 14l-123 21h-2a12 12 0 1 1-1-23zM155 437l1 5h128l236-47-4-23z" fill="#fff"/><path d="M86 442h47l-2-12c-1-6 3-12 9-13l384-69a12 12 0 0 1 13 9l7 46c1 6-3 11-9 12l-131 27h427l-44-219L78 355c-10 2-19 8-25 16-6 9-8 20-6 30l11 48c8-5 18-7 27-7zm603-144a61 61 0 1 1 1 122 61 61 0 0 1-1-122zM285 465H86a36 36 0 0 0-37 36v481a36 36 0 0 0 37 36h793V465zm15 468a12 12 0 0 1-12 12H150c-6 0-12-5-12-12v-39c0-6 6-11 12-11h138a12 12 0 0 1 12 11zm0-92a12 12 0 0 1-12 12H150c-6 0-12-6-12-12v-39c0-7 6-12 12-12h138a12 12 0 0 1 12 12zm0-92a12 12 0 0 1-12 11H150c-6 0-12-5-12-11v-40c0-6 6-11 12-11h138a12 12 0 0 1 12 11zm493 198H388a12 12 0 1 1 0-23h405a12 12 0 0 1 0 23zm0-75H388a12 12 0 1 1 0-23h405a12 12 0 1 1 0 23zm11-86c0 3-1 6-3 8s-5 4-8 4H384c-6 0-11-5-11-12v-67c0-7 5-12 11-12h409a12 12 0 0 1 11 12zm-61-263a65 65 0 1 1 0 130 65 65 0 0 1 0-130zm-164 41v50a12 12 0 0 1-11 11H150c-6 0-12-5-12-11v-50c0-6 6-11 12-11h418a12 12 0 0 1 11 11zM1118 465H902v553h216a36 36 0 0 0 36-36V501a36 36 0 0 0-36-36zM989 941a12 12 0 1 1-23 0v-80a12 12 0 0 1 23 0zm51 0a12 12 0 1 1-23 0v-80a12 12 0 1 1 23 0zm52 0a12 12 0 1 1-23 0v-80a12 12 0 0 1 23 0zm3-177H962a12 12 0 1 1 0-23h133a12 12 0 0 1 0 23zm0-89H962a12 12 0 0 1 0-23h133a12 12 0 0 1 0 23zm0-89H962a12 12 0 0 1 0-23h133a12 12 0 0 1 0 23z" fill="#fff"/></svg>
      `,
    },
    {
      name: "Eventos Pasados",
      link: "/eventos",
      icon: `
        <svg class="h-10 w-10" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg"><path d="M1083 1140H112a15 15 0 0 1 0-30h971a15 15 0 0 1 0 30zM508 613a88 88 0 1 1-175 0 88 88 0 0 1 175 0M287 404a88 88 0 1 1-175 0 88 88 0 0 1 175 0" fill="#fff"/><path d="M503 325c-16-4-32-5-48-3l-63 8-113-149a30 30 0 0 0-42 3 30 30 0 0 0 2 42l90 114c-17 9-30 26-33 46l-4 35c1 18 1 22 11 35L188 610c-7 9-9 22-5 33 14 32 51 33 68 11l116-157c97-20 148-57 148-57V328zM1050 474 731 359l104-202 168-12c22 2 42-14 45-36s-13-42-35-44c0 0-210 14-216 16-11 4-21 11-26 23L615 332l2 106 411 114c22 6 44-7 50-28 5-22-7-44-28-50zM717 676c5 4 69 27 69 27l69-152-68-26zM1090 806h-1c-2-6-5-12-10-17L867 561l-67 147 112 64-23 264c-2 22 15 42 37 43 22 2 41-14 43-36l18-220 24 16 1 196c-2 22 14 41 36 43s42-14 44-36c0 0 2-222-2-236z" fill="#fff"/><path d="m745 508-85-35c-15-7-32-9-48-8h-6l-2-147c0-22-18-40-40-40s-40 19-40 41l1 153a46 46 0 0 0-32 60l27 76c4 14 15 24 28 29 39 14 100 18 129 19z" fill="#fff"/></svg>
      `,
    },
  ];

  function toggleSubItems(index: number) {
    navItems = navItems.map((item, i) => {
      if (i === index && item.subItems) {
        item.isOpen = !item.isOpen;
      }
      return item;
    });
  }

  function handleTouchStart(event: TouchEvent) {
    startY = event.touches[0].clientY;
    currentY = startY;
  }

  function handleTouchMove(event: TouchEvent) {
    currentY = event.touches[0].clientY;
    const deltaY = currentY - startY;
    if (deltaY > 0) {
      event.preventDefault();
      const newHeight = Math.max(0, 100 - (deltaY / window.innerHeight) * 100);
      sheetHeight.set(newHeight);
    }
  }

  function handleTouchEnd() {
    const deltaY = currentY - startY;
    if (deltaY > window.innerHeight * 0.2) {
      closeSheet();
    } else {
      sheetHeight.set(100, { hard: false });
    }
  }

  export function openSheet() {
    isOpen = true;
    sheetHeight.set(100, { hard: true });
    document.body.style.overflow = "hidden";
  }

  function closeSheet() {
    sheetHeight.set(0, { hard: false }).then(() => {
      isOpen = false;
      document.body.style.overflow = "";
    });
  }

  async function handleNavigation(href: string) {
    if (isOpen) {
      await closeSheet();
    }
    goto(href);
  }

  onMount(() => {
    sheetHeight.set(100);
    return () => {
      document.body.style.overflow = "";
    };
  });
</script>

{#if isOpen}
  <nav
    class="fixed inset-x-0 bottom-0 z-50 bg-black overflow-hidden bg-grit bg-[length:500px_500px] bg-repeat"
    style="height: {$sheetHeight}dvh;"
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
    transition:fly={{ y: 200, duration: 300 }}
  >
    <div class="cursor-grab active:cursor-grabbing">
      <div class="grid p-2">
        <svg
          class="h-6 w-6 text-white justify-self-center"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16"
          />
        </svg>
        <button
          on:click={closeSheet}
          class="p-2 absolute right-2 text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-label="Close menu"
        >
          <svg
            class="h-10 w-10'"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex flex-col h-full overflow-y-auto">
      <div class="flex-grow">
        <div class="flex flex-col space-y-2 p-4 pl-4">
          <ul>
            {#each navItems as item, index}
              <li class="my-6">
                <a
                  class="font-ibm italic text-primary text-4xl mask flex gap-2 items-center"
                  href={item.link}
                  on:click|preventDefault={() => {
                    if (item.subItems) {
                      toggleSubItems(index);
                    } else {
                      handleNavigation(item.link);
                    }
                  }}
                >
                  {@html item.icon}
                  {item.name}
                </a>
                {#if item.subItems}
                  <ul class="sub-items" class:item-is-open={item.isOpen}>
                    {#each item.subItems as subItem}
                      <li class="my-6 flex gap-2 items-center">
                        {@html subItem.icon}
                        <a
                          class="font-ibm italic text-white text-3xl mask"
                          href={subItem.link}
                          on:click|preventDefault={() =>
                            handleNavigation(subItem.link)}
                        >
                          {subItem.name}
                        </a>
                      </li>
                    {/each}
                  </ul>
                {/if}
              </li>
            {/each}
            <li class=" mask flex gap-2 items-center">
              <button class="flex gap-2 items-center"
              on:click={() => closeSheet()}
                data-tally-open="31AeNQ"
                data-tally-emoji-text="👋"
                data-tally-emoji-animation="wave">
                <svg class="h-10 w-10" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg"><path d="M466 143c5 20-25 28-31 8l-18-68c-5-20 25-28 30-8zm213 9c-6 20-36 12-31-8l18-69c6-20 36-11 31 8zm180 113c-15 15-37-7-23-22l50-50c15-14 37 8 23 22zM493 370l41-51-40-30c-34-26-74 25-39 52zm-61 75-35-27c-33-24 1-77 39-52l37 28zm-61 75 41-50-34-27c-35-26-74 27-40 53l33 24zm336 223L563 925c-13 15-27 25-42 32-41 19-56 5-66 18l-123 148L83 927l148-184c3-3 4-8 4-12-14-83 11-167 69-227 9 15 32 29 47 41l-28 35c-13 16 11 36 24 20l101-124c41-54 94-114 137-169 18-24 46-13 56 5 22 35-43 60-16 80 16 13 27-10 39-25 17-24 45-14 57 4 21 36-43 60-17 80 16 13 28-10 39-25 13-17 32-17 47-6 31 24 5 50-9 68-13 17 12 36 25 19 14-19 25-40 50-33 22 7 40 32 22 55l-41 52-101-75-9-3H610c-83-10-95 118-11 125l87 21c0 33 7 65 22 94zm410 156L946 766c-7-5-79-122-85-128L721 535l-114-1c-33-3-59 49-2 63l101 25c8 2 13 9 12 17-5 63 25 124 79 158 17 11 0 37-17 26-22-13-40-31-55-51L596 933c49 47 119 91 184 91 4 0 7 1 10 4l139 108zM277 242c15 15-7 37-22 23l-50-50c-15-15 8-37 22-23z" fill="#fff" fill-rule="evenodd"/></svg>
                <span class="font-ibm italic text-primary text-4xl">Contacto</span>
                </button
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
{/if}

<style>
  .sub-items {
    overflow: hidden;
    padding-left: 1rem;
    max-height: 0;
    transition: max-height 0.3s ease-out;
  }
  .sub-items.item-is-open {
    max-height: 500px;
  }
</style>
