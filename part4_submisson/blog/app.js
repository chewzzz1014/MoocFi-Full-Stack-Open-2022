const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { PORT, MONGODB_URI } = require('./utils/config')
const blogRoutes = require('./routes/blogs')
const { errorHandler, requestLogger, unknownEndpoint } = require('./utils/middleware')
const app = express()

mongoose
    .connect(MONGODB_URI)
    .then('mongo connected')

// middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogRoutes)

// middleware
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app