import Input from "../../components/formElements/input/Input"
import Button from '../../components/formElements/button/Button'
import ErrorModal from '../../components/uiElements/ErrorModal'
import LoadingSpinner from '../../components/uiElements/LoadingSpinner'
import {AuthContext} from "../../context/AuthContext"
import {useForm} from "../../hooks/FormHook"
import React, {useState, useContext} from "react"
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_PASSWORD, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../../util/Validators'

function Auth() {

    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

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

    const authSubmitHandler = async e => {
        e.preventDefault()
        setIsLoading(true)

        if (isLoginMode) {
            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                })
                const responseData = await response.json()
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                setIsLoading(false)
                auth.login()
            } catch (err) {
                setIsLoading(false)
                setError(err.message || 'Something went wrong, please try again.')
            }
        } else {
            try {
                const response = await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fName: formState.inputs.fName.value,
                        lName: formState.inputs.lName.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                        address: formState.inputs.address.value,
                        city: formState.inputs.city.value,
                        state: formState.inputs.state.value,
                        zipCode: formState.inputs.zipCode.value
                    })
                })
                const responseData = await response.json()
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                setIsLoading(false)
                auth.login()
            } catch (err) {
                setIsLoading(false)
                setError(err.message || 'Something went wrong, please try again.')
            }

        }
    }

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                fName: undefined,
                lName: undefined,
                address: undefined,
                city: undefined,
                state: undefined,
                zipCode: undefined
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

    const errorHandler = () => {
        setError(null)
        // null to clear it
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            <div className="auth">
                {isLoading && <LoadingSpinner asOverlay />}
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
                                label="Address: "
                                validators={[VALIDATOR_REQUIRE]}
                                errorText="Please enter your street address."
                                onInput={userInputHandler} />
                            <Input
                                id="city"
                                type="text"
                                label="City: "
                                validators={[VALIDATOR_REQUIRE]}
                                errorText="Please enter your city name."
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
                        errorText="Your password must be at least 8 characters long and should include at least 1 uppercase, 1 lowercase, 1 number, & 1 special character."
                        onInput={userInputHandler} />
                    <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'Login' : 'Register'}</Button>
                </form>
                <Button inverse onClick={switchModeHandler}>Switch To {!isLoginMode ? 'Login' : 'Register'}</Button>
            </div>
        </React.Fragment>

    )
}

export default Auth