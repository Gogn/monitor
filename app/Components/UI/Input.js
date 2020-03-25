import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import {Input} from "react-native-elements";

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched //Если контрол не валидированный и мы должны его валидировать и уже его потрогали - значит, что он невалидный
}

const InputForm = props => {

  const inputType = props.type || 'text' //text - по умолчанию
  // const cls = [classes.Input]
  const htmlFor = `${inputType}-${Math.random()}` //Генерация индентефикатора для связывания в htmlFor (label - for)

  // if (isInvalid(props)) {
  //   cls.push(classes.invalid)
  // }

//   const [iconName, setIconName] = useState(
//   switch (props.type) {
//     case 'email':
//       return 'user'
//     case 'password':
//       return 'lock'
//     default:
//       return 'error'
//   }
// )

    const Icons = (type) => {
      let icon;
    switch (type) {
      case 'email':
        icon = 'user'
        break
      case 'password':
        icon = 'lock'
        break
      default:
        icon = 'error'
    }
      return (
        <Icon
          name={icon}
          size={24}
          color='black'
        />
      )
  }

  // const onKeyPressHandler = e => {
  //   if {e.keyCode === 13} {
  //
  //   }
  // }

  return (
    <Input
      leftIcon={Icons(props.type)}
      placeholder={props.label}
      type={inputType}
      value={props.value}
      errorStyle={{color: 'red'}}
      errorMessage={!props.valid ? props.errorMessage : null}
      id={htmlFor}
      onChange={props.onChange}
      // onKeyPress={onKeyPressHandler}
    />
  )
}

export default InputForm
