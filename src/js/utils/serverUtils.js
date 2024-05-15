import ServerConnection from "../server";
import { formatNumber } from "./formatUtils";

export const getUpdateBalance = async (user) => {
    let updateBalance = await ServerConnection.users.getBalance(user.agregatorToken);
    const { balance, bonus_global, bonus_horses, bonus_slot, bonus_sportbook } = updateBalance.data;
    user.balance         = formatNumber(balance);
    user.bonus_global    = formatNumber(bonus_global);
    user.bonus_horses    = formatNumber(bonus_horses);
    user.bonus_slot      = formatNumber(bonus_slot);
    user.bonus_sportbook = formatNumber(bonus_sportbook); 
    user.bonus_sumTotal  = formatNumber(bonus_global + bonus_horses + bonus_slot + bonus_sportbook);
    sessionStorage.setItem("user", JSON.stringify(user));
}
