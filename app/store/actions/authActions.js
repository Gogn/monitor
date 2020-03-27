import axios from "axios";
import firebase from "firebase";
import {fb} from '../../firebase'
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";


fb.auth().onAuthStateChanged(function (user) {
  console.log('onAuthStateChanged')
  if (user) {
    // User is signed in.
    try {
      //Change to AsyncStorage (and may be add await)
      // let token = user.token
      // localStorage.setItem('token', token);
      localStorage.setItem('userId', user.uid);
      handleLogin(user.uid)
    } catch (error) {
      throw new Error(error);
    }
  } else {
    // User is signed out.
    console.log('SIGN OUT')
  }
})


export function authActions(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    }
    if (isLogin) {
      console.log('LOGIN')
      fb.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        throw new Error(error);
      });
    } else {
      console.log('CREATE')
      fb.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        throw new Error(error);
      });
    }

  }
}

export const handleLogin = (user) => {
  console.log('handleLogin', user)
  try {
    //STORE DATA
    // let userId = user.uid
    // dispatch({type: AUTH_SUCCESS, userId});
    return {
      type: AUTH_SUCCESS,
      userId: user
    }
  } catch (error) {
    throw new Error(error);
  }
};

export function handleLogout() {
  console.log('handleLogout')
  return async dispatch => {
    try {
      //REMOVE DATA
      // localStorage.removeItem('token')
      localStorage.removeItem('userId')

      firebase.auth().signOut().then(function () {
        return {
          type: AUTH_LOGOUT
        }
        // console.log('DDDD')
        // dispatch(logoutSuccess())
      }).catch(function (error) {
        throw new Error(error);
      });
    } catch (error) {
      throw new Error(error);
    }
  }
};

