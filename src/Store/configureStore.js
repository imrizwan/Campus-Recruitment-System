import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from '../Reducers/AuthReducer';
import errorReducer from '../Reducers/errorReducer';
 

const initialState = {};

const middleware = [thunk];

const store = createStore(
  combineReducers({
    auth: AuthReducer,
    errors: errorReducer
  }),
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

// const composeEnhancers = compose;

// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;
    
// export default () => {
//     const store = createStore(combineReducers({
//     auth: AuthReducer,
//     errors: errorReducer
// }),
// composeEnhancers(
//     applyMiddleware(thunk),
//     // other store enhancers if any
//   )
// );
// return store;
// }