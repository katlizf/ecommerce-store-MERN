import {useReducer} from 'react'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: true
                // need to replace with validation logic later
            };
        default:
            return state;
    }
}

function Input(props) {

    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false})

    const changeHandler = e => {
        dispatch({type: 'CHANGE', val: e.target.value})
    }

    return (
        <div className={`form-control ${!inputState.isValid && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                value={inputState.value} />
            {!inputState.isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input