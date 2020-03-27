import React, {useState} from 'react';
import {StyleSheet, Text} from "react-native";
import {View} from "react-native";
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/actions/authActions";
import is from 'is_js'
import InputForm from "../../Components/UI/Input";


export const Login = ({navigation}) => {
  const dispatch = useDispatch()

  const [state, setState] = useState(
    {
      isFormValid: false,
      formControls: {
        email: {
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Введите корректный email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true
          }
        },
        password: {
          value: '',
          type: 'password',
          label: 'Пароль',
          errorMessage: 'Введите корректный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6
          }
        },
      }
    }
  )

  const loginHandler = () => {
    dispatch(authActions(state.formControls.email.value, state.formControls.password.value, true))
    navigation.navigate('Home')
  }

  const validateControl = (value, validation) => {
    if (!validation) {
      console.log('noValidation')
      return true //Если параметры не были переданы - не валидировать
    }
    let isValid = true
    if (validation.required) {
      isValid = value.trim() !== '' && isValid //Если в строке что-то сдержится и проверка еще не была зафейлена
    }
    if (validation.email) {
      isValid = is.email(value) && isValid
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const onChangeHandler = (event, controlName) => {
    const formControls = {...state.formControls} //Копия state
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)
    formControls[controlName] = control //Изменение состояния state после получений новых значений выше

    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    setState({
      formControls, isFormValid
    })
  }

  const renderInputs = () => {
    return Object.keys(state.formControls).map((controlName, index) => {
      const control = state.formControls[controlName]
      return (
        <InputForm
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation} //Преобразование в булевый тип
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
    <View style={styles.content}>

      {renderInputs()}

      <Button
        title="Submit"
        onPress={loginHandler}
      />

      <Button
        title="Create account"
        onPress={() => navigation.navigate('Registration')}
      />

    </View>

  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
