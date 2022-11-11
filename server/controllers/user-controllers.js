const {v4: uuid} = require('uuid')

const HttpError = require('../models/http-error')

const DUMMY_USERS = [
    {
        id: 'u1',
        fName: 'Katie',
        lName: 'Anderson',
        email: 'katie@gmail.com',
        password: 'OneTwo34!',
        address: '400 Tree Ln',
        aptEtc: '',
        city: 'Milwaukee',
        state: 'WI',
        zipCode: 53202
    }
]

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS})
}

const signup = (req, res, next) => {
    const {fName, lName, email, password, address, aptEtc, city, state, zipCode} = req.body

    const hasUser = DUMMY_USERS.find(u => u.email === email)

    if (hasUser) {
        return next(new HttpError('Could not create user, email already exists', 422))
    }

    const createdUser = {
        id: uuid(),
        fName,
        lName,
        email,
        password,
        address,
        aptEtc,
        city,
        state,
        zipCode
    }
    DUMMY_USERS.push(createdUser)
    res.status(201).json({user: createdUser})
}

const login = (req, res, next) => {
    const {email, password} = req.body

    const identfiedUser = DUMMY_USERS.find(u => u.email === email)

    if (!identfiedUser || identfiedUser.password !== password) {
        return next(new HttpError('We do not recognize that email address or password.', 401))
    }
    res.json({message: 'Logged in!'})
}


exports.getUsers = getUsers
exports.signup = signup
exports.login = login