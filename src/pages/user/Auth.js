import Input from "../../components/formElements/input/Input"
import Button from '../../components/formElements/button/Button'
import {useCallback, useReducer, useState} from "react"
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_PASSWORD, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../../components/util/Validators'

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
                    <Input
                        id="stAddress"
                        type="text"
                        label="Street Address: "
                        validators={[VALIDATOR_REQUIRE]}
                        errorText="Please enter your street address."
                        onInput={userInputHandler} />
                    <Input
                        id="aptEtc"
                        type="text"
                        label="Apt, suite, etc. (optional): "
                        placeholder='Apt. 123'
                        onInput={userInputHandler} />
                    <Input
                        id="city"
                        type="text"
                        label="City: "
                        validators={[VALIDATOR_REQUIRE]}
                        errorText="Please enter the city name."
                        onInput={userInputHandler} />
                    <Input
                        id="state"
                        type="text"
                        label="State: "
                        validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(2)]}
                        errorText="Please enter your state's abbreviation (2 letters)."
                        onInput={userInputHandler} />
                    <Input
                        id="zipCode"
                        type="text"
                        label="Zip Code: "
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter your 5-digit zip code."
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
                errorText="Please enter your password. It should include at least 1 uppercase, 1 lowercase, 1 number, & 1 special character."
                onInput={userInputHandler} />
            <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'Register' : 'Login'}</Button>
        </form>
            <Button inverse onClick={switchModeHandler}>Switch To {!isLoginMode ? 'Login' : 'Register'}</Button>  
        </div>
    )
}

export default Auth