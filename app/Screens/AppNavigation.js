import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from "./Auth/Login";
import {Registration} from "./Auth/Registration";
import React from "react";
import {THEME} from "../theme";
import {Home} from "./Monitor/Home";
import {AppLoading} from "./AppLoading";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Settings} from "./Monitor/Settings";
import {Chart} from "./Monitor/Chart";

const Tab = createBottomTabNavigator();
function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chart" component={Chart} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
export default function AppNavigation() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{
          //   headerStyle: {
          //     backgroundColor: THEME.MAIN_COLOR
          // },
          //   headerTintColor: 'white',
          //   headerBackTitleVisible: false
          //   headerShown: false
          }}
        >
          <Stack.Screen name="Loading" component={AppLoading}/>
          <Stack.Screen name="Login" component={Login} options={{headerLeft: null}}/>
          <Stack.Screen name="Registration" component={Registration}/>
          <Stack.Screen name="Home" component={AppTabs} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
