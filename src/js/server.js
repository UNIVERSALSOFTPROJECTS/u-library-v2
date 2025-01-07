import axios from "axios"
import utils from './util'

let conf;
let headers = {};


const ServerConnection = (() => {

    const setConfig = (config) => {
        conf = config;
        headers = { "Content-Type": "application/json", "clientAuth": conf.CLIENT_AUTH, "client": conf.CLIENT_CODE, "x-tenant": conf["x-tenant"], 
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Accept": "application/json"};
    }

    const wallet = {
        checkPreviewWithdrawal: async (token) => {
            let url = conf.API + `/checkRetailWithdrawal/${token}`;
            return await axios.get(url, { headers });
        },
        accountNumber: async (token) => {
            let url = conf.API + `/accountNumber/${token}`;
            return await axios.get(url, { headers });
        },
        consultUserWeb: async (token) => {
            let url = conf.API + `/numero_cuenta/${token}`;
            return await axios.get(url, { headers });
        },
        retailWithdrawal: async (token, amount) => {
            let url = conf.API + "/retailWithdrawal";
            let payload = { token, amount }
            return await axios.post(url, payload, { headers });
        },
        depositRetail: async (token, cod) => {
            let url = conf.API + "/wallet/depositRetail";
            let payload = { token, cod }
            return axios.post(url, payload, { headers });
        },
        withdrawal_w: async (token, amount, bank, account, info, dni) => {
            let payload = { token, amount, bank, account, info, dni }
            let url = conf.API + "/withdrawal";
            return await axios.post(url, payload, { headers });
        },
        bankDeposit: async (token, bankDeposit) => {
            let payload = { ...bankDeposit, token }
            let url = conf.API + "/wallet/bankDeposit";
            return await axios.post(url, payload, { headers });
        },
        getPayMethods: async (userToken) => {
            let url = conf.API + "/paymethods/" + userToken;
            return await axios.get(url, { headers });
        },
        getPayLink: async (token, amount, type) => {
            let url = conf.API + "/getpaylink/";
            return await axios.post(url, { token, amount, type }, { headers });
        },
    }
    const users = {
        getBalance: (userToken) => {
            let url = conf.API + `/balance/${userToken}`;
            return axios.get(url, { headers });
        },
        getCurrencyIdByCodeAgent: (id) => {
            let url = conf.API + `/retailAgents/${id}/currencies`;
            return axios.get(url, { headers });
        },
        preRegister: (username, email, phone, platform, channel) => {
            let url = conf.API + "/user/preRegister";
            console.log('URL', url);
            if (!conf.org) throw "ORG_MANDATORY";
            let payload = { username, email, phone, org: conf.org, platform, channel }
            console.log("RETURN",payload);
            return axios.post(url, payload, { headers });
        },
        login: (username, password, userType) => {
            // if (!conf.org) throw "ORG_MANDATORY";
            let payload = { username, password, org: conf.org, userType }
            console.log("login", payload);
            return axios.post(conf.API + "/login", payload, { headers });
        },//operatorId o codeAgent,son lo mismo
        register: (username, name, country, phone, email, password, date, operatorId, smscode, usertype, platform, currency, doctype = "", document = "") => {
            if (!currency) throw "CURRENCY_MANDATORY";
            if (!conf.domain) throw "DOMAIN_MANDATORY";
            let url = conf.API + "/user";
            let payload = { username, name, phone, email, currency, password, date, smscode, country, operatorId, doctype: doctype, document: document, birthday: date, domain: conf.domain, usertype, platform, org: conf.org }
            return axios.post(url, payload, { headers });
        },
        resetPassword:(data)=>{
            if (!conf.org) throw "ORG_MANDATORY";
            const url = window.origin+"/resetPassword";
            let payload = { email:data.email, url, org: conf.org };
            return axios.post(`${conf.API}/resetPassword`, payload, { headers });
        },
        confirmResetPassword:(temporalToken)=>{
            if (!conf.org) throw "ORG_MANDATORY";
            let payload = { token:temporalToken, org: conf.org };
            return axios.post(`${conf.API}/confirmResetPassword`, payload, { headers });
        },
        getMyAccount: (userToken)=>{
            let url = conf.API +`/myaccount/`+ userToken;
            return axios.get(url, { headers });
        },
        saveMyAccount: (user) =>{   
            let payload =  user;
            return axios.post(`${conf.API}/user/myAccount`, payload, { headers });
        },
        changePassword: (userToken, newPassword, oldpass)=>{
            let payload = { userToken, newPassword, oldpass }
            return axios.post(`${conf.API}/changepassword`, payload, { headers });
        },
        getMovements: (token, dateStringFrom, dateStringTo, filter)=>{
            let url = conf.API+`/wallet/${token}/${dateStringFrom}/${dateStringTo}/${filter}/movements`;
            return axios.get(url, { headers });
        }
    }
    const game = {
        getBrandList: (category) => {
            let url = conf.API + `/brands?m=wb`;
            url += category != "all" ? "&c=" + category : ""
            return axios.get(url, { headers });
        },
        authInGame: async (agregatorToken) => {
          let url = conf.API+`/authInGame/${agregatorToken}`;
          console.log(url,"desde server");
          return await axios.get(url, { headers });
        },
        getURL: async (url) => {
            const response = await axios.get(url, {headers});
            return response.data;
        },
        getGameList: (category, section, page=1, currency='USD', xpage=20)=>{
            let url=conf.API+`/games?c=${category}&m=wb&page=${page}&xpage=${xpage}&curr=${currency}`;
            if( typeof section =='object' && section.brand ) url += `&b=${section.brand}`;
            else if( typeof section =='object' && section.search ) url += `&g=${section.search}`;
            else if(section=="TOP") url += `&o=200000`;
            else if(section=="POP") url += `&o=100000`;
            else if(section=="NEW") url += `&n=true`;
            else if( /BACC|RLIV|BJLIV|MWLIV|LOTTO|SICBO|TVLIV|DROP|CLASS|RULE|TABL|MEGA|FAST/.test(section)) url += `&t=${section}`; 
            return axios.get(url, { headers });
        },
        getGamesTypeSlot: ()=>{
            let url = `${conf.API_GAMES_NODE}/lobby/gameTypesByClient?cat=slot&type=wb&client=${conf.CLIENT_ID}`;
            return axios.get(url, { headers });
        }
        ,
        getTopGames: async () => {
            let url = conf.API + `/top-games`;
            const response = await axios.get(url, { headers });
            console.log("res? ", response);
            return response;
        }
    }
    /* PARA Universal User API */
    const u_wallet = {
        checkPendingCashout: async (token) => {
            headers['Authorization'] = token;
            var url = conf.API + `/api/casino/wallet/cashout/checkPending`;
            return await axios.get(url, { headers });
        },
        listBankAccounts: async (userToken) => {
            if (!conf) throw ("CONF ID EMPTY");
            if (!conf.platformId) throw ("platformId EMPTY");
            headers['Authorization'] = userToken;
            let url = conf.API + "/api/casino/bankAccounts?platformId=" + conf.platformId;
            return await axios.get(url, { headers });
        },
        bankDeposit: async (token, bankDeposit) => {
            if (!bankDeposit.playerId) throw ("PLAYERID EMPTY");
            if (!bankDeposit.currency) throw ("CURRENCY EMPTY");
            let payload = { ...bankDeposit, token }
            let url = conf.API + "/api/casino/wallet/bankDeposit";
            payload.platformId = conf.platformId;
            return await axios.post(url, payload, { headers });
        },
        confirmCashin: async (token, data) => {  
            headers['Authorization'] = token;
            let payload = { ...data }
            let url = conf.API + "/api/casino/wallet/confirmCashin";
            payload.platformId = conf.platformId;
            return await axios.post(url, payload, { headers });
        },
        checkOperationCode: async (token, code) => {
            headers['Authorization'] = token;
            let url = conf.API + "/api/casino/wallet/deposit/checkOperationCode?code=" + code;
            return await axios.get(url, { headers });
        },
        withdrawalBank: async (token, params) => {
            headers['Authorization'] = token;
            let payload = { ...params,
                platformId: conf.platformId
            }
            let url = conf.API + "/api/casino/wallet/bankWithdrawal";
            return await axios.post(url, payload, { headers });
        },
        cashout: async (token, params) => {//retirar efectivo
            headers['Authorization'] = token;
            let payload = { ...params }
            let url = conf.API + "/api/casino/wallet/cashout";
            return await axios.post(url, payload, { headers });
        },
        transactions: async (params,) => {
            console.log("Params",params);
            headers['token'] = params.token;
            let url = conf.API + "/api/casino/wallet/transactions?playerId="+ params.playerId+"&page=" + params.page+"&xpage="+ params.xpage + "&from=" + params.from + "&to=" + params.to + "&filter=" + params.type;
            return await axios.get(url, { headers });
        }

    }

    const u_user = {
        getBalance: (userToken) => {
            return axios.get(conf.API +`/api/casino/balance/${userToken}`, { headers });
        },
        refreshToken:(userToken)=> {
            return axios.get(conf.API +`/api/casino/refreshToken/${userToken}`, { headers });
        },
        myAccount: (userToken) =>{
            let url = conf.API + `/api/casino/myAccount/${userToken}`;
            return axios.get(url, { headers });
        },
        preRegister: (payload) => {
            if (!conf.platformId) throw ("PLATFORM ID EMPTY");
            var url = conf.API + "/api/casino/user/preRegister";
            //console.log("conf here: ",conf)
            if (!conf.org) throw "ORG_MANDATORY";
            var payload_ = { 
                username: payload.username, 
                email: payload.email, 
                phone: payload.countryPrefix +payload.phone, 
                org: conf.org, 
                platform: conf.org,
                platformId: conf.platformId,

            }
            return axios.post(url, payload_, { headers });
        },
        login: (username, password) => {
            let payload = { username, password }
            console.log("headers", headers);
            return axios.post(conf.API + "/api/casino/login", payload, { headers });

        },
        register: (payload) => {
            if (!payload.currency) throw "CURRENCY_MANDATORY";
            if (!conf.domain) throw "DOMAIN_MANDATORY";
            if (!conf.platformId) throw "PLATFORMID_EMPTY";
            var url = conf.API + "/api/casino/user";
            var payload_ = { 
                username: payload.username, 
                name: payload.name, 
                phone: payload.countryPrefix + payload.phone,
                email: payload.email, 
                currency: payload.currency, 
                password: payload.password, 
                birthday: payload.birthday, 
                smscode: payload.smscode, 
                country: payload.countryCode, 
                operatorId: '', 
                doctype: payload.doctype, 
                document: payload.document,  
                domain: conf.domain, 
                usertype: 'W', 
                platformId: conf.platformId, 
                org: conf.org 
            }
            return axios.post(url, payload_, { headers });
        },
        saveMyAccount:(user) => {
            var payload = user;
            var user_storage = JSON.parse(sessionStorage.getItem("user"))
            payload.token = user_storage.token;
            payload.agregatorToken = user_storage.agregatorToken;
            var url = conf.API + "/api/casino/myAccount";
            headers.agregatorToken = payload.agregatorToken;
            headers.Authorization = payload.token;
            return axios.post(url, payload, {headers})
        },

        changePassword: (userToken, payload) => {
            var payload_ = { 
                newPassword: payload.new_Password, 
                oldPassword: payload.old_Password 
            }
            headers.Authorization = userToken;
            console.log(payload_);
            var url = conf.API + "/api/casino/changepassword";
            return axios.post(url, payload_,{headers})
        },

        recoverPassword: (payload) => {
            var payload_ = {
                email: payload.email,
                platformId: conf.platformId,
                platform: conf.org,
            }
            return axios.post(conf.API + "/api/casino/forgotPassword", payload_)
        }
    }

    const u_game = {
        gameURLTest: async (game, usertoken) => {
            // Construir la URL básica
            let url = `${conf.GAMEAPI_URL}/launch?gameid=${game.id}&m=wb&p=${game.provider}&sessionid=${usertoken}`;

            // Agregar el parámetro &view=ESPORTS-HUB si game.provider es igual a "pnc"
            if (game.provider === "pnc") {
                url += "&view=ESPORTS-HUB";
            }

            // Realizar la petición con la URL final
            const response = await axios.get(url, { headers });

            // Retornar la URL o la respuesta (según lo que esperes)
            return response;
        }

    }
    /* */
    return { setConfig, wallet, users, game, u_user, u_wallet, u_game }

})()

export default ServerConnection