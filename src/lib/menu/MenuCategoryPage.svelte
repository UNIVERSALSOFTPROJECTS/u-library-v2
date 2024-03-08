<script>
 
  

  import { onMount } from "svelte";

  export let onCategoryChange;
  export let active_view;
  export let ASSETS; 

  let showModalPromotion=false;
  let selectedOption = '';
  let isDropdownOpen = false;
  let isDropdownOpen2 = false;
  
  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }
  function toggleDropdown2() {
    isDropdownOpen2 = !isDropdownOpen2;
  }
  
  function selectOption(option) {
    onCategoryChange("sportbook",option);
    isDropdownOpen = false;
  }
  function selectOption2(option) {
    console.log("select option:",option);
    onCategoryChange("sportbooklive",option);
    isDropdownOpen2 = false;
  }
  
  onMount(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.dropdown')) {
        isDropdownOpen = false;
      }
      if (!event.target.closest('.dropdown2')) {
        isDropdownOpen2 = false;
      }
    }
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const onShowModalPromotion = () => {
    showModalPromotion = true;
  };

  
  let modfBtn = false;
  if(active_view == 'sportbook' || active_view == 'horses' || active_view == 'esports' || active_view == 'sportbooklive'){
    modfBtn = true;
  }

</script>

<div class="container {modfBtn== true?'c-btn':''}" id="navbar-container">
    <button class="li-game {active_view=='home'?'u-category-select':''}" on:click={  ()=>onCategoryChange("home") }>
      <img class="u-menubar-icon" src="{ASSETS}/golden/Home.svg" alt="">
      <span class="u-span-li-games">Inicio</span>  
    </button>


    {#if isDropdownOpen}
        <div class="dropdown-menu">
          <button class="btn cahs" on:click={() => selectOption({gameid:"wintech_gaming"})}>
            <div class="cashout">Nuevo cashout</div>
           <p class="depor1"> Deporte 1</p>
          </button>
          <button class="btn" on:click={() => selectOption({gameid:"8042022_digitain"})}> <p class="depor2"> Deporte 2</p></button>
        </div>
      {:else}
        <div class="dropdown">
          <button  on:click={toggleDropdown} class="li-game {active_view=='sportbook'?'u-category-select':''}">
            <linearGradient x1="585.97" x2="585.97" y1="-696.746" y2="-667.894" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 72.371 72.372" style="enable-background:new 0 0 72.371 72.372;" xml:space="preserve">
                <g>
                  <path d="M22.57,2.648c-4.489,1.82-8.517,4.496-11.971,7.949C7.144,14.051,4.471,18.08,2.65,22.568C0.892,26.904,0,31.486,0,36.186   c0,4.699,0.892,9.281,2.65,13.615c1.821,4.489,4.495,8.518,7.949,11.971c3.454,3.455,7.481,6.129,11.971,7.949   c4.336,1.76,8.917,2.649,13.617,2.649c4.7,0,9.28-0.892,13.616-2.649c4.488-1.82,8.518-4.494,11.971-7.949   c3.455-3.453,6.129-7.48,7.949-11.971c1.758-4.334,2.648-8.916,2.648-13.615c0-4.7-0.891-9.282-2.648-13.618   c-1.82-4.488-4.496-8.518-7.949-11.971s-7.479-6.129-11.971-7.949C45.467,0.891,40.887,0,36.187,0   C31.487,0,26.906,0.891,22.57,2.648z M9.044,51.419c-1.743-1.094-3.349-2.354-4.771-3.838c-2.172-6.112-2.54-12.729-1.101-19.01   c0.677-1.335,1.447-2.617,2.318-3.845c0.269-0.379,0.518-0.774,0.806-1.142l8.166,4.832c0,0.064,0,0.134,0,0.205   c-0.021,4.392,0.425,8.752,1.313,13.049c0.003,0.02,0.006,0.031,0.01,0.049l-6.333,9.93C9.314,51.579,9.177,51.503,9.044,51.419z    M33.324,68.206c1.409,0.719,2.858,1.326,4.347,1.82c-6.325,0.275-12.713-1.207-18.36-4.447L33,68.018   C33.105,68.085,33.212,68.149,33.324,68.206z M33.274,65.735L17.12,62.856c-1.89-2.295-3.59-4.723-5.051-7.318   c-0.372-0.66-0.787-1.301-1.102-1.99l6.327-9.92c0.14,0.035,0.296,0.072,0.473,0.119c3.958,1.059,7.986,1.812,12.042,2.402   c0.237,0.033,0.435,0.062,0.604,0.08l7.584,13.113c-1.316,1.85-2.647,3.69-4.007,5.51C33.764,65.155,33.524,65.446,33.274,65.735z    M60.15,60.149c-1.286,1.287-2.651,2.447-4.08,3.481c-0.237-1.894-0.646-3.75-1.223-5.563l8.092-15.096   c2.229-1.015,4.379-2.166,6.375-3.593c0.261-0.185,0.478-0.392,0.646-0.618C69.374,46.561,66.104,54.196,60.15,60.149z    M59.791,40.571c0.301,0.574,0.598,1.154,0.896,1.742l-7.816,14.58c-0.045,0.01-0.088,0.02-0.133,0.026   c-4.225,0.789-8.484,1.209-12.779,1.229l-7.8-13.487c1.214-2.254,2.417-4.517,3.61-6.781c0.81-1.536,1.606-3.082,2.401-4.627   l16.143-1.658C56.29,34.495,58.163,37.457,59.791,40.571z M56.516,23.277c-0.766,2.023-1.586,4.025-2.401,6.031l-15.726,1.615   c-0.188-0.248-0.383-0.492-0.588-0.725c-1.857-2.103-3.726-4.193-5.592-6.289c0.017-0.021,0.034-0.037,0.051-0.056   c-0.753-0.752-1.508-1.504-2.261-2.258l4.378-13.181c0.302-0.08,0.606-0.147,0.913-0.18c2.38-0.242,4.763-0.516,7.149-0.654   c1.461-0.082,2.93-0.129,4.416-0.024l10.832,12.209C57.314,20.943,56.95,22.124,56.516,23.277z M60.15,12.221   c2.988,2.99,5.302,6.402,6.938,10.047c-2.024-1.393-4.188-2.539-6.463-3.473c-0.354-0.146-0.717-0.275-1.086-0.402L48.877,6.376   c0.074-0.519,0.113-1.039,0.129-1.563C53.062,6.464,56.864,8.936,60.15,12.221z M25.334,4.182c0.042,0.031,0.062,0.057,0.086,0.064   c2.437,0.842,4.654,2.082,6.744,3.553l-4.09,12.317c-0.021,0.006-0.041,0.012-0.061,0.021c-0.837,0.346-1.69,0.656-2.514,1.031   c-3.395,1.543-6.705,3.252-9.823,5.301l-8.071-4.775c0.012-0.252,0.055-0.508,0.141-0.736c0.542-1.444,1.075-2.896,1.688-4.311   c0.472-1.09,1.01-2.143,1.597-3.172c0.384-0.424,0.782-0.844,1.192-1.254c3.833-3.832,8.363-6.553,13.186-8.162   C25.384,4.098,25.358,4.139,25.334,4.182z" style="fill: URL(#SVGID_slots3);"/>
                </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
              </svg>
            </linearGradient>
            <span class="u-span-li-games">Deportes</span>  
          </button>
        </div>
      {/if}
      
      {#if isDropdownOpen2}
        <div class="dropdown-menu">
          <button class="btn cahs" on:click={() => selectOption2({gameid:"wintech_gaming"})}>
            <div class="cashout">Streaming</div>
            <p class="depor1"> Deporte 1</p>
          </button>
          <button class="btn" on:click={() => selectOption2({gameid:"8042022_digitain"})}><p class="depor2"> Deporte 2</p></button>
        </div>
        {:else}
        <div class="dropdown2">
          <button on:click={toggleDropdown2} class="li-game in-d {active_view=='sportbooklive'?'u-category-select':''}">
            <img class="u-menubar-icon re" src="https://d2zzz5z45zl95g.cloudfront.net/latinosport21/sportbooktlive.png" alt="" style="margin: 0 auto;">
            <span class="u-span-li-games">En vivo</span>  
          </button>
        </div>
      {/if}

    <!--button on:click={onCategoryChange("esports")} class="li-game {active_view=='esports'?'u-category-select':''}"> 
      <img class="u-menubar-icon" src="{ASSETS}/golden/Esports.svg" alt="">
      <span  class="u-span-li-games u-span-sport" >E-Sports</span> 
    </button-->
    <button on:click={onCategoryChange("slot")} class="li-game {active_view=='slot'?'u-category-select':''}"> 
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 28.8" style="stroke-width: 17px;width: 2rem;">
        <linearGradient id="SVGID_slots3" x1="585.97" x2="585.97" y1="-696.746" y2="-667.894" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 -566.97 -667.906)">
          <stop offset="0" stop-color="#FF9220"></stop>
          <stop offset=".389" stop-color="#FFA82C"></stop>
          <stop offset=".443" stop-color="#FCCB8E"></stop>
          <stop offset=".493" stop-color="#FFD38A"></stop>
          <stop offset="1" stop-color="#FFCC63"></stop>
        </linearGradient>
        <path class="st0" d="M35.8 28.8h-7.4c-1.2.1-2.3-.8-2.4-2V2c.1-1.2 1.2-2.1 2.4-2h7.4C37 0 38 .9 38 2.1v24.6c0 1.2-1 2.1-2.2 2.1zM28 2s.9 1 4 1 4-1 4-1h-8zm8 7.9h-8v2h4l-3 8h3l4-10zm-4 15.9c-3.1 0-4 1-4 1h8s-.9-1-4-1zm-9.3 3h-7.4c-1.2.1-2.2-.8-2.3-2V2c.1-1.2 1.1-2.1 2.3-2h7.4c1.2-.1 2.2.8 2.3 2v24.9c-.1 1.1-1.1 2-2.3 1.9zM15 2s.9 1 4 1 4-1 4-1h-8zm8 7.9h-8v2h4l-3 8h3l4-10zm-4 15.9c-3.1 0-4 1-4 1h8s-.9-1-4-1zm-9.4 3H2.2C1 28.8 0 27.9 0 26.7V2.1C0 .9 1 0 2.2 0h7.4c1.2-.1 2.3.8 2.4 2v24.9c-.1 1.1-1.2 2-2.4 1.9zM2 2s.9 1 4 1 4-1 4-1H2zm8 7.9H2v2h4l-2.9 8H6l4-10zM6 25.8c-3.1 0-4 1-4 1h8s-.9-1-4-1z" style="fill: URL(#SVGID_slots3);"></path>
      </svg>
      <span class="u-span-li-games">Casino</span>  
    </button>
    <button on:click={onCategoryChange("slotlive")} class="li-game {active_view=='slotlive'?'u-category-select':''}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 30.8">
        <linearGradient id="SVGID_tables" x1="754.359" x2="754.359" y1="-695.753" y2="-664.92" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 -738.875 -664.906)">
            <stop offset="0" stop-color="#FF9220"></stop>
            <stop offset=".439" stop-color="#FFA82C"></stop>
            <stop offset=".48" stop-color="#FCCB8E"></stop>
            <stop offset=".525" stop-color="#FFD38A"></stop>
            <stop offset="1" stop-color="#FFCC63"></stop>
        </linearGradient>
        <path style="fill: URL(#SVGID_tables);" class="st0" d="M27.3 25.5C21.7 32 12 32.7 5.5 27.2-1.1 21.6-1.8 12 3.6 5.5c0 0 0-.1.1-.1C9.3-1.1 19-1.8 25.6 3.7c6.4 5.5 7.2 15.2 1.7 21.8 0-.1 0-.1 0 0zm-20.8.4c1.8 1.5 4 2.6 6.3 3l1-4.9c-1.9-.4-3.7-1.4-5-2.8L5 24.5c.5.5 1 .9 1.5 1.4zM2.4 11c-1 2.9-1 6 0 8.9l4.7-1.6c-.6-1.8-.6-3.8 0-5.7L2.4 11zm10.4-9.1C9.8 2.5 7 4 5 6.4l3.8 3.3c1.3-1.5 3-2.5 5-2.8l-1-5zm5.3 27c3-.6 5.8-2.2 7.8-4.5l-3.8-3.3c-1.3 1.5-3 2.5-5 2.8l1 5zM24.5 5c-1.8-1.5-4-2.6-6.3-3l-1 4.9c1.9.4 3.7 1.4 5 2.8L26 6.4c-.5-.5-1-1-1.5-1.4zm4.1 6l-4.7 1.6c.6 1.8.6 3.8 0 5.7l4.7 1.6c.9-2.9.9-6 0-8.9zm-1.7 5.2c-.5 0-.8-.4-.8-.8 0-.5.4-.8.8-.8.5 0 .8.4.8.8.1.5-.3.8-.8.8zm-5.7-9.8c-.5 0-.8-.4-.8-.8 0-.5.4-.8.8-.8.5 0 .8.4.8.8s-.4.8-.8.8zm.9 18.9c0 .5-.4.8-.8.8-.5 0-.8-.4-.8-.8 0-.5.4-.8.8-.8.4-.1.8.3.8.8zM8.9 5.6c0-.5.4-.8.8-.8.5 0 .8.4.8.8 0 .5-.4.8-.8.8s-.8-.4-.8-.8zM4 16.3c-.5 0-.8-.4-.8-.8 0-.5.4-.8.8-.8.5 0 .8.4.8.8.1.4-.3.8-.8.8zm5.8 8.2c.5 0 .8.4.8.8 0 .5-.4.8-.8.8-.5 0-.8-.4-.8-.8-.1-.5.3-.8.8-.8z"></path>
     </svg>
      <span class="u-span-li-games u-span-slotlive">Casino en Vivo</span>  
    </button>
    <button on:click={onCategoryChange("crash")} class= "li-game {active_view=='crash'?'u-category-select':''}">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve">
        <style type="text/css">
          .st0{fill:#E9A944 !important;enable-background:new    ;}
          .st1{fill:#F6B44B;enable-background:new    ;}
          .st2{fill:#F08D2C;enable-background:new    ;}
          .st3{fill:#CD6A08;enable-background:new    ;}
        </style>
        <g>
          <path class="st0" d="M29.4,3.3C21.8,4.7,17.1,8.9,14.2,13c-1.9,2.7-3.1,5.3-3.7,7.2c-0.5,1.4-0.7,2.3-0.7,2.3c0,0,0,0,0,0
            c0.8,0.2,1.5,0.4,2.1,0.7c3.2,1.3,4.6,3.4,5.2,5.1c0.4,1.3,0.4,2.2,0.4,2.2c1-0.3,1.9-0.6,2.8-0.9c2.7-1,5-2.2,6.9-3.5
            c6.3-4.4,8.8-10.4,9.7-15.2L29.4,3.3z M26.1,19.6c-3,0-5.5-2.5-5.5-5.5s2.5-5.5,5.5-5.5s5.5,2.5,5.5,5.5S29.1,19.6,26.1,19.6z"></path>
          <path class="st1" d="M37,10.8l-7.6-7.5c2.4-0.5,5-0.6,8-0.4C37.4,2.8,37.8,6.3,37,10.8z"></path>
          <path class="st2" d="M17.6,30.4c-2.6,4.6-7.5,4.4-7.5,4.4l0.1-1.6c-1.8,1.3-4.3,1.1-4.3,1.1c-0.1-2.6,1.1-4.4,1.1-4.4l-1.5,0.3
            c-0.1-4.4,2.7-6.7,4.4-7.7c0.8,0.2,1.5,0.4,2.1,0.7c-4.3,1.5-4.8,5.3-4.8,5.3C7.5,28.3,9.8,28,9.8,28s-1.8,2.6-2.5,4.8
            c1.1,0,4.8-2.3,4.8-2.3s-0.2,1.7-0.5,2.7c4.3-0.9,5.4-4.9,5.4-4.9l0-0.1C17.6,29.4,17.6,30.4,17.6,30.4z"></path>
          <path class="st3" d="M10.8,29.1c0,0,0.7-5.3,9-8.9c0,0-0.7,3.2-4.4,6.5C15.5,26.7,13.4,28.7,10.8,29.1z"></path>
          <path class="st3" d="M14.2,13c-1.9,2.7-3.1,5.3-3.7,7.2c-3.5-0.1-5.3,1.7-7.4,3.3C5.3,14.1,11.9,13.1,14.2,13z"></path>
          <path class="st3" d="M27.3,26c-1.4,10.6-10.8,11.3-10.8,11.3c2.4-1.3,3.4-5.3,3.9-7.7C23,28.5,25.3,27.3,27.3,26z"></path>
          <circle class="st1" cx="26.1" cy="14" r="3.6"></circle>
        </g>
        </svg>
      <span class="u-span-li-games u-span-crash">Crash Games</span>  
    </button>
    <button on:click={onCategoryChange("scratch")} class="li-game {active_view=='scratch'?'u-category-select':''}">
      <img class="u-menubar-icon" src="{ASSETS}/golden/scratch.svg" alt="">
      <span class="u-span-li-games u-span-scratch">Raspa y Gana</span>  
    </button>
    <button on:click={onCategoryChange("virtual")} class="li-game {active_view=='virtual'?'u-category-select':''}">
      <img class="u-menubar-icon" src="{ASSETS}/golden/GameVirtual.svg" alt="">
      <span class="u-span-li-games u-span-virtual">Juegos virtuales</span> 
    </button>
    <button on:click={onCategoryChange("providers")} class="li-game {active_view=='providers'?'u-category-select':''}"> 
      <img class="u-menubar-icon" src="{ASSETS}/golden/Providers.svg" alt="">
      <span class="u-span-li-games">Proveedores</span>  
    </button>
    <!--button class="{active_view=='promotions'?'u-category-select':''}"  on:click={onShowModalPromotion}>
      <img class="u-menubar-icon" src="{ASSETS}/golden/Promociones.svg" alt=""> 
      <span >Promociones </span> 
    </button-->
</div>

{#if modfBtn == false}
  <div class="bg__fireworks">
    <div class="pattern0 fireworks fire0">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern1 fireworks fire1">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern2 fireworks fire2">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern3 fireworks fire3">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern4 fireworks fire4">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern5 fireworks fire5">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern6 fireworks fire6">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern7 fireworks fire7">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern8 fireworks fire8">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern9 fireworks fire9">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern10 fireworks fire10">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern11 fireworks fire11">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern12 fireworks fire12">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern13 fireworks fire13">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern14 fireworks fire14">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern15 fireworks fire15">
        <div class="ring_1"></div>
    <div class="ring_2"></div> s </div>
    <div class="pattern16 fireworks fire16">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern17 fireworks fire17">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern18 fireworks fire18">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
    <div class="pattern19 fireworks fire19">
        <div class="ring_1"></div>
        <div class="ring_2"></div>
    </div>
  </div>
{/if}




<style>
  .depor1{
    color: #6aff00;
    margin: 0;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  .depor2{
    color: #ff6b6b;
    margin: 0;
    text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  .cashout{
    font-size: 10px;
    padding: 0 0.25rem;
    border-radius: 0.25rem;
    text-align: center;
    background: #45fc03;
    font-weight: 800;
    color: black;
  }
  
  @media only screen and (min-width: 1800px){
    .banners_promo{
      width: 78%;
    }
  }

  button:hover{
    background: linear-gradient(180deg, transparent, transparent, transparent, transparent,transparent,transparent,transparent,  #ffff1b);
    transform: skewX(10deg);
  }
  .u-category-select{
    background: linear-gradient(180deg, transparent, transparent, transparent, transparent,transparent,transparent,transparent,  #ffff1b);
    background-color: #f1f10030 !important;
    transform: inherit;
  }
  .u-span-li-games{
    text-align: center;
    overflow: hidden;
    font-size: 14px;
    line-height: 1;
    width: 100%;

  }
  .dropdown-menu{
    position: relative;
    height: 5.25rem;
    background-color: rgba(32, 37, 44, 0.7);
    min-width: 6rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    justify-content: center;
  }
  .cahs{
    flex-direction: column;
    justify-content: center;
  }
  .dropdown-menu .btn{
    width: 100%;
    justify-content: center;
    padding: 0.5rem;
    text-align: center;
  }
  .li-game {
    height: 5.25rem;
    width: 100%;
    background-color: rgba(32, 37, 44, 0.7);
    color: #fff;
    position: relative;
    border-radius: 8px;
    flex-grow: 1;
    flex-basis: 260px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    min-width: 6rem;
    transition: 0.5s;
  }
  .li-game svg{
    width: 2rem;
    height: 2rem;
  }
    
  .li-game.u-category-select span{
    animation: neonGlow 2s infinite alternate cubic-bezier(0.455, 0.030, 0.515, 0.955);
  }

  @keyframes neonGlow {
  0% {
    text-shadow: 0 0 10px rgba(255,255,255,.5),
                 0 0 20px rgba(255,255,255,.5),
                 0 0 22px  rgba(255,255,255,.5),
                 0 0 40px  rgba(66,220,219,.0),
                 0 0 60px  rgba(66,220,219,.0),
                 0 0 80px  rgba(66,220,219,.0),
                 0 0 100px rgba(66,220,219,.0),
                 0 0 140px rgba(66,220,219,.0),
                 0 0 200px rgba(66, 220, 220, 0);
  }
  100% {
    text-shadow: 0 0 2px rgba(255,255,255,.5),
                 0 0 8px rgba(255,255,255,.5),
                 0 0 10px rgba(255,255,255,0),
                 0 0 20px rgba(66, 220, 220, 0),
                 0 0 30px rgba(66, 220, 220, 0),
                
               
                
  }
  }

  @media only screen and (max-width: 1023px) {


    .container{
      display: flex;
      flex-direction: row;
      background-color: transparent;
      align-items: center;
      justify-content: start;
      padding: 0.5rem;
      overflow-x: scroll;
      height: 6.5rem;
      margin-top: 0rem;
      gap: 0.5rem;
      width: auto;
      overflow: auto;
    }
    button{
      border: none;
      background-color: transparent;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 100%;
      padding-bottom: 0.5rem;
      width: 5rem;
      z-index: 1;
    }



    .u-menubar-icon{
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      filter: invert(35%) sepia(78%) saturate(732%) hue-rotate(337deg) brightness(102%) contrast(101%);
    }
   
  }
  @media only screen and (min-width: 1024px) {
    .u-span-li-games{
      text-transform: uppercase;
    }

    .container{
      height: 6.5rem;
      display: grid;
      grid-template-columns: repeat(9,1fr);
      gap: 0.25rem;
      flex-direction: row;
      background-color: transparent;
      align-items: center;
      justify-content: start;
      padding: 0rem 1rem;
      position: relative;
      z-index: 3;
      overflow: auto;
    }
    button{
      border: none;
      background-color: transparent;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;
      cursor: pointer;
      padding-bottom: 0.5rem;
      font-size: 1rem;
    }

    .u-menubar-icon{
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      filter: invert(35%) sepia(78%) saturate(732%) hue-rotate(337deg) brightness(102%) contrast(101%);
    }
    .u-menubar-icon.re{
      width: 2.5rem;
      height: 2.5rem;
    }   
  }
  @media only screen and (min-width: 1800px) {
    .container{
      padding: 0 12rem;
      height: 6.5rem;
    }  
  }


</style>
