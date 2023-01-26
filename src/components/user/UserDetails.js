import React, {useContext, useState} from "react"
import {AuthContext} from "../../context/AuthContext"
import {useHttpClient} from "../../hooks/HttpHook"
import {useHistory} from "react-router-dom"
import Button from "../formElements/Button"
import ErrorModal from "../uiElements/ErrorModal"
import LoadingSpinner from "../uiElements/LoadingSpinner"
import Modal from "../uiElements/Modal"
import Avatar from "../uiElements/Avatar"

function UserDetails({
	id,
	fName,
	lName,
	email,
	password,
	address,
	city,
	state,
	zipCode,
	image,
}) {
	const {isLoading, error, sendRequest, clearError} = useHttpClient()
	const auth = useContext(AuthContext)
	const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [toggled, setToggled] = useState(false)
	let history = useHistory()

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true)
	}

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false)
	}

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false)
		try {
			await sendRequest(
				`http://localhost:5000/api/users/user/${id}`,
				"DELETE"
			)
			history.push("/")
			auth.logout()
		} catch (err) {}
	}

    const userPassword = document.getElementById("password")

    const toggle = e => {
        e.preventDefault()
        const type = userPassword.getAttribute("type") === "password" ? "text" : "password"
        userPassword.setAttribute("type", type)
        setToggled(current => !current)
    }

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner />}
			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header="Are you sure?"
				footer={
					<React.Fragment>
						<Button onClick={cancelDeleteHandler}>Cancel</Button>
						<Button onClick={confirmDeleteHandler}>Delete</Button>
					</React.Fragment>
				}
			>
				<p>
					Do you want to proceed and delete your account? Please note
					that this cannot be undone.
				</p>
			</Modal>
			<div className="profile-info">
				<Avatar
					id="profile-pic"
					image={`http://localhost:5000/${image}`}
					alt={fName}
				/>
				<div className="cust-name">
					<h2 className="profile-detail">
						{fName} {lName}
					</h2>
				</div>
				<p className="section-name">Login</p>
				<div className="login">
					<h2 className="profile-detail">Email:   {email}</h2>
                    <div className="pswd-eye-toggle">
                        <h2 className="profile-detail">Password: </h2>
                        <input 
                            id="password"
                            className="profile-detail"
                            type="password"
                            readOnly
                            value={password}>
                        </input>
                        <i id="eye-toggle" className={toggled ? "fa-solid fa-eye" : "fa-sharp fa-solid fa-eye-slash"} onClick={toggle}></i>
                    </div>
				</div>
				<p className="section-name">Address</p>
				<div className="address">
					<h2 className="profile-detail">{address}</h2>
					<h2 className="profile-detail">
						{city}, {state} {zipCode}
					</h2>
				</div>
				<div className="edit-delete-btn">
					<Button to={`/users/user/${id}`}>Edit</Button>
					<Button onClick={showDeleteWarningHandler}>Delete</Button>
				</div>
			</div>
		</React.Fragment>
	)
}

export default UserDetails
