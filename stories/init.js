
import ServerConnection from '../src/js/server'
import SocketConnector from '../src/js/SocketConnector'

/*export default{
    start:()=>{
        ServerConnection.setConfig({
            API:"https://lobby-bff-test.apiusoft.com",
            API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
            GAMEAPI_URL:"https://apiuniversalsoft.com/api",
            CLIENT_AUTH:"JU02TOMCAT00023423JAVA009DEMOPLATFORM123",
            CLIENT_CODE:"JU02",
            LOBBY_GAMES_API:"https://lobby.apiusoft.com",
            platformId: "58dc8282-ab26-4e2d-9235-be4a3e2be91d",
            ASSETS:"https://assets.apiusoft.com",
            WS_URL:"wss://lobby-bff-test.apiusoft.com/lobbybff",
            ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
            country:"+56",
            operatorId:"123",
            domain:"http://coliseosport.com/",
            assetsUrl:"https://assets.apiusoft.com",
            org:"CLS",
            currency:7,//CLP
            platform:"bo_fontend"
        })
    }
}*/

//export default{
//    start:()=>{
//        ServerConnection.setConfig({
//            API:"https://lobby-bff.apiusoft.com",
// API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
//            GAMEAPI_URL:"https://apiuniversalsoft.com/api",
//            CLIENT_AUTH:"GAWNGANAWIN2024GANA20GANAWIN2024WINGWIN",
//            CLIENT_CODE:"GAWN",
//            LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//            ASSETS:"https://assets.apiusoft.com",
//            WS_URL:"wss://lobby-bff.apiusoft.com/lobbybff",
//            ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
//            country:"+56",
//            operatorId:"123",
//            domain:"http://ganawin.mx/",
//            assetsUrl:"https://assets.apiusoft.com",
//            org:"GWN",
//            currency:7,//CLP
//            //platform:"bo_fontend"
//        })
//    }
//}

//export default{
//    start:()=>{
//        ServerConnection.setConfig({
//            API:"https://lobby-bff.apiusoft.com",
// API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
//            GAMEAPI_URL:"https://apiuniversalsoft.com/api",
//            CLIENT_AUTH:"A12D3853C2C0A95F6C4HIPICASBABIEC",
//            CLIENT_CODE:"A12D",
//            LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//            ASSETS:"https://assets.apiusoft.com",
//            WS_URL:"wss://lobby-bff-test.apiusoft.com/lobbybff",
//            ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
//            country:"+54",
//            operatorId:"123",
//            domain:"https://hipicasbabieca.net/",
//            assetsUrl:"https://assets.apiusoft.com",
//            org:"BBC",
//            currency:8,//ARS
//        })
//    }
//}
//export default{
//    start:()=>{
//        ServerConnection.setConfig({
//            API:"https://lobby-bff.apiusoft.com",
// API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
//            GAMEAPI_URL:"https://apiuniversalsoft.com/api",
//            CLIENT_AUTH:"GOLD21GOLDENBET4A19028GOLDENBET1",
//            CLIENT_CODE:"GOLD",
//            LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//            ASSETS:"https://assets.apiusoft.com",
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
//


// export default{
//     start:()=>{
//         ServerConnection.setConfig({
//             platformId:'58dc8282-ab26-4e2d-9235-be4a3e2be91d',
//             API:"https://lobby-bff.apiusoft.com",
// API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
//             GAMEAPI_URL:"https://apiuniversalsoft.com/api",
//             CLIENT_AUTH:"ADPNAPUESTADEPANA9APUESTADEPANA92023",
//             CLIENT_CODE:"ADPN",
//             LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//             ASSETS:"https://assets.apiusoft.com",
//             WS_URL:"wss://lobby-bff-test.apiusoft.com/lobbybff",
//             ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
//             country:"+56",
//             operatorId:"123",
//             domain:"https://apuestadepana.com/",
//             assetsUrl:"https://assets.apiusoft.com",
//             org:"ADP",
//             currency:7,//PEN
//         })
//     }
// }

