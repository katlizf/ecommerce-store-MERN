const express = require('express')
const {check} = require('express-validator')

const usersController = require('../controllers/user-controllers')

const router = express.Router()

router.get('/user/:uid', usersController.getUserById)

router.post('/signup', 
    [
        check('fName').not().isEmpty().withMessage('First name is required'),
        check('lName').not().isEmpty().withMessage('Last name is required'),
        check('email').normalizeEmail().isEmail().withMessage('Valid email is required'),
        check('password').isLength({min: 8}).withMessage('Password should be at least 8 characters long'),
        check('address').not().isEmpty().withMessage('Address is required'),
        check('city').not().isEmpty().withMessage('City is required'),
        check('state').isLength({min: 2, max: 2}).withMessage('State should be a 2 letter abbreviation'),
        check('zipCode').isLength({min: 5, max: 5}).withMessage('Zip code should be five digits long')
    ],
    usersController.signup)

router.patch('/:uid', 
    [
        check('fName').not().isEmpty().withMessage('First name is required'),
        check('lName').not().isEmpty().withMessage('Last name is required'),
        check('email').normalizeEmail().isEmail().withMessage('Valid email is required'),
        check('password').isLength({min: 8}).withMessage('Password should be at least 8 characters long'),
        check('address').not().isEmpty().withMessage('Address is required'),
        check('city').not().isEmpty().withMessage('City is required'),
        check('state').isLength({min: 2, max: 2}).withMessage('State should be a 2 letter abbreviation'),
        check('zipCode').isLength({min: 5, max: 5}).withMessage('Zip code should be five digits long')
    ],
    usersController.updateUserProfile)

router.post('/login', usersController.login)

module.exports = router