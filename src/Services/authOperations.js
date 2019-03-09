import localStorage from 'local-storage';
const tokenKey = 'token';

export function setLocalToken(token){
    localStorage.set(tokenKey, token.toString());
};

export function getLocalToken(){
    return localStorage.get(tokenKey);

};

export function clearLocalToken(){

    localStorage.remove(tokenKey);

};

