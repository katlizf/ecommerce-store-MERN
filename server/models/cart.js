const mongoose = require("mongoose")

const Schema = mongoose.Schema

const cartSchema = new Schema({
	productId: {type: mongoose.Types.ObjectId, ref: "Product", require: true},
	userId: {type: mongoose.Types.ObjectId, ref: "User", require: true},
    quantity: {type: Number, require: true},
    size: {type: String}
})

module.exports = mongoose.model("Cart", cartSchema)