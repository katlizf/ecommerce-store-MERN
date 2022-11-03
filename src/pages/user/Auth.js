import Input from "../../components/formElements/input/Input"
import Button from '../../components/formElements/button/Button'
import {AuthContext} from "../../components/context/AuthContext"
import {useForm} from "../../hooks/FormHook"
import {useState, useContext} from "react"
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_PASSWORD, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../../components/util/Validators'

function Auth() {

    const auth = useContext(AuthContext)

    const [formState, userInputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const [isLoginMode, setIsLoginMode] = useState(true)

    const authSubmitHandler = e => {
        e.preventDefault()
        console.log(formState.inputs)
        // will later send to db
        auth.login()
    }

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                fName: undefined,
                lName: undefined,
                address: undefined,
                aptEtc: undefined,
                city: undefined,
                state: undefined,
                ZipCode: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                fName: {
                    value: '',
                    isValid: false
                },
                lName: {
                    value: '',
                    isValid: false
                },
                address: {
                    value: '',
                    isValid: false
                },
                aptEtc: {
                    value: '',
                    isValid: true
                },
                city: {
                    value: '',
                    isValid: false
                },
                state: {
                    value: '',
                    isValid: false
                },
                zipCode: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    return (
        <div className="auth">
          <form className="auth-form" onSubmit={authSubmitHandler}>
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
                        id="address"
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
                type="password"
                label="Password: "
                validators={[VALIDATOR_PASSWORD]}
                errorText="Please enter your password. It should include at least 1 uppercase, 1 lowercase, 1 number, & 1 special character."
                onInput={userInputHandler} />
            <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'Login' : 'Register'}</Button>
        </form>
            <Button inverse onClick={switchModeHandler}>Switch To {!isLoginMode ? 'Login' : 'Register'}</Button>  
        </div>
    )
}

export default Auth