import {TRACK_OBJECT_PENDING,
    TRACK_OBJECT_FULFILLED,
    TRACK_OBJECT_REJECTED} from "../Actions/track-actions";

const initialState = {
    fetchingTrackObject: false,
    trackObject: null,
    error: {},
};

export default function trackReducer(state=initialState, action) {
    switch (action.type) {

        case TRACK_OBJECT_PENDING:
            return {
                ...state,
                fetchingTrackObject:true
            };
        case TRACK_OBJECT_FULFILLED:
            return {
                ...state,
                trackObject: action.payload,
                fetchingTrackObject:false
            };
        case TRACK_OBJECT_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetchingTrackObject:false
            };

        default:
            return state;
    }
};