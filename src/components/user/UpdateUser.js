import React, {useContext, useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"
import {useHttpClient} from "../../hooks/HttpHook"
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
	VALIDATOR_MAXLENGTH,
	VALIDATOR_EMAIL,
	VALIDATOR_PASSWORD,
} from "../../util/Validators"
import {useForm} from "../../hooks/FormHook"
import Button from "../formElements/Button"
import Input from "../formElements/Input"
import ErrorModal from "../uiElements/ErrorModal"
import LoadingSpinner from "../uiElements/LoadingSpinner"
import PageContainer from "../pageContainer/PageContainer"

function UpdateUser() {

	const [userProfile, setUserProfile] = useState()
    const [toggled, setToggled] = useState(false)
	const {isLoading, error, sendRequest, clearError} = useHttpClient()
	const auth = useContext(AuthContext)
	const userId = useParams().userId
	const history = useHistory()

	const [formState, inputHandler, setFormData] = useForm(
		{
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
		},
		false
	)

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await sendRequest(
					`http://localhost:5000/api/users/user/${userId}`
				)
				setUserProfile(response.user)
				setFormData(
					{
						fName: {
							value: response.user.fName,
							isValid: true,
						},
						lName: {
							value: response.user.lName,
							isValid: true,
						},
						email: {
							value: response.user.email,
							isValid: true,
						},
						password: {
							value: response.user.password,
							isValid: true,
						},
						address: {
							value: response.user.address,
							isValid: true,
						},
						city: {
							value: response.user.city,
							isValid: true,
						},
						state: {
							value: response.user.state,
							isValid: true,
						},
						zipCode: {
							value: response.user.zipCode,
							isValid: true,
						},
					},
					true
				)
			} catch (err) {}
		}
		fetchUserProfile()
	}, [sendRequest, userId, setFormData])

	const profileUpdateSubmitHandler = async e => {
		e.preventDefault()

		try {
			const formData = new FormData()
			formData.append("fName", formState.inputs.fName.value)
			formData.append("lName", formState.inputs.lName.value)
			formData.append("email", formState.inputs.email.value)
			formData.append("password", formState.inputs.password.value)
			formData.append("address", formState.inputs.address.value)
			formData.append("city", formState.inputs.city.value)
			formData.append("state", formState.inputs.state.value)
			formData.append("zipCode", formState.inputs.zipCode.value)
			await sendRequest(
				`http://localhost:5000/api/users/user/${userId}`,
				"PATCH",
				formData
			)
			history.push("/" + auth.userId + "/Profile")
			// redirct to Profile
			console.log(formState.inputs.image.value)
		} catch (err) {}
	}

	if (isLoading) {
		return (
			<div>
				<LoadingSpinner asOverlay />
			</div>
		)
	}

	if (!userProfile && !error) {
		return (
			<div>
				<h2>Could not find profile.</h2>
			</div>
		)
	}

    const password = document.getElementById("password")

    const toggle = e => {
        e.preventDefault()
        const type = password.getAttribute("type") === "password" ? "text" : "password"
        password.setAttribute("type", type)
        setToggled(current => !current)
    }

	return (
		<PageContainer>
			<ErrorModal error={error} onClear={clearError} />
			{!isLoading && userProfile && (
				<form className="edit-profile-form" onSubmit={profileUpdateSubmitHandler}>
					<Input
						id="fName"
                        className="editable-detail"
						element="input"
						type="text"
						label="First Name: "
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter your first name."
						onInput={inputHandler}
						value={userProfile.fName}
						initialValid={true}
					/>
					<Input
						id="lName"
                        className="editable-detail"
						element="input"
						type="text"
						label="Last Name: "
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter your last name."
						onInput={inputHandler}
						value={userProfile.lName}
						initialValid={true}
					/>
					<Input
						id="email"
                        className="editable-detail"
						element="input"
						type="text"
						label="Email: "
						validators={[VALIDATOR_EMAIL()]}
						errorText="Please enter a valid email address."
						onInput={inputHandler}
						value={userProfile.email}
						initialValid={true}
					/>
                    <div className="paswd-toggle">
                        <Input
                            id="password"
                            className="editable-detail"
                            element="input"
                            type="password"
                            label="Password: "
                            validators={[VALIDATOR_PASSWORD()]}
                            errorText="Your password must be at least 8 characters long and should include at least 1 uppercase, 1 lowercase, 1 number, & 1 special character."
                            onInput={inputHandler}
                            value={userProfile.password}
                            initialValid={true}
                        />
                        <i id="eye-toggle" className={toggled ? "fa-solid fa-eye" : "fa-sharp fa-solid fa-eye-slash"} onClick={toggle}></i>
                    </div>
					<Input
						id="address"
                        className="editable-detail"
						element="input"
						type="text"
						label="Address: "
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter your street address."
						onInput={inputHandler}
						value={userProfile.address}
						initialValid={true}
					/>
					<Input
						id="city"
                        className="editable-detail"
						element="input"
						type="text"
						label="City: "
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter your city name."
						onInput={inputHandler}
						value={userProfile.city}
						initialValid={true}
					/>
					<Input
						id="state"
                        className="editable-detail"
						element="input"
						type="text"
						label="State: "
						validators={[
							VALIDATOR_MINLENGTH(2),
							VALIDATOR_MAXLENGTH(2),
						]}
						errorText="Please enter your state's abbreviation (2 letters)."
						onInput={inputHandler}
						value={userProfile.state}
						initialValid={true}
					/>
					<Input
						id="zipCode"
                        className="editable-detail"
						element="input"
						type="text"
						label="Zip Code: "
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText="Please enter your 5-digit zip code."
						onInput={inputHandler}
						value={userProfile.zipCode}
						initialValid={true}
					/>
                    <div className="update-cancel-btns">
					    <Button to={`/${userId}/Profile`}>Cancel</Button>
                        <Button type="submit" disabled={!formState.isValid}>
						    Update Profile
					    </Button>
                    </div>
				</form>
			)}
		</PageContainer>
	)
}

export default UpdateUser