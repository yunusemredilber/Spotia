import {isJson} from "./helpers/isJson";

export const FETCH_SEARCH_PENDING = "FETCH_SEARCH_PENDING";
export const FETCH_SEARCH_FULFILLED = "FETCH_SEARCH_FULFILLED";
export const FETCH_SEARCH_REJECTED = "FETCH_SEARCH_REJECTED";

export const CLEAN_SEARCH = "CLEAN_SEARCH";
export const SET_TEMP = "SET_TEMP";
export const SET_OFFSET = "SET_OFFSET";
export const SET_STYPE = "SET_STYPE";


export function getSearch(q,token,os,type) {
    return dispatch => {
        dispatch({
            type: "FETCH_SEARCH",
            payload: get(q,token,os,type)
        })
    }
};

export function cleanSearch() {
    return dispatch => {
        dispatch({
            type: CLEAN_SEARCH,
            payload: {}
        })
    }
};


async function get(qq,token,os,typee) {
    let url = await new URL('https://api.spotify.com/v1/search');
    let params = await {limit:21,offset:os,q:qq, type:typee};
    url.search = await new URLSearchParams(params);
    let response =await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.text().then((text)=> {
        return isJson(text) ? JSON.parse(text) : {};
    });
};

export function setTemp(temp) {
    return dispatch => {
        dispatch({
            type: SET_TEMP,
            payload: temp
        })
    }
};


export function setOffset(offset) {
    return dispatch => {
        dispatch({
            type: SET_OFFSET,
            payload: offset
        })
    }
};

export function setSType(qq,token,os,type) {
   ;
    return dispatch => {
        dispatch(getSearch(qq,token,os,type));
        return dispatch({
            type: SET_STYPE,
            payload: type
        });
    }
};