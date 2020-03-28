import firebase from "firebase";
import {db, fb} from '../../firebase'
import 'firebase/firestore';
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";
import {useDispatch} from "react-redux";

// fb.auth().onAuthStateChanged(function (user) {
//   console.log('onAuthStateChanged')
//   if (user) {
//     // User is signed in.
//     try {
//       //Change to AsyncStorage (and may be add await)
//       localStorage.setItem('userId', user.uid);
//       handleLogin(user.uid)
//     } catch (error) {
//       throw new Error(error);
//     }
//   } else {
//     // User is signed out.
//     console.log('SIGN OUT')
//   }
// })

export function authActions(email, password, isLogin) {
  return async dispatch => {
    if (isLogin) {
      console.log('LOGIN')
      return fb.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            console.log('user: ', user)
            localStorage.setItem('userId', user.user.uid)
            dispatch(handleLogin(user.user.uid))
            db.collection('users')
              .doc(user.user.uid)
              .set({
                lastLogin: firebase.firestore.Timestamp.fromDate(new Date()),
              }, { merge: true })
              .then(() => console.log("Document successfully written!"))
          }
        )
        .catch(error => {
          // return error
          throw new Error(error);
          // console.log(error)
        });
    } else {
      console.log('CREATE')
      return fb.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            localStorage.setItem('userId', user.user.uid)
            dispatch(handleLogin(user.user.uid))
            db.collection('users')
              .doc(user.user.uid)
              .set({
                created: firebase.firestore.Timestamp.fromDate(new Date()),
                email: user.user.email,
                lastLogin: firebase.firestore.Timestamp.fromDate(new Date()),
                name: user.user.displayName,
              })
              .then(() => console.log("Document successfully written!"))
          }
        )
        .catch(function (error) {
          throw new Error(error);
          // console.log(error)
        });
    }

  }
}

export const handleLogin = (user) => {
  // const dispatch = useDispatch()
  console.log('handleLogin', user)
  try {
    //STORE DATA
    // dispatch({type: AUTH_SUCCESS, userId: user});
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
      localStorage.removeItem('userId')

      firebase.auth().signOut().then(function () {
        return {
          type: AUTH_LOGOUT
        }
      }).catch(function (error) {
        throw new Error(error);
      });
    } catch (error) {
      throw new Error(error);
    }
  }
};

