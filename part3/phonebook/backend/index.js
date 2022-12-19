const express = require('express')
const morgan = require('morgan')
const persons = require('./data')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const personRoute = require('./routes/person')

// allow for cross origin sharing
const cors = require('cors')

const app = express()
app.use(cors())
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

app.use('/api/persons', personRoute)

app.get('/info', (req, res) => {
    const r = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
    res.send(r)
})

app.use(middleware.unknownEndpoint)

// error handling middleware
app.use(middleware.errorHandler)


app.listen(config.PORT, () => {
    console.log(`Server running at port ${config.PORT}`)
})