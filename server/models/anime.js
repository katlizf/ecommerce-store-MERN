const mongoose = require("mongoose")

const Schema = mongoose.Schema

const animeSchema = new Schema({
	animeName: {type: String, required: true},
})

module.exports = mongoose.model("Anime", animeSchema)