const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const url = `mongodb+srv://chewzzz:${process.env.PASSWORD}@cluster0.myodohn.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (v) {
                return /^\d{2, 3}-\d{1,}$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    }
})

const Person = mongoose.model('Person', personSchema)


mongoose
    .connect(url)
    .then(() => {
        console.log('mongo connected')
    })


module.exports = Person