import React, {useMemo, useState} from 'react';
import {db} from '../../firebase';
import 'firebase/firestore';
import {Text, Button} from "react-native-elements";
import {ScrollView, View} from "react-native";
import {SliderMood} from "../../Components/UI/SliderMood";

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

  const onChangeHandler = (event, param) => {
    console.log(param,' ',event)
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
    <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>

      <View>
        <Text h2>{isoDate.toISOString().slice(0, 10)}</Text>
      </View>

      <ScrollView contentContainerStyle={{
        // flex: 1,
        // flexGrow: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        justifyContent: 'space-between'
      }}>
        {renderSliders()}

        <Button
          title={'state'}
          onPress={() => console.log(state)}
        />

      </ScrollView>
    </View>
  )
}
