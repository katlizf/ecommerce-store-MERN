import Input from "../../components/formElements/input/Input"
import Button from '../../components/formElements/button/Button'
import {useCallback, useReducer, useState} from "react"
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_PASSWORD} from '../../components/util/Validators'

const registerReducer = (state, action) => {
    
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId] : {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
        default:
            return state
    }
}

function Auth() {

    const [isLoginMode, setIsLoginMode] = useState(true)

    const [formState, dispatch] = useReducer(registerReducer, {
        inputs: {
           fName: {
            value: '',
            isValid: false
           },
           lName: {
            value: '',
            isValid: false
           }
        },
        // the validity of the individual inputs
        isValid: false
        // whether the entire form is valid 
    })

    const userInputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id})
    }, [])
    // using useCallback to prevent an infinite loop with the useEffect in the input component

    const submitHandler = e => {
        e.preventDefault()
        console.log(formState.inputs)
        // will later send to db
    }

    const switchModeHandler = () => {
        setIsLoginMode(prevMode => !prevMode)
    }

    return (
        <div className="auth">
          <form className="auth-form" onSubmit={submitHandler}>
            {!isLoginMode && 
                <div>
                    <Input
                    id="fName"
                    type="text"
                    label="First Name: "
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Please enter your first name."
                    onInput={userInputHandler} />
                    <Input
                        id="lName"
                        type="text"
                        label="Last Name: "
                        validators={[VALIDATOR_REQUIRE]}
                        errorText="Please enter your last name."
                        onInput={userInputHandler} />
                </div>
            }
            <Input
                id="email"
                type="text"
                label="Email: "
                validators={[VALIDATOR_EMAIL]}
                errorText="Please enter a valid email address."
                onInput={userInputHandler} />
            <Input
                id="password"
                type="text"
                label="Password: "
                validators={[VALIDATOR_PASSWORD]}
                errorText="Please enter your password."
                onInput={userInputHandler} />
            <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'Register' : 'Login'}</Button>
        </form>
            <Button inverse onClick={switchModeHandler}>Switch To {!isLoginMode ? 'Login' : 'Register'}</Button>  
        </div>
    )
}

export default Auth