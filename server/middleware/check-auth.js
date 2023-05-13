const jwt = require("jsonwebtoken")
const HttpError = require("../models/http-error")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] //Authorization: "Bearer TOKEN"
        // not from req.body because delete does not have a req.body

        if (!token) {
            throw new Error("Authentification failed.")
        }

        const decodedToken = jwt.verify(token, "secret")
        req.userData = {userId: decodedToken.userId}
        // now every request after can use the user data object and get the userId
        next()
    } catch (err) {
        const error = new HttpError(
                    "Authentication failed.",
                    401
        )
        return next(error)
    }
}