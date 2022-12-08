const express = require('express')
const mongoose = require('mongoose')
const { notes } = require("./data")
const app = express()

const password = process.argv[2] || process.env.PASSWORD

// set up mongo
const url = `mongodb+srv://chewzzz:${password}@cluster0.myodohn.mongodb.net/?retryWrites=true&w=majority`

mongoose
    .connect(url)
    .then(() => {
        console.log('mongo connected')
    })
    .catch((err) => {
        console.log(err)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

function addDefaultNotes() {
    try {
        notes.forEach(async (ele, idx) => {
            const note = new Note({
                id: idx + 1,
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

app.get("/api/notes", async (req, res) => {
    const allNotes = await Note.find({})
    if (allNotes.length === 0)
        addDefaultNotes()
    res.json(allNotes)
})

app.get("/api/notes/:id", (req, res) => {
    const { id } = req.params
    const note = notes.find(e => e.id === Number(id))

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

function generateId() {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}

app.post("/api/notes", (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({
            error: 'Content Missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }
    notes = notes.concat(note)
    res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})