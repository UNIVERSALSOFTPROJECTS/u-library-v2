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
    function connectToLobbySocketXlive(username, conf,user) {
        console.log(`Opening WS connection to LOBBYBFF`);
        let headersSocket = {};
        if(user.type == 'TERMINAL'){
            headersSocket = { username,type:user.type, cashierId:`${conf.CLIENT_CODE}-${user.cashier}-${user.serialCashier}` ,brokerURL: conf.WS_URL}
        }else{
            headersSocket = { username,type:user.type ,cashierId:null,brokerURL: conf.WS_URL}
        }
        stompClientCashier = new Client({
            brokerURL: conf.WS_URL,
            connectHeaders: {...headersSocket} ,
            debug: function (str) { /*console.log(str);*/ },
            reconnectDelay: 2500,
        });
        
        stompClientCashier.onConnect = (frame) => {
            console.log("onConnect Socket success");
            stompClientCashier.subscribe('/user/queue/messages', (data) => {
                const msg = data.body;
            });
            if(user.type == 'TERMINAL'){
                stompClientCashier.subscribe(
                    "/topic/cashier/" + `${conf.CLIENT_CODE}-${user.cashier}-${user.serialCashier}`,
                    message => {
                        console.log("-> message event cashier 1 ",typeof message.body);
                        // message.body = {"event":"ONLINE","cashierId":"XLIV-cajero.jordi-5870722006786"}
                        let event_data = JSON.parse(message.body);
                        console.log("-> event ",event_data.event);
                        if(event_data.event == "ONLINE") EventManager.publish("CASHIER_CONNECT", {cashierName: event_data.cashierId.split('-')[1] })
                        else if(event_data.event == "OFFLINE") EventManager.publish("CASHIER_DISCONNECTED", {cashierName: event_data.cashierId.split('-')[1] })
                    }
                );
                stompClientCashier.subscribe(
                    "/user/queue/status",
                    message => {
                        console.log("-> message event cashier",message.body);
                    }
                );
                stompClientCashier.publish({
                    destination: "/app/terminal/ready",
                    body: JSON.stringify({
                        cashierId:`${conf.CLIENT_CODE}-${user.cashier}-${user.serialCashier}`
                    })
                });
            }
            
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
                new Audio('https://assets-usoft.universalsoft.net/audios/iphone-notificacion.mp3').play();
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
        connect, disconnectAll, setConfig, connectToLobbySocket, connectToLobbySocketXlive
    }

})()

export default SocketConnector