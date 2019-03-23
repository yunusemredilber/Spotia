import {SET_ADDITIONAL_SETTINGS} from "../Actions/additionalSettings-actions";

const initialState = {
    animatedGradientBackground:false
};


export default function additionalSettingsReducer(state=initialState, action) {
    switch (action.type) {
        case SET_ADDITIONAL_SETTINGS:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};



