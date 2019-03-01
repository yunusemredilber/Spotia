import {isJson} from "./helpers/isJson";

export const TRACK_OBJECT_PENDING = "TRACK_OBJECT_PENDING";
export const TRACK_OBJECT_FULFILLED = "TRACK_OBJECT_FULFILLED";
export const TRACK_OBJECT_REJECTED = "TRACK_OBJECT_REJECTED";

export function getTrackObject(trackID,token) {
    return dispatch => {
        dispatch({
            type: "TRACK_OBJECT",
            payload: getTO(trackID,token)
        })
    }
};

async function getTO(trackID,token) {
    let url = await new URL(`https://api.spotify.com/v1/tracks/${trackID}`);
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