import {Button, Input, Overlay, Text} from "react-native-elements";
import {StyledView} from "../../theme";
import {View} from "react-native";
import React, {useState} from "react";

export const OverlayInput = ({overlay, onPress}) => {
  const [newTagInput, setNewTagInput] = useState()

  return (
    <Overlay isVisible={overlay}>
      <StyledView>
        <Text h4>Type what you are take</Text>
        <Input
          onChangeText={text => setNewTagInput(text)}
          value={newTagInput}
          autoFocus={true}
        />
        <View style={{marginTop: 20}}>
          <Button
            title={'Submit'}
            onPress={() => {
              onPress(newTagInput)
              setNewTagInput()
            }}
          />
        </View>
      </StyledView>
    </Overlay>
  )
}
