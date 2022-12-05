const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},    
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true, minLength: 8},
    address: {type: String, require: true},
    aptEtc: {type: String, require: true},
    city: {type: String, require: true},
    state: {type: String, require: true},
    zipCode: {type: Number, require: true},
    products: [{type: mongoose.Types.ObjectId, ref: 'Product'}]
    // adding relationship between user and products
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)