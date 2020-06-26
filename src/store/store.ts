import rootReducer from "reducers/rootReducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
