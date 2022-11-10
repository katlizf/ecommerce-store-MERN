const express = require('express')

const productControllers = require('../controllers/product-controllers')

const router = express.Router()


router.get('/', productControllers.getAllProducts)

router.get('/:pid', productControllers.getProductById)


module.exports = router