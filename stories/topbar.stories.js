import TopBar from '../src/lib/topbar/TopBar.svelte';
import init from './init';
init.start();

let assetsUrl ='https://assets.apiusoft.com/coliseosport';
let userState=null;
let active_view=null;
let user = {};
let showLoginModal = false;
let showMainLoading = false;
let loginModalOpen =false;
let modalOpened;
let platform="demo";





export default {
  title: 'TopBar',
  component: TopBar, 
};

const onOk =()=>{
  alert('ok');
}
const onError=()=>{
  alert('Error');
}



export const TopBarDemo = () => ({
  Component: TopBar,
  props: { userGateway: 'universal', assetsUrl, onOk, onError }
});






