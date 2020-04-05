import {USER_TAGS, REMOVE_USER_TAG, UPDATE_USER_TAGS} from "../actions/actionTypes";

const initialState = {
  tags: []
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case USER_TAGS:
      console.log('USER_TAGS')
      // console.log(action)
      return {
        ...state,
        tags: action.tags
      }
    // case REMOVE_USER_TAG:
    //   console.log('REMOVE_USER_TAG')
    //   return {
    //     ...state,
    //     tags: state.tags.filter((tag, index) => index !== action.index)
    //   }
    case UPDATE_USER_TAGS:
      console.log('UPDATE_USER_TAGS')
      return {
        ...state,
        tags: action.tags
      }
    default:
      return state
  }
}
