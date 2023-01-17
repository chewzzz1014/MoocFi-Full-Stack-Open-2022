const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const { PORT, MONGODB_URI, NODE_ENV } = require('./utils/config')
const blogRoutes = require('./routes/blogs')
const userRoutes = require('./routes/users')
const loginRoutes = require('./routes/login')
const { errorHandler, requestLogger, unknownEndpoint, tokenExtractor, userExtractor } = require('./utils/middleware')
const app = express()

mongoose
    .connect(MONGODB_URI)
    .then('mongo connected')

// middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

//app.use(tokenExtractor)
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)
app.use('/api/login', loginRoutes)

if (NODE_ENV === 'test') {
    const testingRouter = require('./routes/testing')
    app.use('/api/testing', testingRouter)
}

// middleware
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app