import EventManager from "./EventManager";
import { Client } from '@stomp/stompjs';

const SocketConnector = (() => {

    let stompClient
    let stompClientCashier 
    let conf = {};


    function connectToLobbySocket(username, conf) {
        console.log(`Opening WS connection to LOBBYBFF`);
        stompClient = new Client({
            brokerURL: conf.WS_URL,
            connectHeaders: { username},
            debug: function (str) { /*console.log(str);*/ },
            reconnectDelay: 2500,
        });
        
        stompClient.onConnect = (frame) => {
            console.log("onConnect Socket success");
            stompClient.subscribe('/user/queue/messages', (data) => {
                const msg = data.body;
               
                if (data.body == "NEW_SESSION_OPENED") {
                    console.log("NEW_SESSION_OPENED");
                    EventManager.publish("duplicated_session", {})
                } else if (/UPDATE_BALANCE/.test(msg)) {
                    EventManager.publish("update_balance", {newBalance: data.body})
                    //body	"CASHIER_CONNECT_cajero.default_true"
                }else if (msg.startsWith("CASHIER_CONNECT_")){
                    const [, , cashierName, status] = msg.split("_")
                    const isActive = status == "true"
                    if(isActive){
                        EventManager.publish("CASHIER_CONNECT", {cashier: cashierName})
                    }else{
                        EventManager.publish("CASHIER_DISCONNECT", {cashier: cashierName})
                    }
                }      
            });
            stompClient.subscribe('/cashier/queue/messages', (data) => {
                const msg = data.body;
                if (/UPDATE_BALANCE/.test(msg)) {
                    EventManager.publish("update_balance", {newBalance: data.body})
                    //body	"CASHIER_CONNECT_cajero.default_true"
                }
            }); 
        };

        stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
            EventManager.publish("logout", {});
            EventManager.publish("error", { errorCode: "OIV9FABT2A", errorMessage: "Connection closed" });
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        stompClient.activate();

    }

     function connectToLobbySocketCashier(username, conf) {
        console.log(`Opening WS connection to LOBBYBFF`);
        stompClientCashier = new Client({
            brokerURL: conf.WS_URL,
            connectHeaders: { username},
            debug: function (str) { /*console.log(str);*/ },
            reconnectDelay: 2500,
        });
        
        stompClientCashier.onConnect = (frame) => {
            console.log("onConnect Socket Cashier success");
            stompClientCashier.subscribe('/cashier/queue/messages', (data) => {
                const msg = data.body;
                if (/UPDATE_BALANCE/.test(msg)) {
                    EventManager.publish("update_balance", {newBalance: data.body})
                    //body	"CASHIER_CONNECT_cajero.default_true"
                } else if (msg.startsWith("CASHIER_CONNECT_")){
                    const [, , cashierName, status] = msg.split("_")
                    const isActive = status == "true"
                    if(isActive){
                        EventManager.publish("CASHIER_CONNECT", {cashier: cashierName})
                    }else{
                        EventManager.publish("CASHIER_DISCONNECT", {cashier: cashierName})
                    }      
                }
            });
        };

        stompClientCashier.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
            EventManager.publish("logout", {});
            EventManager.publish("error", { errorCode: "OIV9FABT2A", errorMessage: "Connection closed" });
        };

        stompClientCashier.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        stompClientCashier.activate();

    }



    function setConfig(conf_) {
        conf = conf_;
    }

    function connect(user) {
        console.log(`Opening WS connection with ${conf.BALANCE_WS}/change-balance`)
        stompClient = new Client({
            brokerURL: conf.BALANCE_WS + '/change-balance',
            connectHeaders: {
                platformId: user.platformId,
                userId: user.id,
                currencyISO: user.currency,
                connectionId: user.token
            },
            debug: function (str) { console.log(str); },
            reconnectDelay: 2500,
        });

        stompClient.onConnect = (frame) => {
            stompClient.subscribe('/users/queue/balance', (data) => {
                console.log("gretting", JSON.parse(data.body));
                new Audio('https://d1dkqs4jlldj3s.cloudfront.net/audios/iphone-notificacion.mp3').play();
                EventManager.publish("changeBalance", JSON.parse(data.body))

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
        connect, setConfig, connectToLobbySocket, connectToLobbySocketCashier
    }

})()

export default SocketConnector