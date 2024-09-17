
import SportbookPage from '../src/lib/pages/SportbookPage.svelte'
import init from './init';
init.start();

let active_view = 'sportbook';
let user = {
  agregatorToken: '1517941272999crlzgp4j8gt5t3dnrjypcuyqka59f6acusd7lksyegaorzdsvpa2rmnllvnpm3njcef3jn8ppjxdlscrcbdjmaclkvz0qhhcjzxc2rkm5jcz00czjhncgefhw3emwobi'
};
let loginModalOpen = false;
let userState = 'loggedIn';
//let userState = 'logout';
let options = {
  gameid: 'betsw3_2024',
  gameToken: '1517941272999crlzgp4j8gt5t3dnrjypcuyqka59f6acusd7lksyegaorzdsvpa2rmnllvnpm3njcef3jn8ppjxdlscrcbdjmaclkvz0qhhcjzxc2rkm5jcz00czjhncgefhw3emwobi'
}

let GAMEAPI_URL = 'https://prod-nd.apiusoft.com/api';
let modalOpened;
let clientCode = 'BPEN'
let lang = 'es';



export default {
  title: 'SportbookPage',
  component: SportbookPage,
};

export const SportbookPage_ = () => ({
  Component: SportbookPage,
  props: {active_view, modalOpened, loginModalOpen, userState, options, GAMEAPI_URL, clientCode, lang, user }
});