//export default{
//    start:()=>{
//        ServerConnection.setConfig({
//            API:"https://lobby-bff.apiusoft.com",
// API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
//            GAMEAPI_URL:"https://apiuniversalsoft.com/api",
//            CLIENT_AUTH:"ADPNAPUESTADEPANA9APUESTADEPANA92023",
//            CLIENT_CODE:"ADPN",
//            LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//            ASSETS:"https://assets.apiusoft.com",
//            WS_URL:"ws://localhost:5000",
//            ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
//            country:"+56",
//            operatorId:"123",
//            domain:"https://apuestadepana.com/",
//            assetsUrl:"https://assets.apiusoft.com",
//            org:"ADP",
//            currency:7,//PEN
//        })
//    },
//    startSocket:()=>{
//        SocketConnector.setConfig({
//            WS_URL:"ws://localhost:5000",
//        })
//    }
//}


//export default{
//    start:()=>{
//        ServerConnection.setConfig({
//            API:"https://lobby-bff.apiusoft.com",
// API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
//            GAMEAPI_URL:"https://apiuniversalsoft.com/api",
//            CLIENT_AUTH:"DRVY23SUPERDERVY423SUPERDERVY",
//            CLIENT_CODE:"DRVY",
//            LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//            ASSETS:"https://assets.apiusoft.com",
//            WS_URL:"wss://lobby-bff-test.apiusoft.com/lobbybff",
//            ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
//            country:"+51",
//            operatorId:"123",
//            domain:"https://goldenbet.com.pe/",
//            assetsUrl:"https://assets.apiusoft.com",
//            org:"DRB",
//            currency:9,//PEN
//        })
//    }
//}
// export default{
//    start:()=>{
//       ServerConnection.setConfig({
//            API:"https://lobby-bff.apiusoft.com",
// API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
//            GAMEAPI_URL:"https://apiuniversalsoft.com/api",
//            CLIENT_AUTH:"086C6928CB443C361BC72F05JETBET24086C",
//            CLIENT_CODE:"086C",
//            platformId:'58dc8282-ab26-4e2d-9235-be4a3e2be91d',
//            LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//            ASSETS:"https://assets.apiusoft.com",
//            WS_URL:"wss://lobby-bff.apiusoft.com/lobbybff",
//            ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
//            country:"+214",
//            operatorId:"123",
//            domain:"https://jetbet24.co/",
//            assetsUrl:"https://assets.apiusoft.com",
//            org:"J24",
//            //currency:9,//PEN
//       })
//    },
//    startSocket:()=>{
//        SocketConnector.setConfig({
//            WS_URL:"ws://localhost:5000",
//        })
//    }
// }

// export default{ //recuerda el  API_GAMES_NODE: "https://prod-nd.apiusoft.com", pra los demas
//    start:()=>{
//       ServerConnection.setConfig({
//            API:"https://lobby-bff.apiusoft.com",
//            API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
//            API_KS_AUTH: "https://srv-prod-ks.apiusoft.com/lobby-bff-auth",
//            GAMEAPI_URL:"https://apiuniversalsoft.com/api",
//         //    CLIENT_AUTH:"DJTHDAJARTCHGAMES7DARAJATECHGAMES7123",
//         //    CLIENT_CODE:"DJTH",
//            CLIENT_AUTH:"LATILATINSPORT213073LS212023USOFT",
//            CLIENT_CODE:"LATI",
//            CLIENT_ID: "21",
//            LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//            API_GAMES_NODE: "https://prod-nd.apiusoft.com",
//            ASSETS:"https://assets.apiusoft.com",
//            WS_URL:"wss://lobby-bff.apiusoft.com/lobbybff",
//            ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
//            country:"+56",
//            operatorId:"123",
//            domain:"http://coliseosport.com/",
//            assetsUrl:"https://assets.apiusoft.com",
//         //    org:"DJTH",
//            org:"L21",
//            //currency:9,//PEN
//       })
//    },
//    startSocket:()=>{
//        SocketConnector.setConfig({
//            WS_URL:"ws://localhost:5000",
//        })
//    }
// }

