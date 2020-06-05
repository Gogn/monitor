import {USER_TAGS, REMOVE_USER_TAG, UPDATE_USER_TAGS, SET_SELECTED_TAGS} from "../actions/actionTypes";

const initialState = {
  tags: [],
  selectedTags: []
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    // case REMOVE_USER_TAG:
    //   console.log('REMOVE_USER_TAG')
    //   return {
    //     ...state,
    //     tags: state.tags.filter((tag, index) => index !== action.index)
    //   }
    case USER_TAGS:
      console.log('USER_TAGS')
      return {
        ...state,
        tags: action.tags
      }
    case UPDATE_USER_TAGS:
      console.log('UPDATE_USER_TAGS')
      return {
        ...state,
        tags: action.tags
      }
    case SET_SELECTED_TAGS:
      console.log('SET_SELECTED_TAGS')
      // console.log(action.selectedTags)
      return {
        ...state,
        selectedTags: [...state.selectedTags, ...action.selectedTags]
      }
    default:
      return state
  }
}
