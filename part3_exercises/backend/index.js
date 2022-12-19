const express = require('express')
const morgan = require('morgan')
const { notes } = require("./data")
const Note = require('./models/note')
const notesRouter = require('./routes/notes')
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = express()

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

// middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

// notes routes
app.use('/api/notes', notesRouter)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// error middleware
app.use((err, req, res, next) => {
    res.status(400).send(`Error: ${err}`)
    next()
})

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})