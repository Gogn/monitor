import React, {useMemo, useState} from 'react';
import {AsyncStorage, Button, Text, View} from "react-native";
import styled from "styled-components/native";
import {StyledView} from "../../theme";
import {db} from "../../firebase";
import {useSelector} from "react-redux";



export const TagPicker = () => {
  const getStore = () => {
    const store = useSelector(state => state.authReducer)
    console.log(store)
  }

  return (
    <Container>
      <Button title={'asdasd'} onPress={getStore()}/>
      <InputTagView>
        <TagText>
          asdasdasd
        </TagText>
      </InputTagView>

      <TagView>
        <TagText>
          asd
        </TagText>
        <TagText>
          asd
        </TagText>
        <TagText>
          asd
        </TagText>
        <TagText>
          asd
        </TagText>
        <TagText>
          asd
        </TagText>
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
