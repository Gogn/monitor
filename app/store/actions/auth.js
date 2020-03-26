import axios from "axios";
import firebase from "firebase";
import {fb} from '../../firebase'
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";


// export function auth(email, password, isLogin) {
//   return async dispatch => {
//     const authData = {
//       email, password,
//       returnSecureToken: true
//     }
//
//     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDeCAKBPR-EhLSeRMtp1guqN_ZjO7QWvSQ'
//     if (isLogin) {
//       url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDeCAKBPR-EhLSeRMtp1guqN_ZjO7QWvSQ'
//     }
//
//     console.log('authData: ', authData)
//
//     const response = await axios.post(url, authData)
//     const data = response.data
//     // console.log('data: ', data)
//
//     const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
//
//     try {
//       //Change to AsyncStorage
//       await localStorage.setItem('token', data.idToken);
//       await localStorage.setItem('userId', data.localId);
//       dispatch(authSuccess(data.idToken))
//     } catch (error) {
//       throw new Error(error);
//     }
//
//   }
// }

fb.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user)

    try {
      //Change to AsyncStorage (and may be add await)
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.uid);
      dispatch(authSuccess(user.token))
    } catch (error) {
      throw new Error(error);
    }
  } else {
    // User is signed out.
    console.log('SIGN OUT')
  }
})



export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    }

    if (isLogin) {
      fb.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        throw new Error(error);
      });
    } else {
      fb.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        throw new Error(error);
      });
    }

  }
}

//
// export function autoLogout(time) {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(logout())
//     }, time * 1000)
//   }
// }
//
export function logout() {
  //Change to AsyncStorage
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  // AsyncStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return async dispatch => {
    const token = await AsyncStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      // const expirationDate = new Date(localStorage.getItem('expirationDate'))
      // if (expirationDate <= new Date()) {
      //   dispatch(logout())
      // } else {
        dispatch(authSuccess(token))
        // dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      // }
    }
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}
