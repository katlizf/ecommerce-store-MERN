import Input from "../../components/formElements/input/Input"
import PageContainer from '../../components/pageContainer/PageContainer'
import {VALIDATOR_REQUIRE} from '../../components/util/Validators'

function Login() {
    return (
        <PageContainer className="login">
          <form>
            <Input
                type="text"
                label="First Name: "
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid response." />
        </form>  
        </PageContainer>
        
    )
}

export default Login