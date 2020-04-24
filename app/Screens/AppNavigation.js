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
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Ionicons, MaterialCommunityIcons} from "react-native-vector-icons";
import { enableScreens } from 'react-native-screens';
enableScreens();

const Tab = createBottomTabNavigator();
function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Chart"
    >
      <Tab.Screen name="Settings" component={Settings}
                  options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="settings" color={color} size={size} />
                    ),
                  }}
      />
      <Tab.Screen name="Home" component={Home}
                  options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="ios-today" color={color} size={size} />
                    ),
                  }}
      />
      <Tab.Screen name="Chart" component={Chart}
                  options={{
                    tabBarLabel: 'Chart',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="chart-line" color={color} size={size} />
                    ),
                  }}
      />
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
            // cardStyle: {
            //   backgroundColor: 'white',
            // }
          //   headerStyle: {
          //     backgroundColor: THEME.MAIN_COLOR
          // },
          //   headerTintColor: 'white',
          //   headerBackTitleVisible: false
          //   headerShown: false
            gestureEnabled: false
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
