const mongoose = require("mongoose")

const Schema = mongoose.Schema

const cartSchema = new Schema({
	product: {type: mongoose.Types.ObjectId, ref: "Product", require: true},
	user: {type: mongoose.Types.ObjectId, ref: "User", require: true},
    size: {type: String}
})

module.exports = mongoose.model("Cart", cartSchema)