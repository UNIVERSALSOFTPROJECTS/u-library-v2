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