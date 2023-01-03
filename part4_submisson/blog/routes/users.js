// user route
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const users = await User.findById(req.params.id)
    res.json(users)
})

router.post('/', async (req, res) => {
    const { username, name, password } = req.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return res.status(400).json({
            error: 'username must be unique'
        })
    }

    if (username.length < 3 || password.length < 3) {
        return res.status(400).json({
            error: 'username and password must contain at least 3 characters'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

module.exports = router