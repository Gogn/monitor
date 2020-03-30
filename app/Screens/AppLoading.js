import React, {useEffect} from 'react';
import {StyleSheet} from "react-native";
import {ActivityIndicator, View, Text, AsyncStorage} from 'react-native';
import {AUTH_LOGOUT, AUTH_SUCCESS} from "../store/actions/actionTypes";
import {useDispatch, useSelector} from "react-redux";
import * as firebase from "firebase";
import {handleLogin, handleLogout} from "../store/actions/authActions";

export const AppLoading = ({navigation}) => {
  const store = useSelector(state => state.authReducer)
  // const dispatch = useDispatch()

  // const getAuthState = () => {
  //     try {
  //       // let token = await AsyncStorage.getItem('token');
  //       let user = AsyncStorage.getItem('userId');
  //       // let user = firebase.auth().currentUser;
  //       console.log('user: ', user)
  //
  //       if (user) dispatch(handleLogin(user))
  //       else dispatch(handleLogout());
  //
  //       return {user};
  //     } catch (error) {
  //       throw new Error(error)
  //     }
  // };

  useEffect(() => {
    console.log('useEffect')
    initialize()
  }, [store.userId]);

  function initialize() {
      try {
        // const {user} = getAuthState()
// debugger
        let user = AsyncStorage.getItem('userId');
        if (user) {
          //check if username exist
          let username = !!(user);

          if (username) {
            console.log('initialize - username, navigate to Home')
            navigation.navigate('Home');
          } else {
            console.log('initialize - username empty, navigate to Login')
            navigation.navigate('Login', {}, StackActions.replace({routeName: "Username"}))
          }

        } else {
          console.log('initialize - user empty, navigate to Login')
          navigation.navigate('Login');
        }
      } catch (error) {
        navigation.navigate('Login');
        throw new Error(error);
      }
    }

  return (
    <View style={styles.center}>
      <ActivityIndicator/>
      <Text>Now loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
