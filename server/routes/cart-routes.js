const express = require("express")
const {check} = require("express-validator")

const cartControllers = require("../controllers/cart-controller")

const router = express.Router()

router.get("/cart/:uid", cartControllers.getCart)

router.post("/addToCart",
    [
        check("product").not().isEmpty().withMessage("Product is required"),
        check("user").not().isEmpty().withMessage("User must be specified")
    ], cartControllers.addToCart
)

module.exports = router