import {ARTIST_OBJECT_FULFILLED,
        ARTIST_OBJECT_PENDING,
        ARTIST_OBJECT_REJECTED} from "../Actions/artist-actions";

const initialState = {
    fetchingArtistObject: false,
    artistObject: null,
    error: {},
};

export default function trackReducer(state=initialState, action) {
    switch (action.type) {

        case ARTIST_OBJECT_PENDING:
            return {
                ...state,
                fetchingArtistObject:true
            };
        case ARTIST_OBJECT_FULFILLED:
            return {
                ...state,
                artistObject: action.payload,
                fetchingArtistObject:false
            };
        case ARTIST_OBJECT_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetchingArtistObject:false
            };

        default:
            return state;
    }
};




