export const currentDate = () =>{
    return new Date().toISOString().split('T')[0];
}
export const firstDayOfMonth = () =>{
    const currentDate = new Date(); 
    currentDate.setDate(1); 
    return currentDate.toISOString().split('T')[0]; 
}
export const formatNumber = (number) => { //Cambiar nombre a "formatNumberToString"
    return number.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
export const stringToNumber = (string) => { //Cambiar nombre a "formatStringToNumber"
    return parseFloat(string.replace(/[^0-9.-]/g, ""));
}
export const detectSubdomain = () => {
    let hostname = window.location.hostname;
    let parts = hostname.split('.');
    let subdomain = parts.slice(0, -2).join('.');
    return subdomain;
}
export const detectDomain = () => {
    let hostname = window.location.hostname;
    let parts = hostname.split('.');
    let domain = parts.slice(-2).join('.');
    return domain;
}
export const detectIdiomPage = (idiom) => {
    let subdomain = detectSubdomain();
    if (subdomain == "www" || subdomain == "") subdomain = idiom;
    return subdomain;
}

// Funciones para manejar cookies compartidas entre subdominios
export const setSharedCookie = (name, value, days = 365) => {
    const domain = detectDomain(); // ej: "example.com"
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};domain=.${domain};path=/;SameSite=Lax`;
}

export const getSharedCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export const deleteSharedCookie = (name) => {
    const domain = detectDomain();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;domain=.${domain};path=/;`;
}