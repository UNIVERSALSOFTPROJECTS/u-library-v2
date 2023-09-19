import DepositCashier from '../src/lib/payments/DepositCashier.svelte';
import DepositBank from '../src/lib/payments/DepositBank.svelte';
import init from './init';
init.start();
//import ServerConnection from '../src/js/server'
//ServerConnection.setConfig({API:"https://lobby-bff.apiusoft.com",CLIENT_AUTH:"FORT2023FORTUNEUSOFFORTUNEBET12",CLIENT_CODE:"FORT"})

let user = { token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYWthbm9tYWxkaXRvMTIiLCJpYXQiOjE2OTUxMzcyNTIsImV4cCI6MTY5NTE0MDg1Mn0.NG2Lm7O11ZPELAd5IIx-xHphv-jTwi5OrXDWYVfLFPfQeNIpwK_v4FtEcYfUIUHS8UjKzDlZnr5SleXIVeHMIA", balance: 12.21 };
let assetsUrl = "https://assets.apiusoft.com";
let maxAmount = 6000;
let minAmount = 50;
export default {
  title: 'Deposits',
  component: DepositCashier,
};

const onOk = () => {
  alert('ok');
}
const onError = () => {
  alert('Error');
}

export const DepositCassh = () => ({
  Component: DepositCashier,
  props: { user, open: true, onOk, onError, assetsUrl, maxAmount, minAmount }
});

export const DepositBanK = () => ({
  Component: DepositBank,
  props: { user, open: true, onOk, onError }
});


