import { SocketConnector } from '..';
import backend from './server';

const UserHelper = (() => {

    const checkAndLoadUserLogged = async(conf) => {
        
        let user = null;
        const u = sessionStorage.getItem("user");
        if (u) {
            let user_ = JSON.parse(u);
            user = user_;
            //let usertoken = user.token;
            //let agregatorToken = user.agregatorToken;
            //let userState = "loggedIn";
            //getFavGames();
            let data = await backend.getBalance(user.agregatorToken);
            user.balance = data.balance;
            connectToSocket(conf);

        }
        return user;
    };
    
    const connectToSocket = (user, conf)=>{
        if (!conf.CLIENTCODE) throw "CONF_CLIENTCODE_NOT_FOUND";
        SocketConnector.connect(`${conf.CLIENTCODE}-${user.username}`); //conecta al websocket.
    };





    
    return {
        checkAndLoadUserLogged,
    }
})()

export default UserHelper