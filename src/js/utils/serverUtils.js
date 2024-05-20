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
export const getUpdateBalanceUniversal = async (user) => {
    try {
        let updateBalance = await ServerConnection.u_user.getBalance(user.agregatorToken);
        console.log("updateBalance", updateBalance)
        const { balance, bonus_universal, bonus_horses, bonus_slot, bonus_sportbook, bonus_virtual, bonus_crash } = updateBalance.data;
        console.log(updateBalance.data);

        user.balance = formatNumber(balance);
        user.bonus_horses = formatNumber(bonus_horses||0);
        user.bonus_slot = formatNumber(bonus_slot || 0);
        user.bonus_sportbook = formatNumber(bonus_sportbook || 0);
        user.bonus_virtual = formatNumber(bonus_virtual || 0);
        user.bonus_universal = formatNumber(bonus_universal || 0);
        user.bonus_crash = formatNumber(bonus_crash || 0);
        user.bonus_sumTotal = formatNumber(
        );

        sessionStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
}

