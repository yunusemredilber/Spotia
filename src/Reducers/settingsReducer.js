
import {SET_SETTINGS} from "../Actions/settings-actions";
const initialState = {
    typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true,
        fontSize: 17,
    },
     palette : {
         primary: {
             light: '#9a67ea',
             main: '#673ab7',
             dark: '#320b86',
             //contrastText: '#fff',
         },
         secondary: {
             light: '#9a67ea',
             main: '#673ab7',
             dark: '#320b86',
             //contrastText: '#fff',
         },
         type: 'light',
     },

};

export default function settingsReducer(state=initialState, action) {
    switch (action.type) {
        case SET_SETTINGS:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};



