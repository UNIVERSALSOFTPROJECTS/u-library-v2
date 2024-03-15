
import SportbookPage from '../src/lib/pages/SportbookPage.svelte'
import init from './init';
init.start();


let userState = 'loggedIn';
let active_view = 'sportbook';
let user = {};
let loginModalOpen = false;
let options = {
  gameid: '8042022_digitain',
  gameToken: '3560310552255cc0ytmcbwfm92k46skltmk6yvu5ntbskoodxunyny50qfxcgxl3rm89qqhcbtv55tj7t2uyhdvszs0fd1bcqmlwzq7xxks49wtkym5npwmwzj3gtx9dwsysirug74p8k'
};
let GAMEAPI_URL = 'http://localhost:5000/';
let modalOpened;



export default {
  title: 'SportbookPage',
  component: SportbookPage,
};






export const SportbookPage_ = () => ({
  Component: SportbookPage,
  props: { user, active_view, modalOpened, loginModalOpen, userState, options, GAMEAPI_URL }
});






