import CashOut from '../src/lib/withdrawal/CashOut.svelte';
import WithdrawalBank  from '../src/lib/withdrawal/WithdrawalBank.svelte';
import init from './init';
init.start();
let minAmount = 50;
let maxAmount = 2000;
let pendingWhitdrawall=null
let user = {currencyISO:"PEN",platformId:"58dc8282-ab26-4e2d-9235-be4a3e2be91d",trxType:"WITHDRAW",currency:"PEN",playerId:'W-8ec54a8e-6f93-4ef5-83c2-3a37cd94f2b9',token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYWthbm9tYWxkaXRvMTIiLCJpYXQiOjE2OTQxMzEzMDIsImV4cCI6MTY5NDEzNDkwMn0.WyWCHWfLa2jvQmyiztdEmGjRqYa6Ka1H66ET20TIetQtJ3gulUgWfP_YdLlUEgi2t2Y6b_hsUrHWRXajdErTLA"} ;

export default {
  title: 'Withdrawals',
  component: WithdrawalBank, 
};

const onOK=()=>{
  alert('ok');
}
const onError=()=>{
  alert('Error');
}

export const withdrawalbank = () => ({
  Component: WithdrawalBank,
  props: { user, open:true, minAmount, maxAmount,onOK,onError}
});

export const withdrawalcashier = () => ({
  Component: CashOut,
  props: { user, open: true, pendingWhitdrawall, minAmount, maxAmount, onOK, onError }
});






