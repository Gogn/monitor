import React, {useState} from 'react';
import AppLoading from "expo/build/launch/AppLoading";
import AppNavigation from "./app/Screens/AppNavigation";
import {combineReducers, createStore} from "redux";
import authReducer from "./app/store/reducers/authReducer";
import {Provider} from "react-redux";
import {store} from "./app/store/store";
import {context} from "./app/store/store";

export default function App() {
  const [isReady, setIsReady] = useState(true)

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       // startAsync={bootstrap}
  //       onFinish={() => setIsReady(true)}
  //       onError={err => console.log(err)}
  //     />
  //   )
  // }

  return (
    <Provider store={store}>
      <AppNavigation/>
    </Provider>
  )
}
