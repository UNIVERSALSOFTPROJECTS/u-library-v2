import AlertRefreshToken from '../src/lib/topbar/AlertRefreshToken.svelte';
import init from './init';
init.start();

let user={
}

export default {
    title: 'AlertRefreshToken',
    component: AlertRefreshToken
};


export const AlertRefreshTokens = () => ({
    Component: AlertRefreshToken,
    props: {user}
});
