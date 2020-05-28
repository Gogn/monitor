import {AsyncStorage} from "react-native";
import {db} from "../../firebase";
import {SET_SELECTED_TAGS, UPDATE_USER_TAGS, USER_TAGS} from "./actionTypes";

export const tagsOfUser = () => {
  console.log('tagsOfUser')
  return async dispatch => {
    let userId = await AsyncStorage.getItem('userId')

    return db.collection('users').doc(userId)
      .get().then(function (doc) {
        return dispatch(user_tags(doc.data().tags))
      })

  }
}

export const updateTags = (tags) => {
  console.log('updateTags')
  return async dispatch => {
    let userId = await AsyncStorage.getItem('userId')

    let tagsToDB = []
    tags.length > 7 ? (tagsToDB = tags.slice(1, tags.length)) : tagsToDB = tags

    return db.collection('users').doc(userId)
      .set({tags: tagsToDB}, {merge: true})
      .then(() => {
        return dispatch(update_user_tags(tagsToDB))
      })
  }
}

const user_tags = (tags) => {
  return {
    type: USER_TAGS,
    tags: tags
  }
}

export const update_user_tags = (tags) => ({
  type: UPDATE_USER_TAGS,
  index: tags
})

export const tagsToStore = (tags) => {
  console.log('setSelectedTags')
  return async dispatch => {
    return tags_to_store(tags)
  }
}

 export const tags_to_store = (tags) => {
   console.log('tags_to_store')
  return {
    type: SET_SELECTED_TAGS,
    selectedTags: tags
  }
}