import {isJson} from "./helpers/isJson";

export const ARTIST_OBJECT_PENDING = "ARTIST_OBJECT_PENDING";
export const ARTIST_OBJECT_FULFILLED = "ARTIST_OBJECT_FULFILLED";
export const ARTIST_OBJECT_REJECTED = "ARTIST_OBJECT_REJECTED";

export function getArtistObject(artistID,token) {
    return dispatch => {
        dispatch({
            type: "ARTIST_OBJECT",
            payload: getAO(artistID,token)
        })
    }
};

async function getAO(artistID,token) {
    let url = await new URL(`https://api.spotify.com/v1/artists/${artistID}`);
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