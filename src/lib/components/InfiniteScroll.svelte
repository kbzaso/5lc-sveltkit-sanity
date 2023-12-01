<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="container mt-20 bg-black text-primary py-2">
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
  .container {
    width: 100%;
    overflow-x: hidden;
    
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
