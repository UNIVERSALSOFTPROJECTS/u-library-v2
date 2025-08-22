export const assetsUrl = "https://d1dkqs4jlldj3s.cloudfront.net/";
export const assetsPayments = "https://d1dkqs4jlldj3s.cloudfront.net/generic_imgs/payments/";
export const assetsFlags = "https://d1dkqs4jlldj3s.cloudfront.net/generic_imgs/flags/";
export const assetsFooter = "https://d1dkqs4jlldj3s.cloudfront.net/generic_imgs/footer/";
export const assetsProviders = "https://d1dkqs4jlldj3s.cloudfront.net/generic_imgs/providers/";
export const assetsProvidersTop = "https://d1dkqs4jlldj3s.cloudfront.net/generic_imgs/providers/top/";
export const assetsBrands = "https://d1dkqs4jlldj3s.cloudfront.net/us_img_brands/";
export const assetsPDF = (platform,route) =>{
    let url = assetsUrl+platform+"/"+route+"/pdf";
    return url;
}