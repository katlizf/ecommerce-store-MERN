const mongoose = require("mongoose")
const HttpError = require("../models/http-error")
const Product = require("../models/product")
const Cart = require("../models/cart")

const getAllProducts = async (req, res, next) => {
	let products

	try {
		products = await Product.find()
	} catch (err) {
		const error = new HttpError(
            "Fetching products failed.",
            500
        )
		return next(error)
	}

	res.json({
		products: products.map(product => product.toObject({getters: true})),
	})
}

const getAllApparel = async (req, res, next) => {
	let apparel

	try {
		apparel = await Product.find({type: "Apparel"})
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not find apparel.",
			500
		)
		return next(error)
	}

	res.json({
		apparel: apparel.map(apparel => apparel.toObject({getters: true})),
	})
}

const getAllCollectables = async (req, res, next) => {
	let collectables

	try {
		collectables = await Product.find({type: "Collectable"})
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not find collectables.",
			500
		)
		return next(error)
	}

	res.json({
		collectables: collectables.map(collectables =>
			collectables.toObject({getters: true})
		),
	})
}

const getProductById = async (req, res, next) => {
	const productId = req.params.pid
	let product

	try {
		product = await Product.findById(productId)
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not find a product.",
			500
		)
		return next(error)
	}

	if (!product) {
		const error = new HttpError(
			"Could not find a product for the provided id.",
			404
		)
		return next(error)
	}

	res.json({product: product.toObject({getters: true})})
	// getters, add an id property to the created object
}

const addToCart = async (req, res, next) => {
    const productId = req.params.id
    const cart = new Cart(req.session.cart ? req.session.cart : {})

    Product.findById(productId, function(err, product) {
        if (err) {
            // new HttpError
        }
        cart.add(product, product.id)
        req.session.cart = cart
    })
}

const getProductsByUserId = async (req, res, next) => {
	const userId = req.params.uid
	let products

	try {
		products = await Product.filter({user: userId})
	} catch (err) {
		const error = new HttpError(
			"Fetching plaes failed, please try again later.",
			500
		)
		return next(error)
	}

	if (!products || products.length === 0) {
		return next(
			new HttpError(
				"Could not find products for the provided user id.",
				404
			)
		)
	}

	res.json({
		products: products.map(product => product.toObject({getters: true})),
	})
}

const deleteProduct = async (req, res, next) => {
	const productId = req.params.pid
	let product

	try {
		product = await Product.findById(productId).populate("user")
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not delete product.",
			500
		)
		return next(error)
	}

	if (!product) {
		const error = new HttpError("Could not find product for this id.", 404)
		return next(error)
	}

	try {
		const sess = await mongoose.startSession()
		sess.startTransaction()
		product.remove({session: sess})
		product.user.products.pull(product)
		await product.user.save({session: sess})
		await sess.commitTransaction()
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not delete product.",
			500
		)
		return next(error)
	}

	res.status(200).json({message: "Deleted product"})
}

// need controller for user to add a product to their cart?

exports.getAllProducts = getAllProducts
exports.getAllApparel = getAllApparel
exports.getAllCollectables = getAllCollectables
exports.getProductById = getProductById
exports.addToCart = addToCart
exports.getProductsByUserId = getProductsByUserId
exports.deleteProduct = deleteProduct