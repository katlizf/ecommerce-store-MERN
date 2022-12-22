import {AuthContext} from "../../context/AuthContext"
import {useForm} from "../../hooks/FormHook"
import {useHttpClient} from "../../hooks/HttpHook"
import React, {useState, useContext} from "react"
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_PASSWORD, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../../util/Validators'
import Input from "../../components/formElements/Input"
import Button from '../../components/formElements/Button'
import ErrorModal from '../../components/uiElements/ErrorModal'
import LoadingSpinner from '../../components/uiElements/LoadingSpinner'
import PageContainer from '../../components/pageContainer/PageContainer'


function Auth() {

    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const {isLoading, error, sendRequest, clearError} = useHttpClient()


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

        if (isLoginMode) {
            try {
               const response = await sendRequest(
                'http://localhost:5000/api/users/login',
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {'Content-Type': 'application/json'}
            )
            auth.login(response.user.id)
            } catch (err) {}
        } else {
            try {
                const response = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    JSON.stringify({
                        fName: formState.inputs.fName.value,
                        lName: formState.inputs.lName.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                        address: formState.inputs.address.value,
                        city: formState.inputs.city.value,
                        state: formState.inputs.state.value,
                        zipCode: formState.inputs.zipCode.value
                    }),
                    {'Content-Type': 'application/json'} 
                )
                auth.login(response.user.id)
            } catch (err) {}
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

    return (
        <PageContainer>
            <ErrorModal error={error} onClear={clearError} />
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
        </PageContainer>

    )
}

export default Auth