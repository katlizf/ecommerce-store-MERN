import Input from "../../components/formElements/input/Input"
import PageContainer from '../../components/pageContainer/PageContainer'

function Login() {
    return (
        <PageContainer className="login">
          <form>
            <Input type="text" label="First Name: " validators={[]} errorText="Please enter a valid response." />
        </form>  
        </PageContainer>
        
    )
}

export default Login