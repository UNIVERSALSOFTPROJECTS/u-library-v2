import SocketConnector from './SocketConnector';
import ServerConnection from './server';
import EventManager from "./EventManager";
const UserHelper = (() => {
    const checkAndLoadUserLogged = async (conf) => {
        let user = null;
        let u = sessionStorage.getItem("user");
        if (u) {
            user = JSON.parse(u);
            let data;
            if (conf.CLIENT_CODE == 'JU02') {
                data = await ServerConnection.u_user.getBalance(user.agregatorToken);
                
            }
            else {
                data = await ServerConnection.users.getBalance(user.agregatorToken);
   
            }
            user.balance = data.data.balance;
            connectToLobbySocket(user, conf);
        }
        return user;
    };
    const checkAndLoadUserLoggedUniversalSoft = async (conf, onOpenNotification) => {
        let user = null;
        let u = sessionStorage.getItem("user");
        if (u) {
            user = JSON.parse(u);
            connectToLobbySocket(user, conf, (stompClient)=>{
                setSuscriptions(stompClient, onOpenNotification, user)
            });
        }
        if(user.type === "TERMINAL" && user.cashier){
            initSocketEvents(onOpenNotification, user.cashier)
        }
        return user;
    };
    const connectToLobbySocket = (user, conf, onConnected) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        SocketConnector.connectToLobbySocket(`${conf.CLIENT_CODE}-${user.username}-${serial}`, conf, onConnected);

         //conecta al websocket.
    };
   
    const initSocketEvents = (onOpenNotification, currentcashier)=>{
        EventManager.subscribe("CASHIER_DISCONNECT", ({cashier})=>{
            if(cashier == currentcashier){ 
                onOpenNotification("accessCashier")
            }
        })
         EventManager.subscribe("CASHIER_CONNECT", ({cashier})=>{
            if(cashier == currentcashier){
                onOpenNotification(null)
            }
        })
    }
    const setSuscriptions = (stompClient, onOpenNotification, user)=>{
        stompClient.subscribe('/user/queue/messages', (data) => {
                const msg = data.body;
               
                if (data.body == "NEW_SESSION_OPENED") {
                    console.log("NEW_SESSION_OPENED");
                    EventManager.publish("duplicated_session", {})
                } else if (/UPDATE_BALANCE/.test(msg)) {
                    EventManager.publish("update_balance", {newBalance: data.body})
                    //body	"CASHIER_CONNECT_cajero.default_true"
                }     
            });
            if(user.type === "TERMINAL" && user.cashier && typeof onOpenNotification === "function"){
                stompClient.subscribe('/topic/messages/cashier',(data)=>{
                    const msg = data.body;
                    if (/UPDATE_BALANCE/.test(msg)) {
                        EventManager.publish("update_balance", {newBalance: data.body})
                    }else if (msg.startsWith("CASHIER_CONNECT_")){
                        const [, , cashierName, status] = msg.split("_")
                        const isActive = status == "true"
                        EventManager.publish("CASHIER_CONNECT", {cashier: cashierName, active: isActive})

                    }else if (msg.startsWith("CASHIER_DISCONNECT_")){
                        const [, , cashierName, status] = msg.split("_")
                        const isDisconnect = status == "true"
                        EventManager.publish("CASHIER_CONNECT", {cashier: cashierName, disconnect: isDisconnect})
                    }
                });
            }
    }
    return {
        checkAndLoadUserLogged, connectToLobbySocket, checkAndLoadUserLoggedUniversalSoft
    }
})()

export default UserHelper