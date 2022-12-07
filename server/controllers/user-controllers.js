const HttpError = require('../models/http-error')
const User = require('../models/user')
const {validationResult} = require('express-validator')

// const getUsers = async (req, res, next) => {
//     let users

//     try {
//         users = await User.find()
//     } catch (err) {
//         const error = new HttpError('Fetching users failed.', 500)
//         return next(error)
//     }

//     res.json({users: users.map(users => users.toObject({getters: true}))})
// }

const getUserById = async (req, res, next) => {
    const userId = req.params.uid
    let user

    try {
        user = await User.findById(userId)
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a user.', 500)
        return next(error)
    }

    if(!user) {
        const error = new HttpError('Could not find a user with that id.', 404)
        return next(error)
    }

    res.json({user: user.toObject({getters: true})})
}

const signup = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        console.log(errors)
        return next(new HttpError('Invalid inputs passed, please check your data.', 422))
    } 

    const {fName, lName, email, password, address, city, state, zipCode} = req.body
    
    let existingUser

    try {
        existingUser = await User.findOne({email})
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again later.', 500)
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError('User already exists, please login instead.', 422)
        return next(error)
    }

    const createdUser = new User({
        fName,
        lName,
        email,
        password,
        // need to encrypt password later
        address,
        city,
        state,
        zipCode,
        products: []
        // adding relationship between user and products
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again.', 500)
        return next(error)
    }

    res.status(201).json({user: createdUser.toObject({getters: true})})
}

const login = async (req, res, next) => {
    const {email, password} = req.body
    let existingUser

    try {
        existingUser = await User.findOne({email})
    } catch (err) {
        const error = new HttpError('Logging in failed, please try again later.', 500)
        return next(error)
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError('Invalid credentials, could not log you in.', 401)
        return next(error)
    }

    res.json({message: 'Logged in!'})
}

// exports.getUsers = getUsers
exports.getUserById = getUserById
exports.signup = signup
exports.login = login