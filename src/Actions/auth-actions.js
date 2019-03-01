
export const SET_TOKEN = "SET_TOKEN";


export function setToken(token) {
    return dispatch => {
        dispatch({
            type: SET_TOKEN,
            payload: token
        })
    }
};