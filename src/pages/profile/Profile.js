import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttpClient} from '../../hooks/HttpHook'
import ErrorModel from '../../components/uiElements/ErrorModal'
import LoadingSpinner from '../../components/uiElements/LoadingSpinner'
import UserDetails from '../../components/user/UserDetails'

function Profile() {

    const [userProfile, setUserProfile] = useState()
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    const userId = useParams().userId

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/users/user/${userId}`)

                setUserProfile(response.user)
                console.log(response)
                console.log(userProfile)
            } catch (err) { }
        }
        fetchUserProfile()
    }, [sendRequest, userId])

    return (
        <div>
            <UserDetails {...userProfile} />
        </div>
    )
}

export default Profile