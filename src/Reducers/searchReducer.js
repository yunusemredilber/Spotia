import {FETCH_SEARCH_PENDING,
    FETCH_SEARCH_FULFILLED,
    FETCH_SEARCH_REJECTED,
    CLEAN_SEARCH,
    SET_TEMP,
    SET_OFFSET,
    SET_STYPE
} from "../Actions/search-actions";

const initialState = {
    fetching: false,
    response: {},
    error: {},
    temp:"",
    offset:0,
    sType:'track'
};

export default function searchReducer(state=initialState, action) {
    switch (action.type) {
        case FETCH_SEARCH_PENDING:
            return {
                ...state,
                fetching: true
            };
        case FETCH_SEARCH_FULFILLED:
            return {
                ...state,
                response: action.payload,
                fetching: false
            };
        case FETCH_SEARCH_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };


        case CLEAN_SEARCH:
            return initialState;

        case SET_TEMP:
            return {
                ...state,
                temp: action.payload,
            };
        case SET_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case SET_STYPE:
            return {
                ...state,
                sType: action.payload,
            };

        default:
            return state;
    }
};