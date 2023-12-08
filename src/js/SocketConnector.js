import EventManager from "./EventManager";
//import { Client } from '@stomp/stompjs';

const SocketConnector = (() => {

    let stompClient
    let conf ={};

    function setConfig(conf_){
        conf = conf_;
    }
       
    function connect(user){
       console.log(`Opening WS connection with   ${conf.BALANCE_WS}/change-balance`)

            stompClient = new Client({
                    brokerURL:conf.BALANCE_WS+'/change-balance',
                    connectHeaders: {
                         platformId: user.platformId,
                         userId: user.id,
                         currencyISO:user.currency,
                         connectionId:user.token
                    },
                    debug: function (str) {console.log(str);},
                    reconnectDelay: 2500,
            });

        stompClient.onConnect = (frame) => {
            stompClient.subscribe('/users/queue/balance', (data) => {
                    console.log("gretting",JSON.parse(data.body));
                    new Audio('https://assetsapiusoft.s3.us-west-2.amazonaws.com/audios/iphone-notificacion.mp3').play();
                    EventManager.publish("changeBalance",JSON.parse(data.body) )

            });
        };

        stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        stompClient.activate();
    }

    return {
        connect,setConfig
    }

})()

export default SocketConnector