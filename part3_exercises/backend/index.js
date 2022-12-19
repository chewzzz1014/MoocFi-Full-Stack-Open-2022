const express = require('express')
const morgan = require('morgan')
const { notes } = require("./data")
const Note = require('./models/note')
const notesRouter = require('./routes/notes')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const app = express()


// middleware
app.use(express.json())
app.use((morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
})))
app.use(middleware.requestLogger)

// main route
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

// notes routes
app.use('/api/notes', notesRouter)

// middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})