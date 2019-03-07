import {combineReducers} from "redux";
import searchReducer from "./searchReducer";
import npReducer from "./npReducer";
import authReducer from "./authReducer";
import trackReducer from "./trackReducer";
import albumReducer from "./albumReducer";
import artistReducer from "./artistReducer";

export const rootReducer = combineReducers({
    search:searchReducer,
    np:npReducer,
    auth:authReducer,
    track:trackReducer,
    album:albumReducer,
    artist:artistReducer
});