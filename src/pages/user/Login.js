import Input from "../../components/input/Input"
import PageContainer from '../../components/pageContainer/PageContainer'

function Login() {
    return (
        <PageContainer className="login">
          <form>
            <Input type="text" label="First Name: " />
        </form>  
        </PageContainer>
        
    )
}

export default Login