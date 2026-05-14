import ScreenGamesCmsWager from '../src/lib/modals/ScreenGamesCmsWager.svelte';
import ServerConnection from '../src/js/server';

ServerConnection.setConfig({
  API: 'https://lobby-bff-test.apiusoft.com',
  API_KS: 'https://srv-prod-ks.apiusoft.com/lobby-bff',
  GAMEAPI_URL: 'https://test.apiuniversalsoft.com/api',
  CLIENT_AUTH: 'JU02TOMCAT00023423JAVA009DEMOPLATFORM123',
  CLIENT_CODE: 'JU02',
  CLIENT_ID: '159',
  LOBBY_GAMES_API: 'https://lobby.apiusoft.com',
  API_GAMES_NODE: 'https://prod-nd.apiusoft.com',
  ASSETS: 'https://d1dkqs4jlldj3s.cloudfront.net',
  WS_URL: 'wss://lobby-bff-test.apiusoft.com/lobbybff',
  ASSETS_GLOBAL: 'https://d1dkqs4jlldj3s.cloudfront.net/generic_imgs',
  country: '+56',
  operatorId: '123',
  domain: 'https://demo-platform.test/',
  assetsUrl: 'https://d1dkqs4jlldj3s.cloudfront.net',
  org: 'CLS',
  currency: 7,
});

const platform = 'Coliseosport';
const updateBalance = () => console.log('CMSWager demo/test closed');

export default {
  title: 'CMSWager',
  component: ScreenGamesCmsWager,
};

export const CmsWagerDemoTest = () => ({
  Component: ScreenGamesCmsWager,
  props: {
    open: true,
    platform,
    updateBalance,
    options_launch: {
      sessionToken: 'demo-session-token',
      gameId: 'cms_sportsbook',
      mode: 'desktop',
    },
  },
});
