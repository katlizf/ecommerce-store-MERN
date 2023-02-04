import {AuthContext} from "../../context/AuthContext"
import {useForm} from "../../hooks/FormHook"
import {useHttpClient} from "../../hooks/HttpHook"
import React, {useState, useContext} from "react"
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_EMAIL,
	VALIDATOR_PASSWORD,
	VALIDATOR_MINLENGTH,
	VALIDATOR_MAXLENGTH,
} from "../../util/Validators"
import Input from "../../components/formElements/Input"
import Button from "../../components/formElements/Button"
import ErrorModal from "../../components/uiElements/ErrorModal"
import LoadingSpinner from "../../components/uiElements/LoadingSpinner"
import PageContainer from "../../components/pageContainer/PageContainer"
import ImageUpload from "../../components/formElements/ImageUpload"

function Auth() {
	const auth = useContext(AuthContext)
	const [isLoginMode, setIsLoginMode] = useState(true)
	const {isLoading, error, sendRequest, clearError} = useHttpClient()

	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	)

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					fName: undefined,
					lName: undefined,
					address: undefined,
					city: undefined,
					state: undefined,
					zipCode: undefined,
					image: undefined,
				},
				formState.inputs.email.isValid &&
					formState.inputs.password.isValid
			)
		} else {
			setFormData(
				{
					...formState.inputs,
					fName: {
						value: "",
						isValid: false,
					},
					lName: {
						value: "",
						isValid: false,
					},
					address: {
						value: "",
						isValid: false,
					},
					city: {
						value: "",
						isValid: false,
					},
					state: {
						value: "",
						isValid: false,
					},
					zipCode: {
						value: "",
						isValid: false,
					},
					image: {
						value: null,
						isValid: false,
					},
				},
				false
			)
		}
		setIsLoginMode(prevMode => !prevMode)
	}

	const authSubmitHandler = async e => {
		e.preventDefault()

		if (isLoginMode) {
			try {
				const response = await sendRequest(
					"http://localhost:5000/api/users/login",
					"POST",
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
					{"Content-Type": "application/json"}
				)
				auth.login(response.user.id)
			} catch (err) {}
		} else {
			try {
                const response = await sendRequest(
					"http://localhost:5000/api/users/signup",
					"POST",
					JSON.stringify({
						fName: formState.inputs.fName.value,
						lName: formState.inputs.lName.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
						address: formState.inputs.address.value,
						city: formState.inputs.city.value,
						state: formState.inputs.state.value,
						zipCode: formState.inputs.zipCode.value,
						image: formState.inputs.image.value,
					}),
					{"Content-Type": "application/json"}
				)
				// const formData = new FormData()
				// formData.append("fName", formState.inputs.fName.value)
				// formData.append("lName", formState.inputs.lName.value)
				// formData.append("email", formState.inputs.email.value)
				// formData.append("password", formState.inputs.password.value)
				// formData.append("address", formState.inputs.address.value)
				// formData.append("city", formState.inputs.city.value)
				// formData.append("state", formState.inputs.state.value)
				// formData.append("zipCode", formState.inputs.zipCode.value)
				// formData.append("image", formState.inputs.image.value)
				// const response = await sendRequest(
				// 	"http://localhost:5000/api/users/signup",
				// 	"POST",
				// 	formData
				// )
				auth.login(response.user.id)
			} catch (err) {}
		}
	}

	return (
		<PageContainer>
			<ErrorModal error={error} onClear={clearError} />
			<div className="auth">
				{isLoading && <LoadingSpinner asOverlay />}
				<form className="auth-form" onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<div>
							<div className="register-name">
								<Input
									id="fName"
									type="text"
									label="First Name: "
									validators={[VALIDATOR_REQUIRE]}
									errorText="Please enter your first name."
									onInput={inputHandler}
								/>
								<Input
									id="lName"
									type="text"
									label="Last Name: "
									validators={[VALIDATOR_REQUIRE]}
									errorText="Please enter your last name."
									onInput={inputHandler}
								/>
							</div>
							<ImageUpload
								id="image"
								onInput={inputHandler}
								// errorText="Please provide an image."
							/>
							<Input
								id="address"
								type="text"
								label="Address: "
								validators={[VALIDATOR_REQUIRE]}
								errorText="Please enter your street address and apt/suite number if appropriate."
								onInput={inputHandler}
							/>
							<div className="city-state-zip-input">
								<Input
									id="city"
									type="text"
									label="City: "
									validators={[VALIDATOR_REQUIRE]}
									errorText="Please enter your city name."
									onInput={inputHandler}
								/>
								<Input
									id="state"
									type="text"
									label="State: "
									validators={[
										VALIDATOR_MINLENGTH(2),
										VALIDATOR_MAXLENGTH(2),
									]}
									errorText="Ex. WI"
									onInput={inputHandler}
								/>
								<Input
									id="zipCode"
									type="text"
									label="Zip Code: "
									validators={[VALIDATOR_MINLENGTH(5)]}
									errorText="5-digit zip code"
									onInput={inputHandler}
								/>
							</div>
						</div>
					)}
					<Input
						id="email"
						type="text"
						label="Email: "
						validators={[VALIDATOR_EMAIL]}
						errorText="Please enter a valid email address."
						onInput={inputHandler}
					/>
					<Input
						id="password"
						type="password"
						label="Password: "
						validators={[VALIDATOR_PASSWORD]}
						errorText="Your password must be at least 8 characters long and should include at least 1 uppercase, 1 lowercase, 1 number, & 1 special character."
						onInput={inputHandler}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						{isLoginMode ? "Login" : "Register"}
					</Button>
				</form>
				<Button inverse onClick={switchModeHandler}>
					Switch To {!isLoginMode ? "Login" : "Register"}
				</Button>
			</div>
		</PageContainer>
	)
}

export default Auth
