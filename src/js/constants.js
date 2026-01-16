import moment from 'moment'; // Importa moment si lo usarás en este archivo


// Exporta la función shouldShowBanner para que pueda ser utilizada en otros componentes
export function shouldShowBanner(banner) {
    const currentTime = moment(); // Fecha y hora actual
    // Si tiene fecha de inicio, verifica si ya ha pasado
    if (banner.startTime) {
        const startTime = moment(banner.startTime);
        if (currentTime.isBefore(startTime)) {
            return false; // No mostrar si aún no ha comenzado
        }
    }
    // Si tiene fecha de finalización, verifica si ya ha pasado
    if (banner.endTime) {
        const endTime = moment(banner.endTime);
        if (currentTime.isAfter(endTime)) {
            return false;
        }
    }
    return true;
}

export function calculateIntervals(carrusels) {
    const intervalBanner = {};
    const now = new Date();

    carrusels.data.forEach((banner, index) => {
        banner.items.forEach((item) => {

            const start = new Date(item.startTime);
            const end   = new Date(item.endTime);

            const isActive = now >= start && now <= end;

            if (isActive && item.timeInterval) {
                if (!intervalBanner[index]) intervalBanner[index] = [];
                intervalBanner[index].push(item.timeInterval * 1000);
            }
        });
    });

    return intervalBanner;
}

// USE THIS FUNCTION FOR CARRUSELS
export function startAutoplay(index, swiperInstances, intervalBanner) {
    const swiper = swiperInstances[index];
    const timers = intervalBanner[index] || [];

    if (!swiper || timers.length === 0) return;

    let currentBannerIndex = 0;
    function autoplayLoop() {
        const realIndex = swiper.swiper?.realIndex;
        const delay = timers[realIndex];

        setTimeout(() => {
            swiper?.swiper?.slideNext();
            
            // currentBannerIndex = (currentBannerIndex + 1) % timers.length;
            autoplayLoop();

        }, delay);
    }
    autoplayLoop();
    
}