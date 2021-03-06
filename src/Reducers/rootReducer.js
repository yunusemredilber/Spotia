import {combineReducers} from "redux";
import searchReducer from "./searchReducer";
import npReducer from "./npReducer";
import authReducer from "./authReducer";
import trackReducer from "./trackReducer";
import albumReducer from "./albumReducer";
import artistReducer from "./artistReducer";
import settingsReducer from "./settingsReducer";
import additionalSettingsReducer from "./additionalSettingsReducer";

export const rootReducer = combineReducers({
    search:searchReducer,
    np:npReducer,
    auth:authReducer,
    track:trackReducer,
    album:albumReducer,
    artist:artistReducer,
    settings:settingsReducer,
    additionalSettings:additionalSettingsReducer
});