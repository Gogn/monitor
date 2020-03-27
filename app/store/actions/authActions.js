import axios from "axios";
import firebase from "firebase";
import {fb} from '../../firebase'
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";
import {useDispatch} from "react-redux";

// const dispatch = useDispatch()

fb.auth().onAuthStateChanged(function(user) {
  console.log('onAuthStateChanged')
  if (user) {
    // User is signed in.
    // try {
      //Change to AsyncStorage (and may be add await)
      // let token = user.token
      // localStorage.setItem('token', token);
      localStorage.setItem('userId', user.uid);
      authSuccess(user.uid)
    // } catch (error) {
    //   throw new Error(error);
    // }
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
      fb.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        throw new Error(error);
      });
    } else {
      fb.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        throw new Error(error);
      });
    }

  }
}

export function authSuccess(userId) {
  console.log('authSuccess')
  return {
    type: AUTH_SUCCESS,
    userId
  }
}
