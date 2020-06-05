import React, {useEffect, useMemo, useState} from 'react';
import {AsyncStorage, TouchableOpacity, View} from "react-native";
import styled from "styled-components/native";
import {StyledView} from "../../theme";
import {db} from "../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {tagsOfUser, remove_user_tag, updateTags, tagsToStore, tags_to_store} from "../../store/actions/appActions";
import {Text, Button, Overlay, Input} from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {OverlayInput} from "./OverlayInput";

export const TagPicker = () => {
  const auth_store = useSelector(state => state.authReducer)
  const app_store = useSelector(state => state.appReducer)

  const dispatch = useDispatch()

  const [availableTags, setAvailableTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [i, seti] = useState()
  const [overlay, setOverlay] = useState(false)

  const selectedTagsToStore = (tags) => {

  }


  useEffect(() => {
    const getTags = async () => {
      console.log('getTags')
      await dispatch(tagsOfUser())
      console.log('await dispatch(tagsOfUser())')
      seti(1)
    }
    getTags()
  }, [])

  useEffect(() => {
    console.log('effect of i, i: ',i)
    setAvailableTags(auth_store.tags)
  }, [i])

  const renderTags = () => {
    return useMemo(() => {
      // console.log('renderTags')
      return availableTags.map((tag, index) => {
        return (
          <TagText
            key={index}
            onPress={() => {
              // Remove tag from available
              setAvailableTags(availableTags.filter((tag, i) => i !== index))
              // Move tag to selected
              //Use local store
              // setSelectedTags([...selectedTags, tag])
              //Use dispatch to AppActions
              dispatch(tags_to_store([...selectedTags, tag]))
              // console.log(app_store)
            }}
            onLongPress={() => {
              // Remove tag from available
              setAvailableTags(availableTags.filter((tag, i) => i !== index))
              // Remove tag from store and from user DB
              let newAvailableTags = availableTags.filter((tag, i) => i !== index)
              dispatch(updateTags([...newAvailableTags, ...selectedTags]))
            }
            }
          >
            {tag}
          </TagText>
        )
      })
    }, [availableTags])
  }

  const renderSelectedTags = () => {
    return selectedTags.map((tag, index) => {
      return (
        <TagText
          key={index}
          onPress={() => {
            setSelectedTags(selectedTags.filter((tag, i) => i !== index))
            setAvailableTags([...availableTags, tag])
          }}
        >
          {tag}
        </TagText>
      )
    })
  }

  const overlayInputHandler = (newTagInput) => {
    setOverlay(false)
    dispatch(updateTags([...availableTags, ...selectedTags, newTagInput]))
    setSelectedTags([...selectedTags, newTagInput])
  }

  const renderOverlay =()=>{
    return useMemo(()=>{
      return (
      <OverlayInput
        overlay={overlay}
        onPress={(event) => overlayInputHandler(event)}
      />
      )
    },[overlay])
  }

  return (
    <Container>

      {renderOverlay()}

      <InputTagView style={{borderBottomColor: 'black', borderBottomWidth: 2}}>
        <TagView>

          {renderSelectedTags()}

          <AddTagTO onPress={() => {
            setOverlay(true)
          }}>
            <MaterialCommunityIcons name={'tag-plus'} size={22} color={'black'}/>
          </AddTagTO>

        </TagView>
      </InputTagView>

      <TagView>
        {renderTags()}
      </TagView>

    </Container>
  )
}

const Container = styled.View`
flex: 1;
align-items: center;
justify-content: center;
margin-top: 10px;
margin-bottom: 20px;
width: 90%;
`

const InputTagView = styled.View`
padding: 0 5px 0 5px;
flex: 1;
align-items: flex-start;
justify-content: center;
width: 100%;
margin-bottom: 10px;
`

const TagView = styled.View`
flex: 1;
flex-direction: row;
flex-wrap: wrap;
`

const TagText = styled.Text`
text-align: center;
font-size: 18px;
background-color: lightblue;
border-radius: 16px;
margin: 5px 5px 5px 0;
padding: 2px 10px 2px 10px;
`
const AddTagTO = styled.TouchableOpacity`
justify-content: center;
align-items: center;
background-color: lightblue;
width: 40px;
height: 28px;
border-radius: 16px;
margin: 5px 5px 5px 0;
`
