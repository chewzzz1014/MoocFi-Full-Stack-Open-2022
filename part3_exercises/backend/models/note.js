const mongoose = require('mongoose')
const password = process.env.PASSWORD
const url = process.env.MONGODB_URI || `mongodb+srv://chewzzz:${password}@cluster0.myodohn.mongodb.net/?retryWrites=true&w=majority`

console.log(url)

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

// do not return __v (mongo versioning field) to the frontend
noteSchema.set('toJson', {
    tranform: (doc, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
