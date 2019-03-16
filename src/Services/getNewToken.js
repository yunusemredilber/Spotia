import {BACKEND_BASE} from "../confing/env";
import {isJson} from "../Actions/helpers/isJson";
import {getLocalRefreshToken} from "./authOperations"
const refresh_token = getLocalRefreshToken() || "";// get from local

export default async function getNewToken() {
    let url = await new URL(`${BACKEND_BASE}refresh_token`);
    let params = await {refresh_token:refresh_token};
    url.search = await new URLSearchParams(params);
    let response =await fetch(url, {
        method: "GET",
    });
    return response.text().then((text)=> {
        return isJson(text) ? JSON.parse(text) : {};
    });
};