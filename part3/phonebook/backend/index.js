const express = require('express')
const morgan = require('morgan')
const persons = require('./data')
const Person = require('./models/mongo')

// allow for cross origin sharing
const cors = require('cors')

const app = express()
app.use(cors())



async function addDataToServer() {
    try {
        for (let i = 0; i < persons.length; i++) {
            const e = persons[i]
            const p = new Person({
                name: e.name,
                number: e.number
            })
            await p.save()
        }
    } catch (err) {
        console.log('Error adding initialized data')
    }
}

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

app.get("/api/persons", async (req, res) => {
    try {
        const allPersons = await Person.find({})
        if (!allPersons || allPersons.length == 0) {
            addDataToServer();
        }
        res.json(allPersons)
    } catch (err) {
        console.log(err)
    }
})

app.get("/api/persons/:id", async (req, res) => {
    const { id } = req.params

    try {
        const foundPerson = await Person.findById(id);
        res.json(foundPerson)
    } catch (err) {
        return `404: Contacts with ID ${id} Not Found!`
    }
})

app.post("/api/persons", async (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        res.status(400).json({
            error: 'Name and Number is required'
        })
    }

    const foundPerson = await Person.find({ name: body.name })
    if (foundPerson) {
        res.status(400).json({
            error: "Name must be unique"
        })
    }

    const p = new Person({
        name: body.name,
        number: body.number
    })
    await p.save()
    console.log('Added new person!')

    res.json({
        operation: 'insertion',
        status: 'success',
        data: p
    })
})

app.delete("/api/persons/:id", async (req, res) => {
    const { id } = req.params
    const removedPerson = await Person.findOneAndDelete({ _id: id })
    res.json({
        operation: "deletion",
        status: 'success',
        data: removedPerson
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})