import SocketConnector from './SocketConnector';
import ServerConnection from './server';
console.log("userHelper");

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
            }
            else {
                data = await ServerConnection.users.getBalance(user.agregatorToken);
            }
            user.balance = data.data.balance;
            //console.log("userLooged CONF", conf);
            connectToLobbySocket(user, conf);

        }
        return user;
    };

    const connectToLobbySocket = (user, conf) => {
        console.log("UserHelper-conf? ", conf);
        console.log("CONGIH", conf);
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        SocketConnector.connectToLobbySocket(`${conf.CLIENT_CODE}-${user.username}-${user.serial}`, conf); //conecta al websocket.
    };


    return {
        checkAndLoadUserLogged, connectToLobbySocket
    }
})()

export default UserHelper