import ServerConnection from '../src/js/server'



export default{
    start:()=>{
        ServerConnection.setConfig({
            API:"https://lobby-bff.apiusoft.com",
            GAMEAPI_URL:"https://apiuniversalsoft.com/api",
            API:"https://lobby-bff.apiusoft.com",
            CLIENT_AUTH:"A12D3853C2C0A95F6C4HIPICASBABIEC",
            CLIENT_CODE:"A12D",
            LOBBY_GAMES_API:"https://lobby.apiusoft.com",
            ASSETS:"https://d2zzz5z45zl95g.cloudfront.net",
            WS_URL:"wss://lobby-bff-test.apiusoft.com/lobbybff",
            ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
            country:"+54",
            operatorId:"123",
            domain:"https://hipicasbabieca.net/",
            assetsUrl:"https://assets.apiusoft.com",
            org:"BBC",
            currency:8,//ARS
        })
    }
}
//export default{
//    start:()=>{
//        ServerConnection.setConfig({
//            API:"https://lobby-bff.apiusoft.com",
//            GAMEAPI_URL:"https://apiuniversalsoft.com/api",
//            API:"https://lobby-bff.apiusoft.com",
//            //CLIENT_AUTH:"A12D3853C2C0A95F6C4HIPICASBABIEC",
//            //CLIENT_CODE:"A12D",
//            CLIENT_AUTH:"GOLD21GOLDENBET4A19028GOLDENBET1",
//            CLIENT_CODE:"GOLD",
//            LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//            ASSETS:"https://d2zzz5z45zl95g.cloudfront.net",
//            WS_URL:"wss://lobby-bff-test.apiusoft.com/lobbybff",
//            ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
//            country:"+51",
//            operatorId:"123",
//            domain:"https://goldenbet.com.pe/",
//            assetsUrl:"https://assets.apiusoft.com",
//            org:"GB",
//            currency:9,//PEN
//        })
//    }
//}