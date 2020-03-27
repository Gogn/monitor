import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//IMPORT SCENES
// import RegisterScreen from "../Screens/authActions/Register";
import LoginScreen from "../Screens/Auth/Login";
// import UsernameScreen from "../Screens/authActions/Username";
// import ForgotPasswordScreen from "../Screens/authActions/ForgotPassword";

let headerStyle = {backgroundColor: '#fff', borderBottomWidth:0, shadowColor: 'transparent'}
let headerTitleStyle = {fontWeight: 'bold', fontSize: 17, fontFamily: font, color: '#363434'}

//Create Routes
const AuthStack = createStackNavigator(
  {
    // Register: RegisterScreen,
    Login: LoginScreen,
    // Username: UsernameScreen,
    // ForgotPassword: ForgotPasswordScreen
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
  }
);

export default AuthStack;
