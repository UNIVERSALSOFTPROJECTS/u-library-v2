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
            connectToLobbySocket(user, conf);
        }
        if(user.type === "TERMINAL" && user.cashier){
            connectToLobbySocketCashier(user, conf);
            initSocketEvents(onOpenNotification, user.cashier)
        }

        if(user.type === "CASHIER"){
            connectToLobbySocketCashier(user, conf);
            initSocketEvents(onOpenNotification, user.cashier)
        }
        return user;
    };
    const connectToLobbySocket = (user, conf) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        SocketConnector.connectToLobbySocket(`${conf.CLIENT_CODE}-${user.username}-${serial}`, conf); //conecta al websocket.
    };
    const connectToLobbySocketCashier = (user, conf) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        let cashierId
        if (user.type === "CASHIER") {
            cashierId = user.username; // el cajero es dueño del canal
        } else if (user.type === "TERMINAL") {
            cashierId = user.cashier; // la terminal se conecta al canal de su cajero
        } 
        SocketConnector.connectToLobbySocketCashier(`${conf.CLIENT_CODE}-${cashierId}-cashier`, conf); //conecta al websocket.
    };
    //body	"CASHIER_CONNECT_cajero.default_true"
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
    return {
        checkAndLoadUserLogged, connectToLobbySocket, checkAndLoadUserLoggedUniversalSoft, connectToLobbySocketCashier
    }
})()

export default UserHelper