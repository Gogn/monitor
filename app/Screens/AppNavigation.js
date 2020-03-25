import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from "./Auth/Login";
import {Registration} from "./Auth/Registration";
import React from "react";
import {THEME} from "../theme";
import {Home} from "./Monitor/Home";
import {AppLoading} from "./AppLoading";

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{
            headerStyle: {
              backgroundColor: THEME.MAIN_COLOR
          },
            headerTintColor: 'white',
            headerBackTitleVisible: false
          }}
        >
          <Stack.Screen name="Loading" component={AppLoading}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Registration" component={Registration}/>
          <Stack.Screen name="Home" component={Home} options={{
            headerLeft: null
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
