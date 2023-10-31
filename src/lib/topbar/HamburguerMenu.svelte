<script>
   //import Configuration from "../../../config";

   export let assetsUrl;
  export let onCategoryChange;
  export let active_view;
  let activeContent=false;

  const onActiveContent = () =>{
    activeContent=!activeContent;
    console.log("xxx", activeContent) ;
  }
  const onPageChange = (page) => {
    activeContent = false;
    onCategoryChange(page)
  }

</script>

<nav class="u-hamburger-menu">
  <button class="button-lineal {activeContent?'u-active':''}" on:click={() => onActiveContent()}> ☰ </button>
  {#if activeContent}
  <div class="u-menu-content">
    <button class="u-menubar-button {active_view=='home'?'u-category-select':''}" on:click={  ()=>onPageChange("home") }>
      <img class="u-menubar-icon" src="{assetsUrl}/golden/Home.svg" alt=""/>
        Inicio
    </button>
    <button class="u-menubar-button {active_view=='sportbook'?'u-category-select':''}" on:click={ ()=> onPageChange("sportbook") }>
      <img class="u-menubar-icon" src="{assetsUrl}/golden/Sportbook.svg" alt="" />
      Deportes
    </button>
    <button class="u-menubar-button {active_view=='horses'?'u-category-select':''}" on:click={ ()=> onPageChange("horses") }>
      <img class="u-menubar-icon" src="{assetsUrl}/golden/Hipica.svg" alt="" />
      Hípica
    </button>
    <button class="u-menubar-button {active_view=='slot'?'u-category-select':''}" on:click={ ()=> onPageChange("slot") }>
      <img class="u-menubar-icon" src="{assetsUrl}/golden/Slots.svg" alt="" />
      Casino
    </button>
    <button class="u-menubar-button {active_view=='slotlive'?'u-category-select':''}" on:click={ ()=> onPageChange("slotlive") }>
      <img class="u-menubar-icon" src="{assetsUrl}/golden/Casino.svg" alt="" />
      Casino en Vivo
    </button>
    <button class="u-menubar-button {active_view=='crash'?'u-category-select':''}" on:click={ ()=> onPageChange("crash") }>
      <img class="u-menubar-icon" src="{assetsUrl}/golden/CrashGames.svg" alt="" />
      Crash Games
    </button>
    <button class="u-menubar-button {active_view=='scratch'?'u-category-select':''}"  on:click={ ()=> onPageChange("scratch") }>
      <img class="u-menubar-icon" src="{assetsUrl}/golden/scratch.svg" alt="" />
      Raspa y Gana
    </button>
    <button class="u-menubar-button {active_view=='virtual'?'u-category-select':''}"  on:click={ ()=> onPageChange("virtual") }>
      <img class="u-menubar-icon" src="{assetsUrl}/golden/GameVirtual.svg" alt="" />
      Juegos Virtuales
    </button>
    <button class="u-menubar-button {active_view=='providers'?'u-category-select':''}"  on:click={ ()=> onPageChange("providers") }>
      <img class="u-menubar-icon" src="{assetsUrl}/golden/Providers.svg" alt="" />
      Proveedores
    </button>
  </div>
  <div on:click={onActiveContent} class="u-backdrop"></div>
  {/if}
</nav>

<style>
  .u-hamburger-menu{
    position: relative;
  }
  
  button {
    color:white;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 5px;
    width: 30px;
    height: 28px;
    line-height: 30px;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    user-select: none;
    cursor: pointer;
  }
  .button-lineal{
    background-color: transparent;
    border: 1px solid transparent;
  }

  /* Estilo del boton cuando se pasa el mouse por encima*/
  .button-lineal:hover {
    background: transparent;
  }
  @media only screen and (max-width: 700px) {
    .u-menu-content {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      margin-top: 0.8rem;
      left: -8px;
      width: 100vw;
      height: auto;
      background: #42424c;
      z-index: 4;
      z-index: 20000;
    }
    
    button {
      box-sizing: border-box;
      display: inline-block;
      border: 1px solid black;
      border-radius: 5px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      user-select: none;
    }

    /* Estilo del boton cuando se pasa el mouse por encima*/
     button:hover {
      background: transparent;
    }

  
    .u-menubar-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      gap: 0.5rem;
      background: #262632;
      border: none;
      color: white;
      height: 2rem;
      cursor: pointer;
    }
    .u-menubar-icon {
      width: 25px;
      left: 25px;
    }

    /*Estilo cuando el mouse pasa encima de cada link del menu*/
    .u-menubar-button:hover{
      background: #42424c;
      border-radius: 0.2rem;
    }
    .u-category-select{
      background: rgb(67, 61, 61);
    }
    .u-backdrop{
      margin-top: 0.8rem;
      margin-left: -0.5rem;
      position: absolute;
      height: 100vh;
      width: 100vw;
      background-color: rgba(101, 101, 101, 0.21);
    }
  }
  
  @media only screen and (min-width: 701px) {
    .u-menu-content {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 0.5rem;
      margin-left: -0.5rem;
      margin-top: 0.8rem;
      width: 32vw;
      height: 100vh;
      background: #42424c;
      padding: 1rem;
      z-index: 20000;
    }
    
    button {
      box-sizing: border-box;
      display: inline-block;
      border: 1px solid black;
      border-radius: 5px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      user-select: none;
    }
    .u-menubar-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      gap: 0.5rem;
      background: #262632;
      border: none;
      height: 2rem;
      cursor: pointer;
    }
    .u-menubar-icon {
      width: 25px;
      left: 25px;
    }

    /*Estilo cuando el mouse pasa encima de cada link del menu*/
    .u-menubar-button:hover{
      background: #84849b;
      border-radius: 0.2rem;
    }
    .u-category-select{
      background: rgb(168, 147, 12);
    }

    .u-backdrop{
      margin-top: 0.8rem;
      margin-left: -0.5rem;
      position: absolute;
      height: 100vh;
      width: 96.3vw;
      background-color: rgba(101, 101, 101, 0.21);
    }
  }
</style>
