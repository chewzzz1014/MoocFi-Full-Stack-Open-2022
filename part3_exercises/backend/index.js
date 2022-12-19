const express = require('express')
const morgan = require('morgan')
const { notes } = require("./data")
const Note = require('./models/note')
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

function addDefaultNotes() {
    try {
        notes.forEach(async (ele, idx) => {
            const note = new Note({
                content: ele.content,
                date: ele.date,
                important: ele.important
            })
            await note.save()
            console.log('note added!')
        })
    } catch (err) {
        console.log(err)
    }
}

// middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get("/api/notes", async (req, res, next) => {
    try {
        const allNotes = await Note.find({})
        if (!allNotes || allNotes.length === 0) {
            addDefaultNotes()
        }
        res.json(allPersons)
    } catch (err) {
        next(err)
    }
    // Note.find({}).then(data => {
    //     if (data.length === 0)
    //         addDefaultNotes()
    //     res.json(data)
    // })

    // if (allNotes.length === 0)
    //     addDefaultNotes()
    // res.json(allNotes)
})

app.get("/api/notes/:id", async (req, res, next) => {
    const { id } = req.params
    // const note = notes.find(e => e.id === Number(id))

    // if (note) {
    //     res.json(note)
    // } else {
    //     res.status(404).end()
    // }
    try {
        const foundNote = await Note.findById(id)
        res.json(foundNote)
    } catch (err) {
        next(err)
    }

})

app.post("/api/notes", async (req, res, next) => {
    const body = req.body

    if (!body.content) {
        next('Content Missing')
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    try {
        const createdNote = await note.save()
        console.log('Note added!')
        res.json(createdNote)
    } catch (err) {
        next(err)
    }
})

app.put('/api/notes/:id', async (req, res, next) => {
    const { id } = req.params
    const body = req.body


    try {
        // run mongoose validator before updating
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { content: body.content, date: new Date() },
            { new: true, runValidators: true, context: 'query' }
        )
        console.log(updatedNote)
        res.json({
            operation: 'update contacts',
            status: 'success',
            data: updatedNote
        })
    } catch (err) {
        next(err)
    }
})

app.delete('/api/notes/:id', async (req, res, next) => {
    const id = Number(req.params.id)

    try {
        const removedNote = await Person.findOneAndDelete({ _id: id })
        res.json({
            operation: 'deletion',
            status: 'success',
            data: removedNote
        })
    } catch (err) {
        next(err)
    }
    // notes = notes.filter(note => note.id !== id)

    // res.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use((err, req, res, next) => {
    res.status(400).send(`Error: ${err}`)
    next()
})

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})