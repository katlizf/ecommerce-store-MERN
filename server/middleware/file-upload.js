const multer = require("multer")
const {v4: uuid} = require("uuid")

const MIME_TYPE_MAP = {
	"image/png": "png",
	"image/jpg": "jpg",
	"image/jpeg": "jpeg",
}

const fileUpload = multer({
	limits: 500000,
    // in bytes
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, "uploads/images")
		},
		fileName: (req, file, cb) => {
			const ext = MIME_TYPE_MAP[file.mimetype]
			// extracting the right extension
			cb(null, uuid() + "." + ext)
		},
	}),
	fileFilter: (req, file, cb) => {
		const isValid = !!MIME_TYPE_MAP[file.mimetype]
		let error = isValid ? null : new Error("Invalid mime type.")
		cb(error, isValid)
	},
})

module.exports = fileUpload