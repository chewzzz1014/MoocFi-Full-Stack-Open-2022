const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const { PORT, MONGODB_URI } = require('./utils/config')
const blogRoutes = require('./routes/blogs')
const userRoutes = require('./routes/users')
const loginRoutes = require('./routes/login')
const { errorHandler, requestLogger, unknownEndpoint, tokenExtractor } = require('./utils/middleware')
const app = express()

mongoose
    .connect(MONGODB_URI)
    .then('mongo connected')

// middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use(tokenExtractor)
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)
app.use('/api/login', loginRoutes)

// middleware
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app