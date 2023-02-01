<script lang="ts">
    import './../../styles.css'
</script>

<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
        <div class="flex w-full justify-between items-center md:container px-4 mt-4 fixed left-[50%] -translate-x-[50%]">
            <img src="logo-white.svg" class="w-28" alt="Logo 5LC">
            <label for="my-drawer" class="btn btn-primary drawer-button">Menu</label>
        </div>
        <slot />
    </div> 
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-primary text-base-100 relative">
        <img src="logo.svg" alt="Logo de 5 luchas clandestino">
        <!-- Sidebar content here -->
        <li class="mt-10"><button class="hover:bg-base-100 hover:text-primary font-bold uppercase tracking-widest">Sidebar Item 1</button></li>
        <li><button class="hover:bg-base-100 hover:text-primary font-bold uppercase tracking-widest">Sidebar Item 1</button></li>
        <picture class="absolute bottom-0 left-0">
            <img src="bovedin.png" alt="Bovedin">
        </picture>
      </ul>
    </div>
</div>


