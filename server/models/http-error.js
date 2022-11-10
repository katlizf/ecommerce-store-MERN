class HttpError extends Error {
    construtor(message, errorCode) {
        super(message)
        this.code = errorCode
    }
}

module.exports = HttpError