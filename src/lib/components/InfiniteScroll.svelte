<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class=" bg-black/50 text-primary py-2 w-full overflow-hidden absolute top-20 z-20 backdrop-blur-sm">
  <div class="horizontal-scrolling-items">
    <div class="horizontal-scrolling-items__item uppercase font-ibm font-semibold"> 
      {$page.data.welcome.horizontalLine} {$page.data.welcome.horizontalLine} {$page.data.welcome.horizontalLine}
    </div>

    <div class="horizontal-scrolling-items__item uppercase font-ibm font-semibold">
      {$page.data.welcome.horizontalLine} {$page.data.welcome.horizontalLine} {$page.data.welcome.horizontalLine}
    </div>
  </div>
</div>

<style>
  @keyframes infiniteScroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
  .horizontal-scrolling-items {
    display: flex;
    width: fit-content;
    animation-name: infiniteScroll;
    animation-duration: 80s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  .horizontal-scrolling-items__item {
    white-space: nowrap;
  }
</style>
