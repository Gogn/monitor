import React, {useEffect, useMemo, useState} from 'react';
import {AsyncStorage, TouchableOpacity, View} from "react-native";
import styled from "styled-components/native";
import {StyledView} from "../../theme";
import {db} from "../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {tagsOfUser, remove_user_tag} from "../../store/actions/authActions";
import {Text, Button, Overlay, Input} from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {OverlayInput} from "./OverlayInput";

export const TagPicker = () => {
  const store = useSelector(state => state.authReducer)
  const dispatch = useDispatch()

  const [availableTags, setAvailableTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [i, seti] = useState()
  const [overlay, setOverlay] = useState(false)


  useEffect(() => {
    const getTags = async () => {
      console.log('getTags')
      await dispatch(tagsOfUser())
      seti(1)
    }
    getTags()
  }, [])

  useEffect(() => {
    console.log('effect of i')
    setAvailableTags(store.tags)
  }, [i])


  const renderTags = () => {
    return useMemo(() => {
      console.log('renderTags')
      return availableTags.map((tag, index) => {
        return (
          <TagText
            key={index}
            onPress={() => {
              // dispatch(remove_user_tag(index))
              setAvailableTags(availableTags.filter((tag, i) => i !== index))
              setSelectedTags([...selectedTags, tag])
            }}
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
    setSelectedTags([...selectedTags, newTagInput])
  }

  return (
    <Container>

      <OverlayInput
        overlay={overlay}
        onPress={(event) => overlayInputHandler(event)}
      />

      <Button title={'store'} onPress={() => {
        console.log(store.tags)
      }}/>

      <InputTagView>
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
padding: 4px;
border: 1px black;
flex: 1;
align-items: flex-start;
justify-content: center;
width: 100%;
margin-bottom: 10px;
`

const TagView = styled.View`
flex: 1;
flex-direction: row;
`

const TagText = styled.Text`
text-align: center;
font-size: 18px;
background-color: lightblue;
border-radius: 16px;
margin-right: 10px;
padding: 2px 10px 2px 10px;
`
const AddTagTO = styled.TouchableOpacity`
justify-content: center;
align-items: center;
background-color: lightblue;
width: 40px;
height: 28px;
border-radius: 16px;
`
