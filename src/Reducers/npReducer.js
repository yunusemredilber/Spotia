import {CURRENTLY_PLAYING_PENDING,
        CURRENTLY_PLAYING_FULFILLED,
        CURRENTLY_PLAYING_REJECTED,
        PAUSE_PENDING,
        PAUSE_FULFILLED,
        PAUSE_REJECTED,
        PLAY_PENDING,
        PLAY_FULFILLED,
        PLAY_REJECTED,
        NEXT_PENDING,
        NEXT_FULFILLED,
        NEXT_REJECTED,
        PREVIOUS_PENDING,
        PREVIOUS_FULFILLED,
        PREVIOUS_REJECTED,
        TCL_PENDING,
        TCL_FULFILLED,
        TCL_REJECTED,
        STL_PENDING,
        STL_FULFILLED,
        STL_REJECTED,
        RTL_PENDING,
        RTL_FULFILLED,
        RTL_REJECTED,
        SS_PENDING,
        SS_FULFILLED,
        SS_REJECTED,
        CURRENTLY_PLAYING_CONTEXT_FULFILLED,
        CURRENTLY_PLAYING_CONTEXT_REJECTED,
        CURRENTLY_PLAYING_CONTEXT_PENDING,
        SET_VOLUME_PENDING,
        SET_VOLUME_FULFILLED,
        SET_VOLUME_REJECTED} from "../Actions/np-actions";

const initialState = {
    fetching: false,
    response: {},
    error: {},
    pause:{},
    play:{},
    next:{},
    previous:{},
    tcl:{},
    stl:{},
    rtl:{},
    ss:{},
    currentlyPlayingContext:null,
    setVolume:{}
};

export default function npReducer(state=initialState, action) {
    switch (action.type) {

        // CURRENTLY_PLAYING

        case CURRENTLY_PLAYING_PENDING:
            return {
                ...state,
                fetching: true
            };
        case CURRENTLY_PLAYING_FULFILLED:
            return {
                ...state,
                response: action.payload,
                fetching: false
            };
        case CURRENTLY_PLAYING_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };

            // PAUSE

        case PAUSE_PENDING:
            return {
                ...state
            };
        case PAUSE_FULFILLED:
            return {
                ...state,
                pause: action.payload
            };
        case PAUSE_REJECTED:
            return {
                ...state,
                error: action.payload
            };

            // PLAY

        case PLAY_PENDING:
            return {
                ...state
            };
        case PLAY_FULFILLED:
            return {
                ...state,
                play: action.payload
            };
        case PLAY_REJECTED:
            return {
                ...state,
                error: action.payload
            };

            // NEXT

        case NEXT_PENDING:
            return {
                ...state
            };
        case NEXT_FULFILLED:
            return {
                ...state,
                next: action.payload
            };
        case NEXT_REJECTED:
            return {
                ...state,
                error: action.payload
            };

            // PREVIOUS

        case PREVIOUS_PENDING:
            return {
                ...state
            };
        case PREVIOUS_FULFILLED:
            return {
                ...state,
                previous: action.payload
            };
        case PREVIOUS_REJECTED:
            return {
                ...state,
                error: action.payload
            };

            // TCL

        case TCL_PENDING:
            return {
                ...state
            };
        case TCL_FULFILLED:
            return {
                ...state,
                tcl: action.payload
            };
        case TCL_REJECTED:
            return {
                ...state,
                error: action.payload
            };


            // STL

        case STL_PENDING:
            return {
                ...state
            };
        case STL_FULFILLED:
            return {
                ...state,
                stl: action.payload
            };
        case STL_REJECTED:
            return {
                ...state,
                error: action.payload
            };

            // RTL


        case RTL_PENDING:
            return {
                ...state
            };
        case RTL_FULFILLED:
            return {
                ...state,
                rtl: action.payload
            };
        case RTL_REJECTED:
            return {
                ...state,
                error: action.payload
            };

            // SS

        case SS_PENDING:
            return {
                ...state
            };
        case SS_FULFILLED:
            return {
                ...state,
                ss: action.payload
            };
        case SS_REJECTED:
            return {
                ...state,
                error: action.payload
            };

            // CURRENTLY_PLAYING_CONTEXT

        case CURRENTLY_PLAYING_CONTEXT_PENDING:
            return {
                ...state,
                fetching: true
            };
        case CURRENTLY_PLAYING_CONTEXT_FULFILLED:
            return {
                ...state,
                currentlyPlayingContext: action.payload,
                fetching: false
            };
        case CURRENTLY_PLAYING_CONTEXT_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };

            // SET_VOLUME


        case SET_VOLUME_PENDING:
            return {
                ...state,
            };
        case SET_VOLUME_FULFILLED:
            return {
                ...state,
                setVolume: action.payload,
            };
        case SET_VOLUME_REJECTED:
            return {
                ...state,
                error: action.payload,
            };


        default:
            return state;
    }
};



