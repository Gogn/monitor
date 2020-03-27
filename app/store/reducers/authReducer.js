import {AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
  userId: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      console.log('AUTH_SUCCESS')
      return {
        ...state,
        userId: action.userId
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        userId: null
      }
    default:
      return state
  }
}
