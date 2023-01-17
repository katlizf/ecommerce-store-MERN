const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

const productRoutes = require('./routes/product-routes')
const userRoutes = require('./routes/user-routes')
const animeRoutes = require('./routes/anime-routes')
const HttpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json())

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})
// for handling CORS errors

app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)

app.use('/api/anime', animeRoutes)

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404)
    throw error
})
// to handle errors for unsupported routes

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err)
        })
    }
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'And unknown error occurred!'})
})

mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ecommerceapp.54y8xqa.mongodb.net/ecommerce?retryWrites=true&w=majority`)
    .then(() => {app.listen(5000)})
    .catch(err => {console.log(err)})