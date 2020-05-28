import React, {useMemo, useState} from 'react';
import {db} from '../../firebase';
import 'firebase/firestore';
import {Text, Button} from "react-native-elements";
import {ScrollView, View} from "react-native";
import styled from "styled-components/native";
import {SliderMood} from "../../Components/UI/SliderMood";
import {StyledView} from "../../theme";
import {TagPicker} from "../../Components/UI/TagPicker";

const dataOfUser = () => {
  let user = () => {
    db.collection('data')
      .where('mood', '==', 6)
      .get().then(function (s) {
      s.forEach(function (d) {
        console.log(d.data())
      })
    })
  }
  {
    user()
  }
}

const pushDataToServer = () => {

}

export const Home = () => {
  let isoDate = new Date()
  const [state, setState] = useState(
    {
      mood: 0,
      energy: 0,
      anxiety: 0,
      caution: 0,
      memory: 0,
      anger: 0,
      sleep: 0,
    }
  )

  const onChangeHandler = (event, param) => {
    // console.log(param,' ',event)
    // console.log(state)
    setState({...state, [param]: event})
  }

  const renderSliders = () => {
    return useMemo(() => {
      console.log('renderSliders (useMemo)')
      return Object.keys(state).map((param, index) => {
        return (
          <SliderMood
            key={index}
            name={param}
            param={state[param]}
            onChange={event => onChangeHandler(event, param)}
          />
        )
      })
    }, [])
  }

  return (
    <StyledView>

      <Container>
        <Text h2>{isoDate.toISOString().slice(0, 10)}</Text>
      </Container>

      <ScrollView contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      >
        {renderSliders()}

        <TagPicker/>

        <Button
          title={'Submit'}
          onPress={() => {
            console.log(store.tags)
          }}
        />

      </ScrollView>
    </StyledView>
  )
}

const Container = styled.View`
align-items: center;
justify-content: center;
margin-top: 20px;
`
