import ConfirmCashIn from '../src/lib/payments/ConfirmCashIn.svelte';
import BankDeposit from '../src/lib/payments/BankDeposit.svelte';
import init from './init';
init.start();
//import ServerConnection from '../src/js/server'
//ServerConnection.setConfig({API:"https://lobby-bff.apiusoft.com",CLIENT_AUTH:"FORT2023FORTUNEUSOFFORTUNEBET12",CLIENT_CODE:"FORT"})

let user = { 
  playerId:'W-e9d847b4-5cc1-453a-9030-d51fe17a85fe',
  currency:'PEN',
  token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYWthbm9tYWxkaXRvMTIiLCJpYXQiOjE2OTUxMzcyNTIsImV4cCI6MTY5NTE0MDg1Mn0.NG2Lm7O11ZPELAd5IIx-xHphv-jTwi5OrXDWYVfLFPfQeNIpwK_v4FtEcYfUIUHS8UjKzDlZnr5SleXIVeHMIA", 
  balance: 12.21
};

let assetsUrl = "https://d1dkqs4jlldj3s.cloudfront.net";
let maxAmount = 6000;
let minAmount = 50;

export default {
  title: 'Deposits',
  component: ConfirmCashIn,
};

const onOk = () => {
  alert('ok');
}
const onError = () => {
  alert('Error');
}

export const DepositCassh = () => ({
  Component: ConfirmCashIn,
  props: { user, open: true, onOk, onError, assetsUrl, maxAmount, minAmount }
});

export const DepositBanK = () => ({
  Component: BankDeposit,
  props: { user, open: true, onOk, onError }
});


