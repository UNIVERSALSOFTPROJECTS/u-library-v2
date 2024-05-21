export const assetsUrl = "https://assets.apiusoft.com/";
export const assetsPayments = "https://assets.apiusoft.com/generic_imgs/payments/";
export const assetsFlags = "https://assets.apiusoft.com/generic_imgs/flags/";
export const assetsFooter = "https://assets.apiusoft.com/generic_imgs/footer/";
export const assetsProviders = "https://assets.apiusoft.com/generic_imgs/providers/";
export const assetsProvidersTop = "https://assets.apiusoft.com/generic_imgs/providers/top/";
export const assetsPDF = (platform,route) =>{
    let url = assetsUrl+platform+"/"+route+"/pdf";
    return url;
}