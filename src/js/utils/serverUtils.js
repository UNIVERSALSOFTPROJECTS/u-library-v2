import ServerConnection from "../server";

export const getUpdateBalance = async(user) => {
    let updateBalance = await ServerConnection.users.getBalance(user.agregatorToken);
    const { balance, bonus_global, bonus_horses, bonus_slot, bonus_sportbook } = updateBalance.data;
    user.balance         = balance;
    user.bonus_global    = bonus_global;
    user.bonus_horses    = bonus_horses;
    user.bonus_slot      = bonus_slot;
    user.bonus_sportbook = bonus_sportbook; 
    user.bonus_sumTotal  = bonus_global + bonus_horses + bonus_slot + bonus_sportbook;
    sessionStorage.setItem("user", JSON.stringify(user));
}
