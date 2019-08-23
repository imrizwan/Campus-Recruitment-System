import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import monitorReducersEnhancer from "../Enhancer/monitorReducer";
import loggerMiddleware from "../Middleware/logger";
import AuthReducer from "../Reducers/AuthReducer";
import errorReducer from "../Reducers/errorReducer";
import profileReducer from "../Reducers/profileReducer";
import profileCreatedReducer from "../Reducers/profileCreatedReducer";

// export default function configureStore(preloadedState) {
//   const middlewares = [loggerMiddleware, thunkMiddleware];
//   const middlewareEnhancer = composeWithDevTools(
//     applyMiddleware(...middlewares)
//   );

//   const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
//   const composedEnhancers = compose(...enhancers);

//   const store = createStore(
//     combineReducers({
//       auth: AuthReducer,
//       errors: errorReducer,
//       profile: profileReducer,
//       profilecreated: profileCreatedReducer
//     }),
//     preloadedState,
//     composedEnhancers
//   );

//   return store;
// }

const initialState = {};

// const middleware = [thunk];
const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = compose(...enhancers);

const store = createStore(
  combineReducers({
    auth: AuthReducer,
    errors: errorReducer,
    profile : profileReducer,
    profilecreated: profileCreatedReducer
  }),
  initialState,
  composedEnhancers
);

export default store;
