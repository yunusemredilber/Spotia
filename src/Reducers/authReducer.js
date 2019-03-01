import {SET_TOKEN} from "../Actions/auth-actions";

const initialState = {
    fetching: false,
    token: null,
    error: {},
};

export default function authReducer(state=initialState, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
};