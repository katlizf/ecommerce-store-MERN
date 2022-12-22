import React, {useContext, useState} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {useHttpClient} from '../../hooks/HttpHook'
import {useHistory} from 'react-router-dom'
import Button from '../formElements/Button'
import ErrorModal from '../uiElements/ErrorModal'
import LoadingSpinner from '../uiElements/LoadingSpinner'
import Modal from '../uiElements/Modal'
import Avatar from '../uiElements/Avatar'


function UserDetails({id, fName, lName, email, password, address, city, state, zipCode, image}) {

    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const auth = useContext(AuthContext)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
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
            await sendRequest(`http://localhost:5000/api/users/user/${id}`, 'DELETE')
            history.push('/')
            auth.logout()
        } catch (err) {}
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner />}
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header='Are you sure?'
                footer={
                    <React.Fragment>
                        <Button onClick={cancelDeleteHandler}>
                            Cancel
                        </Button>
                        <Button onClick={confirmDeleteHandler}>
                            Delete
                        </Button>
                    </React.Fragment>
                }
            >
                <p>Do you want to proceed and delete your account? Please note that this cannot be undone.</p>
            </Modal>
            <h1>Profile</h1>
            <Avatar image={image} alt={fName}/>
            <h2>{fName}</h2>
            <h2>{lName}</h2>
            <h2>{email}</h2>
            <h2>{password}</h2>
            <h2>{address}</h2>
            <h2>{city}</h2>
            <h2>{state}</h2>
            <h2>{zipCode}</h2>
            <div>
                <Button to={`/users/user/${id}`}>Edit</Button>
                <Button onClick={showDeleteWarningHandler}>Delete</Button>
            </div>
        </React.Fragment >
    )
}

export default UserDetails