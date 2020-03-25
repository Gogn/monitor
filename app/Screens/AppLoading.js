import React, {useEffect} from 'react';
import {StyleSheet} from "react-native";
import {ActivityIndicator, View, Text} from 'react-native';
import {AUTH_LOGOUT, AUTH_SUCCESS} from "../store/actions/actionTypes";
import {useDispatch} from "react-redux";

export const AppLoading = ({navigation}) => {
  const dispatch = useDispatch()

  const getAuthState = async () => {
    try {
      //change to AsyncStorage
      let token = await localStorage.getItem('token');
      let user = await localStorage.getItem('userId');
      console.log('user: ',user)

      // if (token !== null && user!== null) await handleLogin({token, user:JSON.parse(user)});
      if (token !== null && user!== null) await handleLogin(token, user);
      else await handleLogout();

      return {token, user};
    } catch (error) {
      throw new Error(error)
    }
  };

  const handleLogin = async (data) => {
    try{
      //STORE DATA
      let {token, user} = data;
      // let data_ = [[user, JSON.stringify(user)], [tokenId, token]];
      // await AsyncStorage.multiSet(data_);
      //
      // //AXIOS AUTHORIZATION HEADER
      // axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      dispatch({type: AUTH_SUCCESS, token});
    }catch (error) {
      throw new Error(error);
    }
  };

  const handleLogout = async () => {
    try{

      //REMOVE DATA
      // await localStorage.multiRemove(['userId', 'token']);

      //AXIOS AUTHORIZATION HEADER
      // delete axios.defaults.headers.common["Authorization"];

      //DISPATCH TO REDUCER
      dispatch({type: AUTH_LOGOUT});
    }catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    initialize()
  }, []);

  async function initialize() {
    try {
      const {token, user} = await getAuthState();

      if (user) {
        //check if username exist
        let username = !!(user);

        if (username) {
          console.log('Autologin')
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
