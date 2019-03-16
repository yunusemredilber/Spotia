import localStorage from 'local-storage';
const tokenKey = 'token';
const refreshTokenKey = 'refresh_token';

export function setLocalToken(token){
    localStorage.set(tokenKey, token.toString());
};

export function getLocalToken(){
    return localStorage.get(tokenKey);

};

export function clearLocalToken(){

    localStorage.remove(tokenKey);

};

export function setLocalRefreshToken(refresh_token){
    localStorage.set(refreshTokenKey, refresh_token.toString());
};

export function getLocalRefreshToken(){
    return localStorage.get(refreshTokenKey);

};

export function clearLocalRefreshToken(){

    localStorage.remove(refreshTokenKey);

};

