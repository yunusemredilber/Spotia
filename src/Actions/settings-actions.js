export const SET_SETTINGS = "SET_SETTINGS";

export function setSettings(settings) {
    return dispatch => {
        dispatch({
            type: SET_SETTINGS,
            payload: settings
        })
    };
};