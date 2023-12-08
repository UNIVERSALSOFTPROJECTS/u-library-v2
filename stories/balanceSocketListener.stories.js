import BalanceSocketListener from '../src/lib/BalanceSocketListener.svelte';
import init from './init';
init.startSocket();

let user={
    platformId:"58dc8282-ab26-4e2d-9235-be4a3e2be91d",
    userId:"X-8f64a0a8-be87-434d-af64-5b8cd9e6de9c",
    currencyISO:"PEN",
    token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1cmlhcnRleDIwMjM2NTQzMjEiLCJpYXQiOjE3MDE3ODg0MTYsImV4cCI6MTcwMTc5MjAxNn0.S5rQ1ymJ0eZVVQnIAEXeT6kHS_PtdqBtK-dttiQSgTiNb9riFAcJ8ioAcZ6P1DdfA6F1C1igc07Y5xKGNbcAig"
}

export default {
    title: 'BalancesSocketLister',
    component: BalanceSocketListener
};


export const BalanceSocketsListener = () => ({
    Component: BalanceSocketListener,
    props: {user}
});
