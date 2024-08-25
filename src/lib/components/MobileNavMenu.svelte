<script lang="ts">
  // NAVBAR MOBILE
  import { fade, fly, slide } from "svelte/transition";
  import { spring } from "svelte/motion";
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';

  let isOpen = false;
  let startY: number;
  let currentY: number;
  const sheetHeight = spring(100, { stiffness: 0.1, damping: 0.7 });

  let navItems: { name: string; link: string; subItems?: { name: string; link: string; icon?: string }[]; isOpen?: boolean; }[] = [
    { name: "Home", link: "/" },
    {
      name: "Equipo",
      link: "/equipo",
      subItems: [
        { name: "Luchadores", link: "/equipo/luchadores" },
        { name: "Arbitros", link: "/equipo/arbitros" },
        { name: "Presentadores", link: "/equipo/presentadores" },
      ],
    },
    { name: "Eventos Pasados", link: "/results" },
    {
      name: "Contact",
      link: "/contact",
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
    class="fixed inset-x-0 bottom-0 z-50 bg-black overflow-hidden"
    style="height: {$sheetHeight}dvh;"
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
    transition:fly={{ y: 200, duration: 300 }}
  >
    <div class="cursor-grab active:cursor-grabbing">
      <div class="grid p-2">
        <svg
          class="h-6 w-6 text-gray-400 justify-self-center"
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
          class="p-2 absolute right-2 text-primary hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-label="Close menu"
        >
          <svg
            class="h-6 w-6"
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
        <div class="flex flex-col space-y-2 p-4 pl-10">
            <ul>
                {#each navItems as item, index}
                  <li class="my-4">
                    <a class="font-ibm italic text-primary text-4xl mask" href={item.link} on:click|preventDefault={() => {
                      if (item.subItems) {
                        toggleSubItems(index);
                      } else {
                        handleNavigation(item.link)
                      }
                    }}>
                      {item.name}
                    </a>
                    {#if item.subItems}
                      <ul class="sub-items {item.isOpen ? 'open' : ''}">
                        {#each item.subItems as subItem}
                          <li class="my-4">
                            <a class="font-ibm italic text-white text-3xl mask" href={subItem.link} on:click|preventDefault={() => handleNavigation(subItem.link)}>
                              {subItem.name}
                            </a>
                          </li>
                        {/each}
                      </ul>
                    {/if}
                  </li>
                {/each}
              </ul>
        </div>
      </div>
    </div>
  </nav>
{/if}

<style>
  .sub-items {
    display: none;
    padding-left: 1rem;
  }
  .sub-items.open {
    display: block;
  }
</style>