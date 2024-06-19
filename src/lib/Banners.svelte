<script>
    import {register} from 'swiper/element/bundle';
    import { detectSubdomain } from "../js/utils/formatUtils";
    import axios from "axios";

    export let platform;
    export let onCategoryChange;

    let bannerDefault = [{"url_w":"https://assets.apiusoft.com/Latinsport21/bn_w_caballos2.png","url_m":"https://assets.apiusoft.com/Latinsport21/bn_m_caballos.png","dateFrom": "","dateUntil": "","category":"horses"}];
    let bannersJSON = [];
    let filteredBanners = [];

    const today = (new Date());
    today.setHours(0,0,0,0);

    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('-');
        return new Date(year, month - 1, day);
    }

    register();

    async function getBanners() {
        const url = 'https://assetsapiusoft.s3.us-west-2.amazonaws.com/generic_imgs/configBanners.json';  // URL del archivo JSON

        try {
            const response = await axios.get(url);
            bannersJSON = response.data;
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
        let subdomain = detectSubdomain() == ""?"www":detectSubdomain();
        //let subdomain = "cl";

        let detectPage = bannersJSON.filter((e) => e.page == platform)[0];

        let allBanners;
        //if JSON have error charge default image
        try {
            allBanners = detectPage.banners.filter((d) => d.country == subdomain)[0].banners;
        } catch (error) {
            filteredBanners = bannerDefault;
        }

        filteredBanners = allBanners.filter( o => {
            const dateFrom = parseDate(o.dateFrom) || "";
            const dateUntil = parseDate(o.dateUntil) || "";
            return !(dateFrom < today && dateUntil < today);
        });

        if (filteredBanners.length == 0) { filteredBanners = bannerDefault; }
    }     

    getBanners();  
</script>

<div>
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

<style>
    .swiper-container__banners{
        width: 100%;
        height:100%;
        overflow: hidden;
    }
    .swiper-container__banners::after{
        content: "";
        position: absolute;
        height: 0;
        width: 100%;
        bottom: 62px;
        z-index: 1;
    }
    swiper-slide img{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>