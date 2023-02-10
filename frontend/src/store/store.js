
import { applyMiddleware } from "redux";
import {configureStore} from "@reduxjsx/toolkit"
import thunk from "redux-thunk";
import rootReducer from "../reducers/root_reducer";

const middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
  // must use 'require' (import only allowed at top of file)
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}


const configureReduxStore = (preloadedState = {}) =>
   configureStore(rootReducer, preloadedState, applyMiddleware(...middlewares));


export default configureReduxStore