const express = require('express')
const bodyParser = require('body-parser')

const productRoutes = require('./routes/product-routes')

const app = express()


app.use('/api/products', productRoutes)


app.listen(5000)