export const SET_ADDITIONAL_SETTINGS = "SET_ADDITIONAL_SETTINGS";

export function setAdditionalSettings(additionalSettings) {
    return dispatch => {
        dispatch({
            type: SET_ADDITIONAL_SETTINGS,
            payload: additionalSettings
        })
    };
};