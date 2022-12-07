const express = require('express')
const morgan = require('morgan')

// allow for cross origin sharing
const cors = require('cors')

const app = express()
app.use(cors())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

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

app.get("/info", (req, res) => {
    const r = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
    res.send(r)
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(e => e.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).send("404 Person Not Found")
    }
})

function generateId() {
    return Math.floor(Math.random() * 5000) + 300;
}

app.post("/api/persons", (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        res.status(400).json({
            error: 'Name and Number is required'
        })
    }

    const foundPerson = persons.find(e => e.name === body.name)
    if (foundPerson) {
        res.status(400).json({
            error: "Name must be unique"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    res.status(204).end
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(e => e.id !== id)

    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})