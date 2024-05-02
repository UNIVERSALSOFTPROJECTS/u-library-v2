
import DigtainSportBook from '../src/lib/sportbooks/DigtainSportBook.svelte'
import init from './init';
init.start();

//export let onCategoryChange


let userState = 'logout';
let active_view = 'sportbook';
let loggedUser = { agregatorToken: '2856783' };
let user = {}
let loginModalOpen = false;
let clientCode
let lang = 'fr';



export default {
  title: 'DigtainSportBook',
  component: DigtainSportBook
};


const onCategoryChange = () => {
  alert('cambio categoria');
}


export const DigtainSportBookGuestUser = () => ({
  Component: DigtainSportBook,
  props: { user: {}, loginModalOpen, clientCode, onCategoryChange, lang }
});


export const DigtainSportBookloggetUser = () => ({
  Component: DigtainSportBook,
  props: { user: loggedUser, loginModalOpen, clientCode, onCategoryChange, lang }
});





