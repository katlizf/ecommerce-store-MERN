const express = require('express')
const bodyParser = require('body-parser')

const productRoutes = require('./routes/product-routes')
const userRoutes = require('./routes/user-routes')
const HttpError = require('./models/http-error')

const app = express()


app.use('/api/products', productRoutes)

app.use(bodyParser.json())

app.use('/api/users', userRoutes)

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404)
    throw error
})
// to handle errors for unsupported routes

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'And unknown error occurred!'})
})


app.listen(5000)