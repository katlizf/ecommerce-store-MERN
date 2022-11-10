const express = require('express')
const bodyParser = require('body-parser')

const productRoutes = require('./routes/product-routes')

const app = express()


app.use('/api/products', productRoutes)

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'And unknown error occurred!'})
})


app.listen(5000)