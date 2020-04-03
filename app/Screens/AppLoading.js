import React, {useEffect} from 'react';
import {StyleSheet} from "react-native";
import {ActivityIndicator, View, Text, AsyncStorage} from 'react-native';
import {AUTH_LOGOUT, AUTH_SUCCESS} from "../store/actions/actionTypes";
import {useDispatch, useSelector} from "react-redux";
import * as firebase from "firebase";
import {handleLogin, handleLogout, tagsOfUser} from "../store/actions/authActions";
import {db} from "../firebase";
import {StyledView} from "../theme";

export const AppLoading = ({navigation}) => {
  const store = useSelector(state => state.authReducer)
  // const dispatch = useDispatch()

  useEffect(() => {
    console.log('useEffect')
    initialize()
  }, [store.userId]);

  function initialize() {

    let user = async () => AsyncStorage.getItem('userId')
    user().then(user => {
      console.log('Autologin succed, userId (Redux): ', user)
      if (user) {
          console.log('initialize - username, Ok')
          // dispatch(tagsOfUser())
          navigation.navigate('Home');
      } else {
        console.log('initialize - user empty, navigate to Login')
        navigation.navigate('Login');
      }
    })
  }



  return (
    <StyledView>
      <ActivityIndicator/>
      <Text>Now loading...</Text>
    </StyledView>
  )
}
