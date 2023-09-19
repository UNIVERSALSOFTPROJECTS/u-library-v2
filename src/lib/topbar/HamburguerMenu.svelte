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

<div>
  <nav class="u-hamburger-menu">
    <!--input type="checkbox" id="menu" /-->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button class="button-lineal {activeContent?'u-active':''}" on:click={() => onActiveContent()}> ☰ </button>
    {#if activeContent}
    <div class="u-menu-content">
      <div class="u-sub-content">
        <button class="u-menubar-button {active_view=='home'?'u-category-select':''}" on:click={  ()=>onPageChange("home") }>
          <img class="u-menubar-icon" src="{assetsUrl}/golden/Home.svg" alt=""/>
          Inicio
        </button>
      </div>
      <div class="u-sub-content">
        <button class="u-menubar-button {active_view=='sportbook'?'u-category-select':''}" on:click={ ()=> onPageChange("sportbook") }>
          <img class="u-menubar-icon" src="{assetsUrl}/golden/Sportbook.svg" alt="" />
          Deportes
        </button>
      </div>
      <div class="u-sub-content">
        <button class="u-menubar-button {active_view=='horses'?'u-category-select':''}" on:click={ ()=> onPageChange("horses") }>
          <img class="u-menubar-icon" src="{assetsUrl}/golden/Hipica.svg" alt="" />
          Hípica
        </button>
      </div>
      <!--div class="u-sub-content">
        <button class="u-menubar-button {active_view=='esports'?'u-category-select':''}"  on:click={ ()=> onPageChange("esports") }>
          <img class="u-menubar-icon" src="{assetsUrl}/golden/Esports.svg" alt="" />
          E-Sports
        </button>
      </div-->
      <div class="u-sub-content">
        <button class="u-menubar-button {active_view=='slot'?'u-category-select':''}" on:click={ ()=> onPageChange("slot") }>
          <img class="u-menubar-icon" src="{assetsUrl}/golden/Slots.svg" alt="" />
          Casino
        </button>
      </div>
      <div class="u-sub-content">
        <button class="u-menubar-button {active_view=='slotlive'?'u-category-select':''}" on:click={ ()=> onPageChange("slotlive") }>
          <img class="u-menubar-icon" src="{assetsUrl}/golden/Casino.svg" alt="" />
          Casino en Vivo
        </button>
      </div>



      <div class="u-sub-content">
        <button class="u-menubar-button {active_view=='crash'?'u-category-select':''}" on:click={ ()=> onPageChange("crash") }>
          <img class="u-menubar-icon" src="{assetsUrl}/golden/CrashGames.svg" alt="" />
          Crash Games
        </button>
      </div>
      <div class="u-sub-content">
        <button class="u-menubar-button {active_view=='scratch'?'u-category-select':''}"  on:click={ ()=> onPageChange("scratch") }>
          <img class="u-menubar-icon" src="{assetsUrl}/golden/scratch.svg" alt="" />
          Raspa y Gana
        </button>
      </div>
      <div class="u-sub-content">
        <button class="u-menubar-button {active_view=='virtual'?'u-category-select':''}"  on:click={ ()=> onPageChange("virtual") }>
          <img class="u-menubar-icon" src="{assetsUrl}/golden/GameVirtual.svg" alt="" />
          Juegos Virtuales
        </button>
      </div>

      <div class="u-sub-content">
        <button class="u-menubar-button {active_view=='providers'?'u-category-select':''}"  on:click={ ()=> onPageChange("providers") }>
          <img class="u-menubar-icon" src="{assetsUrl}/golden/Providers.svg" alt="" />
          Proveedores
        </button>
      </div>
      <!--
        <div class="u-sub-content">
          <button class="u-menubar-button {active_view=='promotions'?'u-category-select':''}"  on:click={ ()=> onPageChange("promotions") }>
            <img class="u-menubar-icon" src="{assetsUrl}/golden/Promociones.svg" alt="" />
            Promociones
          </button>
        </div>
      -->
    </div>
    <div class="u-backdrop"/>
    {/if}
  </nav>
</div>

<style>


  .u-menu-content{
    
    height: 90vh;
    display:block;
    left: -0.7rem;
    position: absolute;

  }
  .u-hamburger-menu{
    position: relative;
  }
  .u-hamburger-menu .u-active {
    background: #f54b00;
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
    padding: 0;
    margin: 0;
    left: -8px;
    width: 100vw;
    min-height: auto;
    height: auto;
    background: #262632;
    z-index: 4;
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
    .u-sub-content{
      padding: 0.5rem;
    }
  }
  
  @media only screen and (min-width: 700px) {
    .u-menu-content {
      position: absolute;
      padding: 0;
      margin-left: -1rem;
      margin-top: 1rem;
      width: 22vw;
      background: #262632;
      z-index: 4;
      height: auto ;
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
      background: white;
    }

    .u-sub-content{
      padding: 0.8rem;
    }

  
    .u-menubar-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 95%;
      gap: 0.5rem;
      background: #262632;
      border: none;
      color: white;
      height: 2rem;
      cursor: pointer;
      margin-left: 0.9rem;
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
  }
</style>
