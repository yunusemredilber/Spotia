import {isJson} from "./helpers/isJson";

export const ALBUM_OBJECT_PENDING = "ALBUM_OBJECT_PENDING";
export const ALBUM_OBJECT_FULFILLED = "ALBUM_OBJECT_FULFILLED";
export const ALBUM_OBJECT_REJECTED = "ALBUM_OBJECT_REJECTED";

export function getAlbumObject(albumID,token) {
    return dispatch => {
        dispatch({
            type: "ALBUM_OBJECT",
            payload: getAO(albumID,token)
        })
    }
};

async function getAO(albumID,token) {
    let url = await new URL(`https://api.spotify.com/v1/albums/${albumID}`);
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