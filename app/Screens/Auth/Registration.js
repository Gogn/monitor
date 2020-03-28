import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from "react-native";
import {View} from "react-native";
import {Button, CheckBox} from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/actions/authActions";
import is from 'is_js'
import InputForm from "../../Components/UI/Input";


export const Registration = ({navigation}) => {
  const dispatch = useDispatch()

  const [state, setState] = useState(
    {
      isFormValid: false,
      checked: false,
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
        passwordAgain: {
          value: '',
          type: 'password',
          label: 'Re-enter password',
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

  const [errorMessage, setErrorMessage] = useState()

  //Set isFormValid and setErrorMessage (passwords)
  useEffect(() => {
    let isFormValid = true
    Object.keys(state.formControls).forEach(name => {
      isFormValid = (state.formControls[name].valid & state.checked & (state.formControls.password.value === state.formControls.passwordAgain.value)) && isFormValid
    })
    setState({
      ...state, isFormValid
    })
    if (state.formControls.password.value === state.formControls.passwordAgain.value) {
      setErrorMessage(null)
    } else {
      setErrorMessage('Passwords mismatch')
    }
  },[state.formControls, state.checked])

  const registrationHandler = () => {
    dispatch(authActions(state.formControls.email.value, state.formControls.password.value, false))
      .then(() => navigation.navigate('Loading'))
      .catch(function (error) {
        setErrorMessage(error.message)
        // debugger
        // console.log(error)
      })
  }

  const validateControl = (value, validation) => {
    console.log('validateControl')
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
      console.log('minlength')
      isValid = value.length >= validation.minLength && isValid
      console.log(isValid)
    }

    return isValid
  }

  const onChangeHandler = (event, controlName) => {
    const formControls = {...state.formControls}
    const control = {...formControls[controlName]}

    control.value = event && event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)
    formControls[controlName] = control //Изменение состояния state после получений новых значений выше

    let isFormValid = true
    console.log('onChangeHandler')
    Object.keys(formControls).forEach(name => {
      isFormValid = (formControls[name].valid & state.checked) && isFormValid
    })

    setState({
      ...state, formControls
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

      <Text style={{color: 'red'}}>{errorMessage}</Text>

      <CheckBox
        title='By clicking sign up button, you agree to our Terms of Service'
        checked={state.checked}
        onPress={() => setState({...state, checked: !state.checked})}
        />

      <Button
        title="Submit"
        onPress={registrationHandler}
        disabled={!state.isFormValid}
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
