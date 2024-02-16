import { SocketConnector } from '..';
import ServerConnection from './server';

const UserHelper = (() => {

    const checkAndLoadUserLogged = async (conf) => {

        let user = null;
        const u = sessionStorage.getItem("user");
        if (u) {
            let user_ = JSON.parse(u);
            user = user_;
            let data = await ServerConnection.users.getBalance(user.agregatorToken);
            user.balance = data.balance;
            connectToSocket(user, conf);

        }
        return user;
    };

    const connectToSocket = (user, conf) => {
        console.log("CONGIH",conf);
        if (!conf.CLIENT_CODE) throw "CONF_CLIENT_CODE_NOT_FOUND";
        SocketConnector.connect(`${conf.CLIENT_CODE}-${user.username}`); //conecta al websocket.
    };






    return {
        checkAndLoadUserLogged, connectToSocket
    }
})()

export default UserHelper