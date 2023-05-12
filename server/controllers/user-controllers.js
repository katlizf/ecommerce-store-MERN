const HttpError = require("../models/http-error")
const User = require("../models/user")
const {validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const fs = require("fs")

const getUserById = async (req, res, next) => {
	const userId = req.params.uid
	let user

	try {
		user = await User.findById(userId)
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not find a user.",
			500
		)
		return next(error)
	}

	if (!user) {
		const error = new HttpError(
            "Could not find a user with that id.",
            404
        )
		return next(error)
	}

	res.json({user: user.toObject({getters: true})})
}

const signup = async (req, res, next) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return next(
			new HttpError(
                "Invalid inputs passed, please check your data.",
                422
            )
		)
	}

	const {fName, lName, email, password, address, city, state, zipCode} = req.body

	let existingUser

	try {
		existingUser = await User.findOne({email})
	} catch (err) {
		const error = new HttpError(
			"Signing up failed, please try again later.",
			500
		)
		return next(error)
	}

	if (existingUser) {
		const error = new HttpError(
			"User already exists, please login instead.",
			422
		)
		return next(error)
	}

    let hashedPassword

    try {
        hashedPassword = await bcrypt.hash(password, 12)
        // 12 is the number of salting rounds
    } catch (err) {
        const error = new HttpError(
            "Could not create user, please try again.",
            500
        )
        return next(error)
    }
    
    

	const createdUser = new User({
		fName,
		lName,
		email,
		password: hashedPassword,
		address,
		city,
		state,
		zipCode,
		image: req.file.path,
		products: [],
		// adding relationship between user and products
	})

	try {
		await createdUser.save()
	} catch (err) {
		const error = new HttpError(
            "Signing up failed, please try again.",
            500
        )
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
		const error = new HttpError(
			"Logging in failed, please try again later.",
			500
		)
		return next(error)
	}

	if (!existingUser || existingUser.password !== password) {
		const error = new HttpError(
			"Invalid credentials, could not log you in.",
			401
		)
		return next(error)
	}

	res.status(200).json({user: existingUser.toObject({getters: true})})
}

const updateUserProfile = async (req, res, next) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return next(
			new HttpError(
                "Invalid inputs, please check your inputs.",
                422
            )
		)
	}

	const {fName, lName, email, password, address, city, state, zipCode} =
		req.body
	const userId = req.params.uid

	let user

	try {
		user = await User.findById(userId)
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not update information.",
			500
		)
		return next(error)
	}

	user.fName = fName
	user.lName = lName
	user.email = email
	user.password = password
	user.address = address
	user.city = city
	user.state = state
	user.zipCode = zipCode

	try {
		await user.save()
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not update information.",
			500
		)
		return next(error)
	}

	res.status(200).json({user: user.toObject({getters: true})})
}

const deleteUser = async (req, res, next) => {
	const userId = req.params.uid

	let user
	try {
		user = await User.findById(userId)
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not delete user.",
			500
		)
		return next(error)
	}

	if (!user) {
		const error = new HttpError(
            "Could not find use for this id.",
            404
        )
		return next(error)
	}

    const imagePath = user.image

	try {
		const sess = await mongoose.startSession()
		sess.startTransaction()
		await user.remove({session: sess})
		await sess.commitTransaction()
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not delete uses.",
			500
		)
		return next(error)
	}

    fs.unlink(imagePath, err => {
        console.log(err)
    })
    // to delete image along with user

	res.status(200).json({message: "Deleted user."})
}

exports.getUserById = getUserById
exports.signup = signup
exports.login = login
exports.updateUserProfile = updateUserProfile
exports.deleteUser = deleteUser