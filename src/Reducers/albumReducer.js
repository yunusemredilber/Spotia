import {ALBUM_OBJECT_PENDING,
    ALBUM_OBJECT_FULFILLED,
    ALBUM_OBJECT_REJECTED} from "../Actions/album-actions";

const initialState = {
    fetchingAlbumObject: false,
    albumObject: null,
    error: {},
};

export default function albumReducer(state=initialState, action) {
    switch (action.type) {

        case ALBUM_OBJECT_PENDING:
            return {
                ...state,
                fetchingAlbumObject:true
            };
        case ALBUM_OBJECT_FULFILLED:
            return {
                ...state,
                albumObject: action.payload,
                fetchingAlbumObject:false
            };
        case ALBUM_OBJECT_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetchingAlbumObject:false
            };


        default:
            return state;
    }

}


