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
            connectToLobbySocket(user, conf)
            initSocketEvents(onOpenNotification, user.cashier)
            console.log("onOpenNotification", onOpenNotification);
            
        }

        if(user.type === "TERMINAL" && user.cashier){
            connectToLobbySocketTerminal(user, conf)
            initSocketEvents(onOpenNotification, user.cashier)
        }

        if(user.type === "CASHIER"){
            connectToLobbySocketCashier(user, conf)
        }

        return user;
    };
    const connectToLobbySocket = (user, conf) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        SocketConnector.connectToLobbySocket(`${conf.CLIENT_CODE}-${user.username}-${serial}`, conf, user.cashier);
        //conecta al websocket.
    };
   
    const connectToLobbySocketCashier = (user, conf) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        SocketConnector.connectToLobbySocketCashier(`${conf.CLIENT_CODE}-${user.username}-${serial}`,null, conf);
    };
    const connectToLobbySocketTerminal = (user, conf) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        SocketConnector.connectToLobbySocketCashier(`${conf.CLIENT_CODE}-${user.username}-${serial}`, `${conf.CLIENT_CODE}-${user.cashier}-${user.serialCashier}`, conf);
    };
    const initSocketEvents = (onOpenNotification, currentcashier)=>{
        console.log("entrando a initsockets--------currentcashier", currentcashier);
        EventManager.subscribe("CASHIER_DISCONNECTED", ({cashier})=>{
            if(cashier == currentcashier){ 
                onOpenNotification("accessCashier")
                console.log("CASHIER DESCONECTADO", cashier);
                
            }
        })
         EventManager.subscribe("CASHIER_CONNECTED", ({cashier})=>{
            if(cashier == currentcashier){
                onOpenNotification(null)
                console.log("CASHIER CONECTADO", cashier);
            }
        })
    }
    
    return {
        checkAndLoadUserLogged, connectToLobbySocket, checkAndLoadUserLoggedUniversalSoft
    }
})()

export default UserHelper