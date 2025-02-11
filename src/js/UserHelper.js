import SocketConnector from './SocketConnector';
import ServerConnection from './server';

const UserHelper = (() => {

    const checkAndLoadUserLogged = async (conf) => {
        let user = null;
        const u = sessionStorage.getItem("user");
        console.log("USER", u);
        if (u) {
            let user_ = JSON.parse(u);
            console.log("userLooged======>", user_);
            user = user_;
            let data;
            if (conf.CLIENT_CODE == 'JU02') {
                data = await ServerConnection.u_user.getBalance(user.agregatorToken);
            }
            else {
                data = await ServerConnection.users.getBalance(user.agregatorToken);
            }
            console.log("userLooged CONF antes del websocket1 =============>", user);

            user.balance = data.data.balance;
            console.log("userLooged CONF antes del websocket=============>", conf);
            connectToLobbySocket(user, conf);
        }
        console.log("user", user);
        return user;
    };

    const connectToLobbySocket = (user, conf) => {
        console.log("CONGIH============>", conf, user);
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        SocketConnector.connectToLobbySocket(`${conf.CLIENT_CODE}-${user.username}-${user.serial}`, conf); //conecta al websocket.
    };


    return {
        checkAndLoadUserLogged, connectToLobbySocket
    }
})()

export default UserHelper