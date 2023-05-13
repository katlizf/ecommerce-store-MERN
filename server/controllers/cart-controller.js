const HttpError = require("../models/http-error")
const Cart = require("../models/cart")
const {validationResult} = require("express-validator")
const mongoose = require("mongoose")

// const getCart = async (req, res, next) => {
//     const userId = req.params
//     let cart

//     try {
//         cart = await Cart.find({userId: userId})
//     } catch (err) {
//         const error = new HttpError(
//             "Something went wrong, could not find cart.",
//             500
//         )
//         return next(error)
//     }

//     if (!cart) {
//         const error = new HttpError("Could not find any products in your cart.", 404)
//         return next (error)
//     }

//     res.json({cart: cart.toObject({getters: true})})
// }

// const addToCart = async (req, res, next) => {
//     const errors = validationResult(req)

//     if(!errors.isEmpty()) {
//         return next(
//             new HttpError("Invalid inputs passed, please check your data.", 422)
//         )
//     }

//     const {productId, userId, quantity} = req.body

//     let existingUserCartProduct

//     const pipeline = [
//         {$match: {userId: "userId"}},
//         {$match: {productId: "productId"}}
//     ]

//     try {
//         existingUserCartProduct = await Cart.update({
//             productId: productId,
//             userId: userId,
//             quantity: quantity
//     })
//     } catch (err) {
//         const error = new HttpError(
//             "Adding product to cart failed, please try again later.", 500
//         )
//         return next(error)
//     }

//     if(existingUserCartProduct) {
//         const error = new HttpError(
//             "This product is already in your cart.", 422
//         )
//         return next(error)
//     }

//     const newCartProduct = new Cart({
//         productId,
//         userId,
//         quantity
//     })

//     // try {
//     //     await newCartProduct.save()
//     // } catch (err) {
//     //     const error = new HttpError(
//     //         "Adding product to cart failed, please try again later.", 500
//     //     )
//     //     return next(error)
//     // }

//     res.status(201).json({cartProduct: newCartProduct.toObject({getters:true})})
// }

// exports.getCart = getCart
// exports.addToCart = addToCart