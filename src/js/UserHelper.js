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
            
            if(user.type == "TERMINAL" && user.cashier){
                connectToLobbySocketTerminal(user, conf, onOpenNotification)
            }else {
                connectToLobbySocket(user, conf)
            }

            if(user.type == "TERMINAL" && user.cashier){
                connectToLobbySocketTerminal2(user, conf)
            }

            if(user.type == "CASHIER"){
                connectToLobbySocketCashier(user, conf)
            }
        }
        
        return user;
    };
    const connectToLobbySocket = (user, conf) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        SocketConnector.connectToLobbySocket(`${conf.CLIENT_CODE}-${user.username}-${serial}`, conf, user.cashier);
        //conecta al websocket.
    };
    const connectToLobbySocketTerminal = (user, conf, onOpenNotification) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        SocketConnector.connectToLobbySocket(`${conf.CLIENT_CODE}-${user.username}-${serial}`, conf, user.cashier, onOpenNotification);
        //conecta al websocket.
    };
   
    const connectToLobbySocketCashier = (user, conf) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        SocketConnector.connectToLobbySocketCashier(`${conf.CLIENT_CODE}-${user.username}-${serial}`,null, conf);
    };
    const connectToLobbySocketTerminal2 = (user, conf) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        SocketConnector.connectToLobbySocketCashier(`${conf.CLIENT_CODE}-${user.username}-${serial}`, `${conf.CLIENT_CODE}-${user.cashier}-${user.serialCashier}`, conf);
    };
    
    return {
        checkAndLoadUserLogged, connectToLobbySocket, checkAndLoadUserLoggedUniversalSoft
    }
})()

export default UserHelper