const HttpError = require("../models/http-error")
const Cart = require("../models/cart")
const {validateResult} = require ("express-validator")
const mongoose = require("mongoose")

const getCart = async (req, res, next) => {
    const userId = req.params.uid
    let cart

    try {
        cart = await Cart.findById(userId)
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not find cart.",
            500
        )
        return next(error)
    }

    if (!cart) {
        const error = new HttpError("Could not find any products in the cart.", 404)
        return next (error)
    }

    res.json({cart: cart.toObject({getters: true})})
}

const addToCart = async (req, res, next) => {
    const errors = validateResult(req)

    if(!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        )
    }


}

exports.getCart = getCart
exports.addToCart = addToCart