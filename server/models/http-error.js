class HttpError extends Error {
    construtor(message, errorCode) {
        this.message = message
        this.code = errorCode
    }
}

module.exports = HttpError