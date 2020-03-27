import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {combineReducers, createStore} from "redux";
import authReducer from "./reducers/authReducer";
import React from "react";

const rootReducer = combineReducers({
  authReducer
})
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export const context = React.createContext(null)
