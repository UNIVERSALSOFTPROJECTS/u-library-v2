
import SportbookPage from '../src/lib/pages/SportbookPage.svelte'
import init from './init';
init.start();

let active_view = 'sportbook';
let user = {
  agregatorToken: '9763140582081q1xvnkw2znptrjc6d4k6ej54nld5dpohutoug5phcbjganbuor7gppovpymlj6vkx5paje6fl4dhm6dxvwprfu8tzb8ife7vzbrqtvnxkglxl3risy7mzlqzn7ps0sox'
};
let loginModalOpen = false;
//let userState = 'loggedIn';
let userState = 'logout';
let options = {
  gameid: '8042022_digitain',
  //gameToken: '9763140582081q1xvnkw2znptrjc6d4k6ej54nld5dpohutoug5phcbjganbuor7gppovpymlj6vkx5paje6fl4dhm6dxvwprfu8tzb8ife7vzbrqtvnxkglxl3risy7mzlqzn7ps0sox'
}

let GAMEAPI_URL = 'https://test.apiuniversalsoft.com/api';
let modalOpened;
let clientCode = 'JU02'
let lang = 'fr';



export default {
  title: 'SportbookPage',
  component: SportbookPage,
};

export const SportbookPage_ = () => ({
  Component: SportbookPage,
  props: {active_view, modalOpened, loginModalOpen, userState, options, GAMEAPI_URL, clientCode, lang }
});






