import React, {useMemo, useState} from 'react'
import {Slider, Text} from "react-native-elements";
import {ScrollView, View} from "react-native";
//
// const [state, setState] = useState()
//
// const changeHandler = ({name,value}) => {
//   console.log(state)
//   setState({[name]: value})
//   return state
// }

const numbers = (props) => {
    const items = []
    for (let i = 0; i <= 10; i++) {
      items.push(<Text key={i} style={i === props.param && {fontWeight: 'bold'}}>{i}</Text>)
    }
    return items
}

export const SliderMood = (props) => {
  // console.log(props)
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '90%'}}>
      <Text>{props.name.toUpperCase()}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        {numbers(props)}
      </View>
      <Slider
        value={props.param}
        onValueChange={props.onChange}
        maximumValue={10}
        minimumValue={0}
        step={1}
        style={{width: '100%', height: 40}}
      />
    </View>
  )
}
