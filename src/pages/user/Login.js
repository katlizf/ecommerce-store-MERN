import Input from "../../components/formElements/input/Input"
import PageContainer from '../../components/pageContainer/PageContainer'
import {useCallback} from "react"
import {VALIDATOR_MINLENGTH} from '../../components/util/Validators'

function Login() {

    const userInputHandler = useCallback((id, value, isValid) => {

    }, [])
    // using useCallback to prevent an infinite loop with the useEffect in the input component

    return (
        <PageContainer className="login">
          <form>
            <Input
                id="fName"
                type="text"
                label="First Name: "
                validators={[VALIDATOR_MINLENGTH(1)]}
                errorText="Please enter your first name."
                onInput={userInputHandler} />
            <Input
                id="lName"
                type="text"
                label="Last Name: "
                validators={[VALIDATOR_MINLENGTH(1)]}
                errorText="Please enter your last name."
                onInput={userInputHandler} />
        </form>  
        </PageContainer>
        
    )
}

export default Login