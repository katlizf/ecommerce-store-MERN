const HttpError = require('../models/http-error')

const DUMMY_PLACES = [
    {
        id: '1',
        productName: 'Sweatshirt',
        description: 'Black',
        price: 29.99,
        anime: 1,
        image: 'https://images.shirtspace.com/large/v2klhrD32Mlj8xUCYUsnWg%3D%3D/250529/12388-soffe-b9289-soffe-youth-classic-hooded-sweatshirt-front-black.jpg',
        type: 1
    }
]

const getAllProducts = (req, res, next) => {
    const products = DUMMY_PLACES
    res.json({products})
}

const getProductById = (req, res, next) => {
    const productId = req.params.pid
    const product = DUMMY_PLACES.find(p => {
        return p.id === productId
    })
    if (!product) {
        return next(new HttpError('Could not find a product for the product id.', 404))
    }
    res.json({product})
}

exports.getAllProducts = getAllProducts
exports.getProductById = getProductById