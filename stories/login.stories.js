import  Login from '../src/lib/topbar/Login.svelte';
import init from './init';
init.start();

let modalOpened;
let assetsUrl ='https://d1dkqs4jlldj3s.cloudfront.net/coliseosport';
export default {
  title: 'LOGIN',
  component: Login, 
};

const onOk =()=>{
  alert('ok');
}
const onError=()=>{
  alert('Error');
}

export const LoginNeco = () => ({
  Component: Login,
  props: { userGateway: 'neco', assetsUrl, onOk,onError}
});

export const LoginUniversal = () => ({
  Component: Login,
  props: { userGateway: 'universal', assetsUrl, onOk, onError, modalOpened}
});






