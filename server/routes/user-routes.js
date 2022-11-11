const express = require('express')
const {check} = require('express-validator')

const usersController = require('../controllers/user-controllers')

const router = express.Router()


router.get('/', usersController.getUsers)

router.post('/signup', 
    [
        check('fName').not().isEmpty().withMessage('First name is required'),
        check('lName').not().isEmpty().withMessage('Last name is required'),
        check('email').not().isEmpty().withMessage('Email is required'),
        check('password').not().isEmpty().withMessage('Password is required'),
        check('address').not().isEmpty().withMessage('Address is required'),
        check('city').not().isEmpty().withMessage('City is required'),
        check('state').isLength({min: 2, max: 2}).withMessage('Two letter state abbreviation is required'),
        check('zipCode').isLength({min: 5, max: 5}).withMessage('Five-digit zip code is required')
    ],
    usersController.signup)

router.post('/login', usersController.login)


module.exports = router