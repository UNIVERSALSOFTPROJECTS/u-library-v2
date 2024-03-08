import TopBar from '../src/lib/topbar/TopBar.svelte';
import SportbookPage from '../src/lib/pages/SportbookPage.svelte'
import init from './init';
init.start();


let userState = 'logout';
let active_view = null;
let user = {};
let loginModalOpen = false;
let sportbookGameUrl = "";
let options = {
  gameid: 'novusbet'
};
let GAMEAPI_URL = 'https://apiuniversalsoft.com/api';
let GAME_TOKEN = null;
let getGameUrl = null;
let mode = 'web';
let modalOpened;



export default {
  title: 'SportbookPage_',
  component: SportbookPage,
};






export const SportbookPage_ = () => ({
  Component: SportbookPage,
  props: { user, active_view, modalOpened, loginModalOpen, userState, sportbookGameUrl, options, GAMEAPI_URL, GAME_TOKEN, getGameUrl, mode }
});






