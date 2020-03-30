import React from "react";
import {Button} from "react-native-elements";
import {useDispatch} from "react-redux";
import {handleLogout} from "../../store/actions/authActions";
import {StyledView} from "../../theme";

export const Settings = ({navigation}) => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(handleLogout()).then(asd => {
      navigation.navigate('Login')
    })
  }

  return (
    <StyledView>
      <Button
        title="Log Out"
        onPress={logoutHandler}
      />
    </StyledView>
  )
}
