import axios from "axios"
import utils from './util'

let conf;
let headers = {};

const ServerConnection = (() => {

    const setConfig=(config)=>{
        conf = config;
        headers = {"Content-Type":"application/json;charset=UTF-8", "clientAuth":conf.CLIENT_AUTH, "client":conf.CLIENT_CODE};
    }
    
    
    const wallet = {
        checkPreviewWithdrawal:async(token)=>{
            var url=conf.API+`/checkRetailWithdrawal/${token}`;
            return await axios.get(url,{headers});
        },
        accountNumber:async(token)=>{
            var url=conf.API+`/accountNumber/${token}`;
            return await axios.get(url,{headers});
        },
        consultUserWeb:async(token)=>{
            var url=conf.API+`/numero_cuenta/${token}`;
            return await axios.get(url,{headers});
        },
        retailWithdrawal:async(token, amount)=>{
            var url=conf.API+"/retailWithdrawal";
            var payload = {token, amount}
            return await axios.post( url,payload,{headers} );            
        },
        depositRetail:async(token, cod)=>{
            var url=conf.API+"/wallet/depositRetail";
            var payload = {token, cod}
            return axios.post( url,payload,{headers} );
        },
        withdrawal_w :async(token, amount, bank, account, info)=>{
            let payload = {token, amount, bank, account, info}
            let url = conf.API+"/withdrawal";
            return await axios.post( url,payload,{headers} );
        },
        bankDeposit:async (token,bankDeposit )=>{
            let payload = {...bankDeposit, token}
            let url = conf.API+"/wallet/bankDeposit";
            return await axios.post( url,payload,{headers} );
        },
        getPayMethods:async (userToken)=>{            
            let url = conf.API+"/paymethods/"+userToken
            return await axios.get(url,{headers});
        },
        getPayLink:async (token, amount, type)=>{
            let url = conf.API+"/getpaylink/"
            return await axios.post( url,{token, amount, type},{headers} );
        }, 
    }

    const users = {
        getBalance:(userToken)=>{
            let url = conf.API+`/balance/${userToken}`;
            return axios.get(url,{headers}) ;
        },
        preRegister:(username, email, phone, platform)=>{
            var url=conf.API+"/user/preRegister";
            //console.log("conf here: ",conf)
            if(!conf.org) throw "ORG_MANDATORY";
            var payload = {username,email,phone, org:conf.org, platform}
            return axios.post( url,payload,{headers} );
        },
        login:(username,password)=>{
            let payload = {username,password}
            return axios.post(conf.API+"/login",payload,{headers});
        },
        register: (username, name,country, phone, email, password, date, operatorId,smscode,usertype, platform, currency,doctype="",document="")=>{
            if(!currency) throw "CURRENCY_MANDATORY";
            if(!conf.domain) throw "DOMAIN_MANDATORY";
            var url=conf.API+"/user";
            var payload = {username, name, phone, email, currency, password, date, smscode,country, operatorId, doctype:doctype, document:document, birthday:date, domain:conf.domain, usertype, platform, org:conf.org}
            return axios.post( url,payload,{headers} );
        }
    }
    const game = {
        getBrandList:(category)=>{
            let mode = utils.isMobile()?"mb":"wb";
            var url=conf.API+`/brands?m=${mode}`;
            url += category != "all" ? "&c="+category : "" 
            return axios.get(url,{headers}) ;
        }
    }


    /* PARA Universal User API */
    const u_wallet = {
        checkPendingWithdrawal: async (token) => {
            headers['Authorization'] = token;
            var url = conf.API + `/casino/api/checkPendingWithdrawal`;
            return await axios.get(url, { headers });
        },
        listBankAccounts: async (userToken) => {
            console.log("U-library: ", conf);
            if (!conf) throw ("CONF ID EMPTY");
            if (!conf.platformId) throw ("platformId EMPTY");
            headers['Authorization'] = userToken;
            let url = conf.API + "/casino/api/bankAccounts?platformId=" + conf.platformId;
            return await axios.get(url, { headers });
        },
        bankDeposit: async (token, bankDeposit) => {
            if (!bankDeposit.playerId) throw ("PLAYERID EMPTY");
            if (!bankDeposit.currency) throw ("CURRENCY EMPTY");
            let payload = { ...bankDeposit, token }
            let url = conf.API + "/casino/api/wallet/bankDeposit";
            payload.platformId = conf.platformId;
            return await axios.post(url, payload, { headers });
        },
        confirmCashDeposit: async (token, confirm) => {
            headers['Authorization'] = token;
            let payload = { ...confirm }
            let url = conf.API + "/casino/api/wallet/confirmCashDeposit";
            payload.platformId = conf.platformId;
            return await axios.post(url, payload, { headers });
        },
        checkOperationCode: async (token, code) =>{
            headers['Authorization'] = token;
            let url = conf.API + "/casino/api/wallet/checkOperationDeposit?code="+ code;
            return await axios.get(url, { headers });
        },
        withdrawalBank: async (token, params) => {
            headers['Authorization'] = token;
            let payload = {...params }
            let url = conf.API + "/casino/api/wallet/withdrawalBank";
            return await axios.post(url, payload, { headers });
        },
        withdrawalCashier: async (token, amount, bank, account, info) => {
            let payload = { token, amount, bank, account, info }
            let url = conf.API + "/casino/api/withdrawalCashier";
            return await axios.post(url, payload, { headers });
        },
        transactions: async (token, dateStringFrom, dateStringTo, filter, page = 1) => {
            headers['token'] = token;
            let url = conf.API + "/casino/api/wallet/transactions?page=" + page + "&from=" + dateStringFrom + "&to=" + dateStringTo +"&filter="+filter;
            return await axios.get(url, {headers});
        }

    }

    const u_user = {
        getBalance: (userToken) => {
            let url = conf.API + `/casino/api/balance/${userToken}`;
            return axios.get(url, { headers });
        },
        preRegister: (username, email, phone) => {
            if (!conf.platformId) throw ("PLATFORM ID EMPTY");
            var url = conf.API + "/casino/api/user/preRegister";
            //console.log("conf here: ",conf)
            if (!conf.org) throw "ORG_MANDATORY";
            var payload = { username, email, phone, org: conf.org, platformId: conf.platformId }
            return axios.post(url, payload, { headers });
        },
        login: (username, password) => {
            let payload = { username, password }
            return axios.post(conf.API + "/casino/api/login", payload, { headers });

        },
        register: (username, name, country, phone, email, password, date, operatorId, smscode, usertype, currency = conf.currency) => {
            if (!currency) throw "CURRENCY_MANDATORY";
            if (!conf.domain) throw "DOMAIN_MANDATORY";
            if (!conf.platformId) throw "PLATFORMID_EMPTY";
            var url = conf.API + "/casino/api/user";
            var payload = { username, name, phone: phone, email, currency, password, date, smscode, country, operatorId, doctype: "", document: "", birthday: date, domain: conf.domain, usertype, platformId: conf.platformId, org: conf.org }
            return axios.post(url, payload, { headers });
        }
    }
    /* */
    return {setConfig, wallet,users,game, u_user, u_wallet }
    
})()

export default ServerConnection