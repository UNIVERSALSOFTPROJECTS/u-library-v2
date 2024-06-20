<script>
    import {register} from 'swiper/element/bundle';
    import { detectSubdomain } from "../js/utils/formatUtils";
    import axios from "axios";

    export let platform;
    export let onCategoryChange;

    const urlJSON = 'https://assetsapiusoft.s3.us-west-2.amazonaws.com/generic_imgs/configBanners.json';
    let bannerDefault = [{"url_w":"https://assets.apiusoft.com/Latinsport21/bn_w_caballos2.png","url_m":"https://assets.apiusoft.com/Latinsport21/bn_m_caballos.png","dateFrom": "","dateUntil": "","category":"horses"}];
    let bannersJSON = [];
    let filteredBanners = [];
    let bannersLoading = true;
    let allBanners;

    const today = (new Date());
    today.setHours(0,0,0,0);

    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('-');
        return new Date(year, month - 1, day);
    }

    async function getBanners() {
        try {
            const response = await axios.get(urlJSON);
            bannersJSON = response.data;
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
        let subdomain = detectSubdomain() == ""?"www":detectSubdomain();
        //let subdomain = "cl";
        try {
            let detectPage = bannersJSON.filter((e) => e.page == platform)[0];
            allBanners = detectPage.banners.filter((d) => d.country == subdomain)[0].banners;
            filteredBanners = allBanners.filter( o => {
            const dateFrom = parseDate(o.dateFrom) || "";
            const dateUntil = parseDate(o.dateUntil) || "";
            return !(dateFrom < today && dateUntil < today);
        });
        } catch (error) {
            filteredBanners = bannerDefault;
        }finally{
            if (filteredBanners.length == 0) { filteredBanners = bannerDefault; }
           // bannersLoading = false;
        }        
    }     
    register();
    getBanners();  
</script>

<div class="banners">
    {#if bannersLoading}
        <div class="loading"><p></p></div>  
    {/if}
    <swiper-container class="swiper-container__banners" speed={1500} autoplay-delay={10000} loop={true}>
        {#each filteredBanners as banner}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <swiper-slide>
                <picture on:click={()=>onCategoryChange(banner.category)}>
                    <source media="(max-width: 1023px)" srcset={banner.url_m}>
                    <img src={banner.url_w} alt="banner" loading="lazy">
                </picture>
            </swiper-slide>
        {/each}
    </swiper-container>
</div>

<style lang="scss">
    @import '../styles/components/variables';
    @import '../styles/components/mixins';
    .banners{
        position: relative;
        height: 102.67vw; 
        @media #{$landscape_pc} {
            height: 52.1vw;
        }
        & swiper{
            &-container{
                width: 100%;
                height:100%;
                overflow: hidden;
                &::after{
                    content: "";
                    position: absolute;
                    height: 0;
                    width: 100%;
                    bottom: 62px;
                    z-index: 1;
                    box-shadow: 0 40px 90px 120px $bgc-body;
                }
            }
            &-slide{
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }
    
    .loading {
        height: 100%;
        position: absolute;
        width: 100%;
        background: $bgc-body;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        & p{
            pointer-events: none;
            width: 2.5em;
            height: 2.5em;
            border: 0.4em solid transparent;
            border-color: #ffffff63;
            border-top-color: $color-primary;
            border-radius: 50%;
            animation: spinner_circular 1s linear infinite;
        }
    }

    @keyframes spinner_circular {
        100% {
            transform: rotate(360deg)
        }
    }
</style>