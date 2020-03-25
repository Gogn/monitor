import React, {useState} from 'react';
import AppLoading from "expo/build/launch/AppLoading";
import AppNavigation from "./app/Screens/AppNavigation";
import {combineReducers, createStore} from "redux";
import authReducer from "./app/store/reducers/auth";
import {Provider} from "react-redux";
import {store} from "./app/store/store";

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen name="Login" component={Login}/>
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }

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