export default{ //recuerda el  API_GAMES_NODE: "https://prod-nd.apiusoft.com", pra los demas
    start:()=>{
       ServerConnection.setConfig({
            API:"https://lobby-bff.apiusoft.com",
            API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
            API_KS_AUTH: "https://srv-prod-ks.apiusoft.com/lobby-bff-auth",
            GAMEAPI_URL:"https://apiuniversalsoft.com/api",
            CLIENT_AUTH:"URCOUNIVERSALRCOLUNIVERSALRACECOLOMBIA123",
            CLIENT_CODE:"URCO",
            CLIENT_ID: "159",
            LOBBY_GAMES_API:"https://lobby.apiusoft.com",
            API_GAMES_NODE: "https://prod-nd.apiusoft.com",
            ASSETS:"https://assets.apiusoft.com",
            WS_URL:"wss://lobby-bff.apiusoft.com/lobbybff",
            ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
            country:"+56",
            operatorId:"123",
            domain:"http://co.universalrace.net",
            assetsUrl:"https://assets.apiusoft.com",
            org:"URCO",
            currency:9,//PEN
       })
    },
    startSocket:()=>{
        SocketConnector.setConfig({
            WS_URL:"ws://localhost:5000",
        })
    }
 }



// export default{ //recuerda el  API_GAMES_NODE: "https://prod-nd.apiusoft.com", pra los demas
//     start:()=>{
//        ServerConnection.setConfig({
//             API:"https://lobby-bff.apiusoft.com",
//             API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
//             API_KS_AUTH: "https://srv-prod-ks.apiusoft.com/lobby-bff-auth",
//             GAMEAPI_URL:"https://apiuniversalsoft.com/api",
//             CLIENT_AUTH:"CRSH77CRASHGAMES777CRASHGAMESCRSH",
//             CLIENT_CODE:"CRSH",
//             CLIENT_ID: "159",
//             LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//             API_GAMES_NODE: "https://prod-nd.apiusoft.com",
//             ASSETS:"https://assets.apiusoft.com",
//             WS_URL:"wss://lobby-bff.apiusoft.com/lobbybff",
//             ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
//             country:"+56",
//             operatorId:"123",
//             domain:"http://co.universalrace.net",
//             assetsUrl:"https://assets.apiusoft.com",
//             org:"CRG",
//             currency:9,//PEN
//        })
//     },
//     startSocket:()=>{
//         SocketConnector.setConfig({
//             WS_URL:"ws://localhost:5000",
//         })
//     }
//  }

// export default{ //recuerda el  API_GAMES_NODE: "https://prod-nd.apiusoft.com", pra los demas
//     start:()=>{
//        ServerConnection.setConfig({
//             API:"https://lobby-bff.apiusoft.com",
// API_KS: "https://srv-prod-ks.apiusoft.com/lobby-bff",
//             GAMEAPI_URL:"https://apiuniversalsoft.com/api",
//             CLIENT_AUTH:"50DA9A125986F573C0EUNIVERSALRACE123",
//             CLIENT_CODE:"50DA",
//             CLIENT_ID: "11",
//             LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//             API_GAMES_NODE: "https://prod-nd.apiusoft.com",
//             ASSETS:"https://assets.apiusoft.com",
//             WS_URL:"wss://lobby-bff.apiusoft.com/lobbybff",
//             ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
//             country:"+56",
//             operatorId:"123",
//             domain:"http://coliseosport.com/",
//             assetsUrl:"https://assets.apiusoft.com",
//             org:"",
//             //currency:9,//PEN
//        })
//     },
//     startSocket:()=>{
//         SocketConnector.setConfig({
//             WS_URL:"ws://localhost:5000",
//         })
//     }
//  }

// export default{
//     start:()=>{
//         ServerConnection.setConfig({
//         platformId:'58dc8282-ab26-4e2d-9235-be4a3e2be91d',
//         API:"https://lobby-bff-test.apiusoft.com",
//         GAMEAPI_URL:"https://test.apiuniversalsoft.com/api",
//         CLIENT_AUTH:"JU02TOMCAT00023423JAVA009DEMOPLATFORM123",
//         CLIENT_CODE:"JU02",
//         LOBBY_GAMES_API:"https://lobby.apiusoft.com",
//             ASSETS:"https://assets.apiusoft.com",
//         // WS_URL: "wss://lobby-bff-test.apiusoft.com/lobbybff",
//             WS_URL:"ws://192.168.1.95/lobbybff",
//             ASSETS_GLOBAL:"https://assets.apiusoft.com/generic_imgs",
//             country:"+56",
//             operatorId:"123",
//             domain:"https://apuestadepana.com/",
//             assetsUrl:"https://assets.apiusoft.com",
//             org:"CLS",
//             currency:7,//PEN
//         })
//     }
// }
