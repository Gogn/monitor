import React, {useState} from 'react';
import AppLoading from "expo/build/launch/AppLoading";
import AppNavigation from "./app/Screens/AppNavigation";
import {combineReducers, createStore} from "redux";
import authReducer from "./app/store/reducers/authReducer";
import {Provider} from "react-redux";
import {store} from "./app/store/store";
import {context} from "./app/store/store";
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

console.disableYellowBox = true;

export default function App() {

  return (
    <Provider store={store}>
      <AppNavigation/>
    </Provider>
  )
}
