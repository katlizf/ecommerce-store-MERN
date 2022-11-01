import {useReducer} from 'react'
import {validate} from '../../util/Validators'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
            ...state,
            isTouched: true,
            }
        }
        default:
            return state;
    }
}

function Input(props) {

    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false})

    const changeHandler = e => {
        dispatch({type: 'CHANGE', val: e.target.value, validators: props.validators})
    }

    const touchHandler = () => {
        dispatch({type: 'TOUCH'})
    }

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value} />
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input