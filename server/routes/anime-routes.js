const express = require("express")

const animeControllers = require("../controllers/anime-controllers")

const router = express.Router()

router.get("/", animeControllers.getAllAnime)

router.get("/:aid", animeControllers.getAnimeById)

module.exports = router