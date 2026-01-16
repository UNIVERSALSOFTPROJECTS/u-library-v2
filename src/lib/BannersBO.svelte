<script>
  import {register} from 'swiper/element/bundle';
  //import { detectSubdomain } from "../js/utils/formatUtils";
  import {shouldShowBanner,calculateIntervals,startAutoplay} from "../js/constants";
  import ServerConnection from '../js/server';
  import { onMount,tick } from "svelte";

  export let onCategoryChange;
  export let currentCategory = 'home';
  export let section = '';
  export let conf;

  let banners = [];
  let swiperInstance = [];
  let intervalBanner = {};
  let bannersLoading = true;
  let isMobile = window.innerWidth <= 768;
  let response;

  async function loadBanners() {
    try {
      if(!conf){
      console.log("no se encontro ningun conf");
      }
      response = await ServerConnection.banners.getBanners(conf);
      
      banners = response.data.filter((b) => 
        b.status == 1 && b.device == (isMobile? "Mobile":"Desktop") && 
        b.category?.toLowerCase() === currentCategory.toLowerCase() &&
        b.section?.toLowerCase() === section.toLowerCase()
      ) 
      .flatMap((b)=> b.items)
      .filter((item)=> item.status == 1)
      .sort((a, b) => a.orderView - b.orderView);
    }catch(err){
      console.error("ERROR DE BANNER", err); 
      banners = [];
    }finally{
      bannersLoading = false;
    }
  }

  onMount (async()=>{
    register();
    await loadBanners();

    window.addEventListener("resize", async()=>{
      const nowMobile = window.innerWidth <= 768;
      if(nowMobile !== isMobile){
        isMobile = nowMobile;
        await loadBanners();
      }
    })
    await tick();
    
    intervalBanner = calculateIntervals(response);
    startAutoplay(0, swiperInstance, intervalBanner);
  })
</script>

<div class="banners">
  {#if banners.length === 0}
    <p>No hay banners disponibles</p>
  {:else}
    <swiper-container
      class="u-carousel swiper-container__banners"
      bind:this={swiperInstance[0]}
      slides-per-view="1"
      loop="true"
      speed="1500"
      effect = "fade"
    >
      {#each banners as banner}
        {#if shouldShowBanner(banner)}
          <swiper-slide>
            <button class="no-btn" on:click={() =>onCategoryChange(banner.eventClick.match(/'([^']+)'/)[1].toLowerCase())} >
            {#if banner.imgUrl.endsWith(".mp4") || banner.imgUrl.endsWith(".webm")}
              <video autoplay muted loop>
                <source src="{conf.ASSETS}{banner.imgUrl}" type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            {:else}
              <img
                src="{conf.ASSETS}{banner.imgUrl}"
                alt="banner"
                loading="lazy"
              />
            {/if}
            </button>
          </swiper-slide>
          {/if}
      {/each}
    </swiper-container>
  {/if}
</div>

<style>
  .banners{
    width: 100%;
    /* height: 55.67vw; */
  }
  .u-carousel {
   width: 100%;
   position: relative;
   overflow: hidden;
   z-index: 0;
   display: block;
   perspective: inherit;
  }
  .no-btn {
    margin: 0;
    padding: 0;
    border: none;
    width: 100%;
  }
  .u-carousel::after {
    content: "";
    position: absolute;
    /* box-shadow: 0px 40px 90px 120px #282828; */
    height: 0;
    width: 100%;
    bottom: 62px;
    z-index: 1;
  }
  .u-carousel {
    padding: 0;
  }
  /* .u-carousel::after {
    box-shadow: 0 70px 40px 50px #2a1639;
  } */
  @media only screen and (min-width: 1024px) {
    .u-carousel {
      margin-bottom: -20vw;
      padding: 0;
    }
  }
  @media only screen and (max-width: 768px) {
    .banners{
      width: 100%;
      height: auto;
    }
  }

</style>
