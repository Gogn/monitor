import {AsyncStorage} from "react-native";
import {db} from "../../firebase";
import {UPDATE_USER_TAGS, USER_TAGS} from "./actionTypes";

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

export const updateTags =(tags)=>{
  console.log('updateTags')
  return async dispatch => {
    let userId = await AsyncStorage.getItem('userId')

    tags.length > 7 && tags.splice(0,1)

    return db.collection('users').doc(userId)
      .set({tags: tags}, { merge: true })
      .then(()=>{ return dispatch(update_user_tags(tags)) })
  }
}

const user_tags = (tags) => {
  return {
    type: USER_TAGS,
    tags: tags
  }}

export const update_user_tags = (tags) => ({
  type: UPDATE_USER_TAGS,
  index: tags
})

