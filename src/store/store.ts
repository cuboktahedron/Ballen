import rootReducer from "reducers/rootReducer";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

const middlewares = [thunk, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
