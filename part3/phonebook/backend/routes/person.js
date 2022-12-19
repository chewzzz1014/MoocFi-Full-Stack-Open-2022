const express = require('express')
const persons = require('../data')
const Person = require('../models/person')
const mongoose = require('mongoose')

const router = express.Router()

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

router.get('/', async (req, res, next) => {
    try {
        const allPersons = await Person.find({})
        if (!allPersons || allPersons.length === 0) {
            addDataToServer()
        }
        res.json(allPersons)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params

    try {
        const foundPerson = await Person.findById(mongoose.Types.ObjectId(id))
        res.json(foundPerson)
    } catch (err) {
        // res.status(404).send(`404: Contacts with ID ${id} Not Found!`)
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        res.status(400).json({
            error: 'Name and Number is required'
        })
    }
    const p = new Person({
        name: body.name,
        number: body.number
    })

    try {
        await p.save()
        console.log('Added new person!')

        res.json({
            operation: 'insertion',
            status: 'success',
            data: p
        })
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const body = req.body


    try {
        // run mongoose validator before updating
        const updatedPerson = await Person.findByIdAndUpdate(
            id,
            { number: body.number },
            { new: true, runValidators: true, context: 'query' }
        )
        console.log(updatedPerson)
        res.json({
            operation: 'update contacts',
            status: 'success',
            data: updatedPerson
        })
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params

    try {
        const removedPerson = await Person.findOneAndDelete({ _id: id })
        res.json({
            operation: 'deletion',
            status: 'success',
            data: removedPerson
        })
    } catch (err) {
        next(err)
    }
})

router.delete('/delete/:name', async (req, res, next) => {
    const { name } = req.params
    try {
        const result = await Person.deleteMany({ name: name })
        res.json({
            operation: 'deletions by name',
            status: 'success',
            result: result
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router