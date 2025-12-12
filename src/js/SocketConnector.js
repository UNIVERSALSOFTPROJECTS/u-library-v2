import EventManager from "./EventManager";
import { Client } from '@stomp/stompjs';

const SocketConnector = (() => {

    let stompClient;
    let stompClientCashier;
    let conf = {};


    function connectToLobbySocket(username, conf, cashierName, onOpenNotification) {
        console.log(`Opening WS connection to LOBBYBFF`);
        stompClient = new Client({
            brokerURL: conf.WS_URL,
            connectHeaders: { username, brokerURL: conf.WS_URL},
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
                }else if (data.body == "CASHIER_CONNECTED"){
                    EventManager.publish("CASHIER_CONNECT", {cashierName: cashierName})
                    onOpenNotification(null)
                }else if (data.body == "CASHIER_DISCONNECTED"){
                    EventManager.publish("CASHIER_DISCONNECTED", {cashierName: cashierName})
                    onOpenNotification("accessCashier")
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
    function connectToLobbySocketCashier(username, cashier, conf) {
        console.log(`Opening WS connection to LOBBYBFF`);
        let headersSocket = {};
        if(cashier!=null){
            headersSocket = { username, cashier ,brokerURL: conf.WS_URL2}
        }else{
            headersSocket = { username ,brokerURL: conf.WS_URL2}
        }
        stompClientCashier = new Client({
            brokerURL: conf.WS_URL2,
            connectHeaders: {...headersSocket} ,
            debug: function (str) { /*console.log(str);*/ },
            reconnectDelay: 2500,
        });
        
        stompClientCashier.onConnect = (frame) => {
            console.log("onConnect Socket success");
            stompClientCashier.subscribe('/user/queue/messages', (data) => {
                const msg = data.body;
                // if (msg.startsWith("CASHIER_CONNECT_")){
                //     const [, , cashierName, status] = msg.split("_")
                //     const isActive = status == "true"
                //     EventManager.publish("CASHIER_CONNECT", {cashier: cashierName, active: isActive})
                    
                // }else if (msg.startsWith("CASHIER_DISCONNECT_")){
                //     const [, , cashierName, status] = msg.split("_")
                //     const isDisconnect = status == "true"
                //     EventManager.publish("CASHIER_CONNECT", {cashier: cashierName, disconnect: isDisconnect})
                // }
                  
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
    function disconnectAll() {
        try {
            if (stompClient) {
                console.log("Disconnecting main socket...");
                stompClient.deactivate();
                stompClient = null;
            }
        } catch (e) {
            console.warn("Error disconnecting stompClient", e);
        }
        try {
            if (stompClientCashier) {
                console.log("Disconnecting cashier socket...");
                stompClientCashier.deactivate();
                stompClientCashier = null;
            }
        } catch (e) {
            console.warn("Error disconnecting stompClientCashier", e);
        }
    }


    return {
        connect, disconnectAll, setConfig, connectToLobbySocket, connectToLobbySocketCashier
    }

})()

export default SocketConnector