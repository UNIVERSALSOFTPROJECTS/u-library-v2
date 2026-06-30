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
            
            connectToLobbySocketXlive(user, conf);
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
   
    const connectToLobbySocketXlive = (user, conf) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        SocketConnector.connectToLobbySocketXlive(`${conf.CLIENT_CODE}-${user.username}-${serial}`, conf,user);
    };
    
    const checkDisconnectAll = ()=>{
        SocketConnector.disconnectAll();
    }
    return {
        checkAndLoadUserLogged, connectToLobbySocket, checkAndLoadUserLoggedUniversalSoft, checkDisconnectAll
    }
})()

export default UserHelper