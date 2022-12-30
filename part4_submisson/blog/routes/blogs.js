const Blog = require('../models/blog')
const User = require('../models/user')
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

// we are using express-async-errors library. No try-catch block needed

router.get('/', async (req, res, next) => {
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         res.json(blogs)
    //     })
    //try {
    const foundBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(foundBlogs)
    //} catch (err) {
    //    next(err)
    // }
})

router.get('/:id', async (req, res, next) => {
    const foundBlog = await Blog.findOne({ _id: req.params.id })
    res.status(200).json(foundBlog)
})


router.post('/', async (req, res, next) => {
    const { body } = req
    //const token = getTokenFrom(req)
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({
            error: 'token missing or invalid'
        })
    }

    console.log(decodedToken.id)
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: Number(body.likes),
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.json(savedBlog)
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({
            error: 'token missing or invalid'
        })
    }

    const blog = await Blog.findById(id)
    const userInBlog = blog.user.map(u => u.id)

    console.log(blog)
    console.log(userInBlog)

    // delete blog from blog array under user document
    userInBlog.forEach(async (u) => {
        const user = await Blog.findById(u)
        user.blogs = user.blogs.filter(b => b.id.toString() !== id.toString())
        await user.save()
    })

    // delete blog from blog document
    await Blog.deleteOne({ _id: id })

    res.status(204).end()
})

module.exports = router