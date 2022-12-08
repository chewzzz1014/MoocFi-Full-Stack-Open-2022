const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://chewzzz:${password}@cluster0.myodohn.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

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

async function createPerson(newName, newNumber) {
    try {
        const person = new Person({
            name: newName,
            number: newNumber
        })
        const addedPerson = await person.save()
        console.log(`added ${newName} number ${newNumber} to phonebook`)
        return mongoose.connection.close()
    } catch (err) {
        console.log(err)
    }
}

async function findNote() {
    try {
        const foundPersons = await Person.find({})
        console.log('phonebook: ')
        foundPersons.forEach((ele) => {
            console.log(`${ele.name} ${ele.number}`)
        })
        return mongoose.connection.close()
    } catch (err) {
        console.log(err)
    }
}

if (newName && newNumber)
    createPerson(newName, newNumber)
else
    findNote()