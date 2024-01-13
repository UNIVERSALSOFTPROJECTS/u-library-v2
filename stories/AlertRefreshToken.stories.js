import AlertRefreshToken from '../src/lib/topbar/AlertRefreshToken.svelte';
import init from './init';
init.start();

let user={
    platformId:"58dc8282-ab26-4e2d-9235-be4a3e2be91d",
    userId:"X-8f64a0a8-be87-434d-af64-5b8cd9e6de9c",
    currencyISO:"PEN",
    token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYWthbm8tVy1lOWQ4NDdiNC01Y2MxLTQ1M2EtOTAzMC1kNTFmZTE3YTg1ZmUiLCJpYXQiOjE3MDUxMDA1ODksImV4cCI6MTcwNTEwNzc4OX0.ev6YiXycEZX0g0dbtOYaRefCoEMnm47RCtUXBQVNYzYV8am3feY5FshZXJ4OAZTh9LeTM9RD3CnzkR_7vnezQA",
    expireToken:"2024-01-11T08:26:44.000+00:00"
}

export default {
    title: 'AlertRefreshToken',
    component: AlertRefreshToken
};


export const AlertRefreshTokens = () => ({
    Component: AlertRefreshToken,
    props: {user}
});
