const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
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




