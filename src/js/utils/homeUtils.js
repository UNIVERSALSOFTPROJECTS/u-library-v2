//just test
import { getUpdateBalance } from "./serverUtils";
//import modalUtils from "./modalsUtils";

export const updateTimeSession = async() =>{
    console.log("hola");
    let user = JSON.parse(sessionStorage.getItem("user"))
    return new Promise((resolve) => {
        setTimeout( async() => {
            let oldBalance = JSON.parse(sessionStorage.getItem("user")).balance;
            await getUpdateBalance(user);
            let newBalance = JSON.parse(sessionStorage.getItem("user")).balance;
            resolve (oldBalance == newBalance? "modal" : "updateTime");
        }, 5000);
    });
}