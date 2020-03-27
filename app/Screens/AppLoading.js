import React, {useEffect} from 'react';
import {StyleSheet} from "react-native";
import {ActivityIndicator, View, Text} from 'react-native';
import {AUTH_LOGOUT, AUTH_SUCCESS} from "../store/actions/actionTypes";
import {useDispatch} from "react-redux";
import * as firebase from "firebase";

export const AppLoading = ({navigation}) => {
  const dispatch = useDispatch()

  const getAuthState = async () => {
    try {
      // let token = await localStorage.getItem('token');
      // let user = await localStorage.getItem('userId');
      let user = firebase.auth().currentUser;
      console.log('user: ', user)

   // if (token !== null && user!== null) await handleLogin({token, user:JSON.parse(user)});
      if (user) await handleLogin(user);
      else await handleLogout();

      return {user};
    } catch (error) {
      throw new Error(error)
    }
  };

  const handleLogin = async (user) => {
    console.log('handleLogin')
    try{
      //STORE DATA
      let userId = user.uid
      // let data_ = [[user, JSON.stringify(user)], [tokenId, token]];
      // await AsyncStorage.multiSet(data_);
      //
      // //AXIOS AUTHORIZATION HEADER
      // axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      dispatch({type: AUTH_SUCCESS, userId});
    }catch (error) {
      throw new Error(error);
    }
  };

  const handleLogout = async () => {
    console.log('handleLogout')
    try{
      //REMOVE DATA
      // localStorage.removeItem('token')
      // localStorage.removeItem('userId')

      firebase.auth().signOut().then(function() {
        dispatch({type: AUTH_LOGOUT});
      }).catch(function(error) {
        throw new Error(error);
      });
    }catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    initialize()
  }, []);

  async function initialize() {
    try {
      const {user} = await getAuthState();

      if (user) {
        //check if username exist
        let username = !!(user);

        if (username) {
          console.log('initialize - username, navigate to Home')
          navigation.navigate('Home');
        }
        else navigation.navigate('Login', {}, StackActions.replace({ routeName: "Username" }))

      } else navigation.navigate('Login');
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
