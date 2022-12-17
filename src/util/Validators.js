const VALIDATOR_TYPE_REQUIRE = 'REQUIRE'
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH'
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH'
const VALIDATOR_TYPE_EMAIL = 'EMAIL'
const VALIDATOR_TYPE_PASSWORD = 'PASSWORD'

export const VALIDATOR_REQUIRE = () => ({type: VALIDATOR_TYPE_REQUIRE})
export const VALIDATOR_MINLENGTH = val => ({
    type: VALIDATOR_TYPE_MINLENGTH,
    val: val
})
export const VALIDATOR_MAXLENGTH = val => ({
    type: VALIDATOR_TYPE_MAXLENGTH,
    val: val
})
export const VALIDATOR_EMAIL = () => ({type: VALIDATOR_TYPE_EMAIL})
export const VALIDATOR_PASSWORD = val => ({type: VALIDATOR_PASSWORD, val: val})

export const validate = (value, validators) => {
    let isValid = true
    for (const validator of validators) {
        if (validator.type === VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0
        }
        if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
            isValid = isValid && value.trim().length >= validator.val
        }
        if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
            isValid = isValid && value.trim().length <= validator.val
        }
        if (validator.type === VALIDATOR_TYPE_EMAIL) {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value)
        }
        if (validator.type === VALIDATOR_TYPE_PASSWORD) {
            isValid = isValid && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
            test(value)
            // between 8-15 characters with at least 1 uppercaser, 1 lowercase, 1 number, & 1 special character
        }
    }
    return isValid
}