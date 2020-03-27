import {Text, View} from "react-native";
import React from "react";
import {Button} from "react-native-elements";
import {useDispatch} from "react-redux";
import {handleLogout} from "../../store/actions/authActions";

export const Settings = ({navigation}) => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(handleLogout()).then(asd => {
      navigation.navigate('Login')
    })
  }

  return (
    <View>
      <Button
        title="Log Out"
        onPress={logoutHandler}
      />
    </View>
  )
}
