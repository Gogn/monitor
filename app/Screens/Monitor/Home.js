import React, {useState} from 'react';
import {db} from '../../firebase';
import 'firebase/firestore';
import * as firebase from "firebase";
import {ParamsView, StyledView} from "../../theme";
import {Slider, Text} from "react-native-elements";

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

  return (
    <StyledView>
      <Text h2>{isoDate.toISOString().slice(0, 10)}</Text>

      {/*<ParamsView>*/}
        <Text>mood: {state.mood}</Text>
        <Slider
          value={state.mood}
          onValueChange={value => setState({...state, mood: value})}
          maximumValue={10}
          minimumValue={0}
          step={1}
          style={{ width: '90%' }}
        />
      {/*</ParamsView>*/}
    </StyledView>
  )
}
