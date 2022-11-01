import Input from "../../components/formElements/input/Input"
import PageContainer from '../../components/pageContainer/PageContainer'
import Button from '../../components/formElements/button/Button'
import {useCallback, useReducer} from "react"
import {VALIDATOR_MINLENGTH} from '../../components/util/Validators'

const loginReducer = (state, action) => {
    
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId] : {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
        default:
            return state
    }
}

function Login() {

    const [formState, dispatch] = useReducer(loginReducer, {
        inputs: {
           fName: {
            value: '',
            isValid: false
           },
           lName: {
            value: '',
            isValid: false
           }
        },
        // the validity of the individual inputs
        isValid: false
        // whether the entire form is valid 
    })

    const userInputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id})
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
            <Button type="submit" disabled={!formState.isValid}>Log-in</Button>
        </form>  
        </PageContainer>
        
    )
}

export default Login