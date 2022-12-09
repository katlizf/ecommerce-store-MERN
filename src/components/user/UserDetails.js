import PageContainer from '../pageContainer/PageContainer'

function UserDetails({fName, lName, email, password, address, city, state, zipCode}) {
    return (
        <PageContainer>
            <h1>Profile</h1>
            <h2>{fName}</h2>
            <h2>{lName}</h2>
            <h2>{email}</h2>
            <h2>{password}</h2>
            <h2>{address}</h2>
            <h2>{city}</h2>
            <h2>{state}</h2>
            <h2>{zipCode}</h2>            
        </PageContainer>
    )
}

export default UserDetails