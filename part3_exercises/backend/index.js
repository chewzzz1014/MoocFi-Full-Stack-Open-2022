const express = require('express')
const { notes } = require("./data")
const Note = require('./models/note')
const app = express()

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

app.get("/api/notes", (req, res) => {
    Note.find({}).then(data => {
        if (data.length === 0)
            addDefaultNotes()
        res.json(data)
    })

    // if (allNotes.length === 0)
    //     addDefaultNotes()
    // res.json(allNotes)
})

app.get("/api/notes/:id", async (req, res) => {
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
        res.send(`<h1>404 Note with id ${id} not found!</h1>`)
    }

})

function generateId() {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}

app.post("/api/notes", async (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({
            error: 'Content Missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        //id: generateId()
    })

    const createdNote = await note.save()
    console.log('Note added!')
    res.json(createdNote)
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