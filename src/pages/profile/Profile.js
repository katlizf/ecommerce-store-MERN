import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {useHttpClient} from "../../hooks/HttpHook"
import ErrorModel from "../../components/uiElements/ErrorModal"
import LoadingSpinner from "../../components/uiElements/LoadingSpinner"
import UserDetails from "../../components/user/UserDetails"
import PageContainer from "../../components/pageContainer/PageContainer"

function Profile() {
    
	const [userProfile, setUserProfile] = useState()
	const {isLoading, error, sendRequest, clearError} = useHttpClient()

	const userId = useParams().userId

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await sendRequest(
					`http://localhost:5000/api/users/user/${userId}`
				)

				setUserProfile(response.user)
			} catch (err) {}
		}
		fetchUserProfile()
	}, [sendRequest, userId])

	return (
		<PageContainer>
			<ErrorModel error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner />}
			{!isLoading && userProfile && (
				<div>
					<UserDetails {...userProfile} />
				</div>
			)}
		</PageContainer>
	)
}

export default Profile