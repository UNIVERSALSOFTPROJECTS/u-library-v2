export const assetsUrl = "https://assets-usoft.universalsoft.net/";
export const assetsPayments = "https://assets-usoft.universalsoft.net/generic_imgs/payments/";
export const assetsFlags = "https://assets-usoft.universalsoft.net/generic_imgs/flags/";
export const assetsFooter = "https://assets-usoft.universalsoft.net/generic_imgs/footer/";
export const assetsProviders = "https://assets-usoft.universalsoft.net/generic_imgs/providers/";
export const assetsProvidersTop = "https://assets-usoft.universalsoft.net/generic_imgs/providers/top/";
export const assetsBrands = "https://assets-usoft.universalsoft.net/us_img_brands/";
export const assetsPDF = (platform,route) =>{
    let url = assetsUrl+platform+"/"+route+"/pdf";
    return url;
}