import TopBar from '../src/lib/topbar/TopBar.svelte';
import init from './init';
init.start();

let assetsUrl = 'https://assets.apiusoft.com/bo_fontend';
let userState = null;
let active_view = null;
let user = {};
let showLoginModal = false;
let showMainLoading = false;
let loginModalOpen = false;
let modalOpened;
let platform = "DemoPlatform";





export default {
  title: 'TopBar',
  component: TopBar,
};

const onOk = () => {
  alert('ok');
}
const onError = () => {
  alert('Error');
}

const onLogin = () => {};



export const TopBarDemo = () => ({
  Component: TopBar,
  props: { userGateway: 'universal', user, active_view, showLoginModal, modalOpened, loginModalOpen, showMainLoading, assetsUrl, platform, userState, onOk, onError, onLogin }
});






