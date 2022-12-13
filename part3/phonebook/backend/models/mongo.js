const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const url = `mongodb+srv://chewzzz:${process.env.PASSWORD}@cluster0.myodohn.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)


mongoose
    .connect(url)
    .then(() => {
        console.log('mongo connected')
    })


module.exports = Person