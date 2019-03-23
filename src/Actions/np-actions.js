import {isJson} from "./helpers/isJson";

export const CURRENTLY_PLAYING_PENDING = "CURRENTLY_PLAYING_PENDING";
export const CURRENTLY_PLAYING_FULFILLED = "CURRENTLY_PLAYING_FULFILLED";
export const CURRENTLY_PLAYING_REJECTED = "CURRENTLY_PLAYING_REJECTED";

export const PAUSE_PENDING = "PAUSE_PENDING";
export const PAUSE_FULFILLED = "PAUSE_FULFILLED";
export const PAUSE_REJECTED = "PAUSE_REJECTED";

export const PLAY_PENDING = "PLAY_PENDING";
export const PLAY_FULFILLED = "PLAY_FULFILLED";
export const PLAY_REJECTED = "PLAY_REJECTED";

export const NEXT_PENDING = "NEXT_PENDING";
export const NEXT_FULFILLED = "NEXT_FULFILLED";
export const NEXT_REJECTED = "NEXT_REJECTED";

export const PREVIOUS_PENDING = "PREVIOUS_PENDING";
export const PREVIOUS_FULFILLED = "PREVIOUS_FULFILLED";
export const PREVIOUS_REJECTED = "PREVIOUS_REJECTED";

export const TCL_PENDING = "TCL_PENDING";
export const TCL_FULFILLED = "TCL_FULFILLED";
export const TCL_REJECTED = "TCL_REJECTED";

export const STL_PENDING = "STL_PENDING";
export const STL_FULFILLED = "STL_FULFILLED";
export const STL_REJECTED = "STL_REJECTED";

export const RTL_PENDING = "RTL_PENDING";
export const RTL_FULFILLED = "RTL_FULFILLED";
export const RTL_REJECTED = "RTL_REJECTED";

export const SS_PENDING = "SS_PENDING";
export const SS_FULFILLED = "SS_FULFILLED";
export const SS_REJECTED = "SS_REJECTED";

export const CURRENTLY_PLAYING_CONTEXT_PENDING = "CURRENTLY_PLAYING_CONTEXT_PENDING";
export const CURRENTLY_PLAYING_CONTEXT_FULFILLED = "CURRENTLY_PLAYING_CONTEXT_FULFILLED";
export const CURRENTLY_PLAYING_CONTEXT_REJECTED = "CURRENTLY_PLAYING_CONTEXT_REJECTED";

export const SET_VOLUME_PENDING = "SET_VOLUME_PENDING";
export const SET_VOLUME_FULFILLED = "SET_VOLUME_FULFILLED";
export const SET_VOLUME_REJECTED = "SET_VOLUME_REJECTED";

export const CLEAR_RESPONSE = "CLEAR_RESPONSE";

export function getCurrentlyPlaying(token) {
    return dispatch => {
        dispatch({
            type: "CURRENTLY_PLAYING",
            payload: get(token)
        })
    }
};

async function get(token) {
    let url = await new URL('https://api.spotify.com/v1/me/player/currently-playing');
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

export function pausePlayer(token) {
    return dispatch => {
        dispatch({
            type: "PAUSE",
            payload: pause(token)
        })
    }
};

async function pause(token) {
    let url = await new URL('https://api.spotify.com/v1/me/player/pause');
    let response =await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await response;
};


export function playPlayer(token) {
    return dispatch => {
        dispatch({
            type: "PLAY",
            payload: play(token)
        })
    }
};

async function play(token) {
    let url = await new URL('https://api.spotify.com/v1/me/player/play');
    let response =await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await response;
};


export function nextPlayer(token) {
    return dispatch => {
        dispatch({
            type: "NEXT",
            payload: next(token)
        })
    }
};

async function next(token) {
    let url = await new URL('https://api.spotify.com/v1/me/player/next');
    let response =await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await response;
};

export function previousPlayer(token) {
    return dispatch => {
        dispatch({
            type: "PREVIOUS",
            payload: previous(token)
        })
    }
};

async function previous(token) {
    let url = await new URL('https://api.spotify.com/v1/me/player/previous');
    let response =await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await response;
};



export function trackContainsInLibrary(token,id) {
    return dispatch => {
        dispatch({
            type: "TCL",
            payload: tCIL(token,id)
        })
    }
};

async function tCIL(token,id) {
    let url = await new URL('https://api.spotify.com/v1/me/tracks/contains');
    let params = await {ids:id};
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


export function saveTrackToLibrary(token,id) {
    return dispatch => {
        dispatch({
            type: "STL",
            payload: sTTL(token,id)
        })
    }
};

async function sTTL(token,id) {
    let url = await new URL('https://api.spotify.com/v1/me/tracks');
    let params = await {ids:id};
    url.search = await new URLSearchParams(params);
    let response =await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type" : "application/json"
        }
    });
    return await response;
};


export function removeTrackFromLibrary(token,id) {
    return dispatch => {
        dispatch({
            type: "RTL",
            payload: rTFL(token,id)
        })
    }
};

async function rTFL(token,id) {
    let url = await new URL('https://api.spotify.com/v1/me/tracks');
    let params = await {ids:id};
    url.search = await new URLSearchParams(params);
    let response =await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type" : "application/json"
        }
    });
    return await response;
};



export function setSeek(token,position) {
    return dispatch => {
        dispatch({
            type: "SS",
            payload: sS(token,position)
        })
    }
};

async function sS(token,position) {
    let url = await new URL('https://api.spotify.com/v1/me/player/seek');
    let params = await {position_ms:position};
    url.search = await new URLSearchParams(params);
    let response =await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await response;
};




export function getCurrentlyPlayingContext(token) {
    return dispatch => {
        dispatch({
            type: "CURRENTLY_PLAYING_CONTEXT",
            payload: getCPC(token)
        })
    }
};

async function getCPC(token) {
    let url = await new URL('https://api.spotify.com/v1/me/player');
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



export function setVolume(token,position) {
    return dispatch => {
        return dispatch({
            type: "SET_VOLUME",
            payload: sV(token,position)
        })
    }
};

async function sV(token,volume) {
    let url = await new URL('https://api.spotify.com/v1/me/player/volume');
    let params = await {volume_percent:volume};
    url.search = await new URLSearchParams(params);
    let response =await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await response;
};

export function clearResponse() {
    return dispatch => {
        return dispatch({
            type: CLEAR_RESPONSE,
            payload: {}
        });
    }
};
