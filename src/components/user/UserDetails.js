import React, {useContext, useState} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {useHttpClient} from '../../hooks/HttpHook'
import PageContainer from '../pageContainer/PageContainer'
import Button from '../formElements/button/Button'
import ErrorModal from '../uiElements/ErrorModal'
import LoadingSpinner from '../uiElements/LoadingSpinner'


function UserDetails({id, fName, lName, email, password, address, city, state, zipCode}) {

    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const auth = useContext(AuthContext)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    return (
        <React.Fragment>
            <h1>Profile</h1>
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
                {/* <Button onClick={deleteWarningHandler}>Delete</Button> */}
            </div>            
        </React.Fragment>
    )
}

export default UserDetails