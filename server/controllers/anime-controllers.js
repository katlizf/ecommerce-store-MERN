const HttpError = require("../models/http-error")
const Anime = require("../models/anime")

const getAllAnime = async (req, res, next) => {
	let anime

	try {
		anime = await Anime.find()
	} catch (err) {
		const error = new HttpError("Fetching all anime failed.", 500)
		return next(error)
	}

	res.json({anime: anime.map(anime => anime.toObject({getters: true}))})
}

const getAnimeById = async (req, res, next) => {
	const animeId = req.params.aid
	let anime

	try {
		anime = await Anime.findById(animeId)
	} catch (err) {
		const error = new HttpError(
			"Something went wrong, could not find an anime.",
			500
		)
		return next(error)
	}

	if (!anime) {
		const error = new HttpError(
			"Could not find an anime for the provided id.",
			404
		)
		return next(error)
	}

	res.json({anime: anime.toObject({getters: true})})
}

exports.getAllAnime = getAllAnime
exports.getAnimeById = getAnimeById