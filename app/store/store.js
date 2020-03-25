import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {combineReducers, createStore} from "redux";
import authReducer from "./reducers/auth";
import React from "react";

// const store = createStore(
//   rootReducer,
//   // composeEnhancers(applyMiddleware(thunk))
// )
//
// export default const rootReducer = combineReducers({
//   authReducer
// })
const rootReducer = combineReducers({
  authReducer
})
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

const context = React.createContext(null)
//
// export function Provider({ children }) {
//   return (
//     <Provider context={context} store={store}>
//       {children}
//     </Provider>
//   )
// }

// export default combineReducers({
//   auth: authReducer
// })
