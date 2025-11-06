import SocketConnector from './SocketConnector';
import ServerConnection from './server';

const UserHelper = (() => {
    const checkAndLoadUserLogged = async (conf) => {
        let user = null;
        const u = sessionStorage.getItem("user");
        if (u) {
            let user_ = JSON.parse(u);
            user = user_;
            let data;
            if (conf.CLIENT_CODE == 'JU02') {
                data = await ServerConnection.u_user.getBalance(user.agregatorToken);
                user.balance = data.data.balance;
            }
                //data = await ServerConnection.users.getBalance(user.agregatorToken);
            connectToLobbySocket(user, conf);
            
        }
        return user;
    };
    const connectToLobbySocket = (user, conf) => {
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        const serial = user.serial || user.aggregator_token?.slice(0,13);
        SocketConnector.connectToLobbySocket(`${conf.CLIENT_CODE}-${user.username}-${serial}`, conf); //conecta al websocket.
    };
    return {
        checkAndLoadUserLogged, connectToLobbySocket
    }
})()

export default UserHelper