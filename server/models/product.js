const mongoose = require("mongoose")

const Schema = mongoose.Schema

const productsSchema = new Schema({
	productName: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},
	anime: {type: String, required: true},
	image: {type: String, required: true},
	type: {type: String, required: true},
	user: [{type: mongoose.Types.ObjectId, ref: "User"}],
	// adding relationship between user and products
})

module.exports = mongoose.model("Product", productsSchema)