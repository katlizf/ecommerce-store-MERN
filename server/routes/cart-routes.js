const express = require("express")
const {check} = require("express-validator")

// const cartControllers = require("../controllers/cart-controller")

const router = express.Router()

// router.get("/:uid", cartControllers.getCart)

// router.post("/addToCart/:uuid",
//     [
//         check("productId").not().isEmpty().withMessage("Product is required"),
//         check("userId").not().isEmpty().withMessage("User must be specified"),
//         check("quantity").not().isEmpty().withMessage("You must add at least a quantity of 1.")
//     ], cartControllers.addToCart
// )

module.exports = router