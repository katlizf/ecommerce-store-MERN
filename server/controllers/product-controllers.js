const HttpError = require('../models/http-error')
const Product = require('../models/product')


const getAllProducts = async (req, res, next) => {
    let products
    
    try {
        products = await Product.find()
    } catch (err) {
        const error = new HttpError('Fetching products failed.', 500)
        return next(error)
    } 

    res.json({products: products.map(product => product.toObject({getters: true}))})
}

const getProductById = async (req, res, next) => {
    const productId = req.params.pid
    let product

    try {
       product = await Product.findById(productId) 
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a product.', 500)
        return next(error)
    }
    
    if (!product) {
        const error = new HttpError('Could not find a product for the provided id.', 404)
        return next(error)
    }

    res.json({product: product.toObject({getters: true})})
    // getters, add an id property to the created object
}

exports.getAllProducts = getAllProducts
exports.getProductById = getProductById