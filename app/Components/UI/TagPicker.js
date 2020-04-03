import React, {useEffect, useMemo, useState} from 'react';
import {AsyncStorage, Button, Text, View} from "react-native";
import styled from "styled-components/native";
import {StyledView} from "../../theme";
import {db} from "../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {tagsOfUser} from "../../store/actions/authActions";

export const TagPicker = () => {
  const store = useSelector(state => state.authReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    const getTags = async () => {
      console.log('getTags')
      await dispatch(tagsOfUser())
    }
    getTags()
  }, [])

  const renderTags =()=> {
    console.log('renderTags')
    // store.tags &&
    return store.tags.map((tag, index) =>{
      return (
        <TagText key={index}>
          {tag}
        </TagText>
      )
    })
  }

  return (
    <Container>

      <InputTagView>
        <TagText>
          asdasdasd
        </TagText>
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
