const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const persons = require('./data')
const Person = require('./models/person')

// allow for cross origin sharing
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

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
        const foundPerson = await Person.findById(mongoose.Types.ObjectId(id));
        res.json(foundPerson)
    } catch (err) {
        res.status(404).send(`404: Contacts with ID ${id} Not Found!`)
    }
})

app.post("/api/persons", async (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        res.status(400).json({
            error: 'Name and Number is required'
        })
    }

    const foundPerson = await Person.findOne({ name: body.name })
    if (foundPerson) {
        const updatedPerson = await Person.findOneAndUpdate({ name: body.name }, { number: body.number }, { new: true })
        console.log(updatedPerson)
        res.json({
            operation: 'update contacts',
            status: 'success',
            data: updatedPerson
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

app.put("/api/persons/:id", async (req, res) => {
    const { id } = req.params
    const body = req.body

    const updatedPerson = await Person.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { number: body.number }, { new: true })
    console.log(updatedPerson)

    res.json({
        operation: 'update contacts',
        status: 'success',
        data: updatedPerson
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

app.delete("/api/persons/delete/:name", async (req, res) => {
    const { name } = req.params
    const result = await Person.deleteMany({ name: name })
    res.json({
        operation: 'deletions by name',
        status: 'success',
        result: result
    })
})

// error handling middleware
app.use((err, req, res, next) => {
    console.log(err.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(err)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})