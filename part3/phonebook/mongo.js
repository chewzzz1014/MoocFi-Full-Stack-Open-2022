const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://chewzzz:${password}@cluster0.myodohn.mongodb.net/?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// mongoose
//     .connect(url)
//     .then((result) => {
//         console.log('mongodb connected')

//         const note = new Note({
//             content: 'HTML is easy',
//             date: new Date(),
//             important: true,
//         })
//         return note.save()
//     })
//     .then(() => {
//         console.log('Note saved to database!')
//         return mongoose.connection.close()
//     })
//     .catch((err) => console.log(err))

mongoose
    .connect(url)
    .then(() => {
        console.log('mongo connected')
    })

async function createNote() {
    try {
        const note = new Note({
            content: 'HTML is important',
            date: new Date(),
            important: true,
        })
        await note.save()
        console.log('note saved!')
        return mongoose.connection.close()
    } catch (err) {
        console.log(err)
    }
}

createNote()