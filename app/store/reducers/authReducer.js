import {AUTH_LOGOUT, AUTH_SUCCESS, USER_TAGS, REMOVE_USER_TAG} from "../actions/actionTypes";

const initialState = {
  userId: null,
  tags: []
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
      console.log('AUTH_LOGOUT')
      return {
        ...state,
        userId: null
      }
    case USER_TAGS:
      console.log('USER_TAGS')
      // console.log(action)
      return {
        ...state,
        tags: action.tags
      }
    case REMOVE_USER_TAG:
      console.log('REMOVE_USER_TAG')
      return {
        ...state,
        tags: state.tags.filter((tag, index) => index !== action.index)
      }
    default:
      return state
  }
}
