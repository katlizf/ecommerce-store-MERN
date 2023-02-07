import {useCallback, useReducer} from "react"

const formReducer = (state, action) => {
	switch (action.type) {
		case "INPUT_CHANGE":
			let formIsValid = true
			for (const inputId in state.inputs) {
				if (!state.inputs[inputId]) {
					continue
					// skip the inputId and go to the next instead of running the next statements when I don't have to
				}
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
					[action.inputId]: {
						value: action.value,
						isValid: action.isValid,
					},
				},
				isValid: formIsValid,
			}
		case "SET_DATA":
			return {
				inputs: action.inputs,
				isValid: action.formIsValid,
			}
		default:
			return state
	}
}

export const useForm = (initialInputs, initialFormValidity) => {
	const [formState, dispatch] = useReducer(formReducer, {
		inputs: initialInputs,
		// the validity of the individual inputs
		isValid: initialFormValidity,
		// whether the entire form is valid
	})

	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({
			type: "INPUT_CHANGE",
			value: value,
			isValid: isValid,
			inputId: id,
		})
	}, [])

	const setFormData = useCallback((inputData, formValidity) => {
		dispatch({
			type: "SET_DATA",
			inputs: inputData,
			formIsValid: formValidity,
		})
	}, [])
	// using useCallback to prevent an infinite loop with the useEffect in the input component

	return [formState, inputHandler, setFormData]
}