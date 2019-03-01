import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reduxPromise from 'redux-promise-middleware';

import {rootReducer} from "./Reducers/rootReducer";

const allEnhancers = compose(
    applyMiddleware(reduxPromise(), thunk, logger)/*,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
);

export const store = createStore(
    rootReducer,
    allEnhancers
);