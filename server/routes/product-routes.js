const express = require("express")

const productControllers = require("../controllers/product-controllers")

const router = express.Router()

router.get("/", productControllers.getAllProducts)

router.get("/apparel", productControllers.getAllApparel)

router.get("/collectables", productControllers.getAllCollectables)

router.get("/:pid", productControllers.getProductById)

router.get("/add-to-cart/:pid", productControllers.addToCart)

router.get("/user/:uid", productControllers.getProductsByUserId)

router.delete("/pid", productControllers.deleteProduct)

module.exports = router