const Blog = require('../models/blog')
const User = require('../models/user')
const { getTokenFrom, tokenExtractor, userExtractor } = require('../utils/middleware')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// we are using express-async-errors library. No try-catch block needed

router.get('/', tokenExtractor, userExtractor, async (req, res) => {
    const foundBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(foundBlogs)
})

router.get('/:id', async (req, res, next) => {
    const foundBlog = await Blog.findOne({ _id: req.params.id })
    res.status(200).json(foundBlog)
})


router.post('/', tokenExtractor, userExtractor, async (req, res, next) => {
    const { body } = req

    const user = req.user
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

router.put('/:id', tokenExtractor, userExtractor, async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findById(id)
    blog.likes++

    const savedBlog = await blog.save()
    res.json(savedBlog)
})

router.delete('/:id', tokenExtractor, userExtractor, async (req, res) => {
    const { id } = req.params

    const blog = await Blog.findById(id)
    const userInBlog = blog.user.map(u => u._id)
    const loginedUser = req.user
    console.log(blog)
    console.log(userInBlog)

    if (userInBlog.map(i => i.toString()).includes(loginedUser._id.toString())) {
        // delete blog from blog array under user document
        userInBlog.forEach(async (u) => {
            const user = await User.findById(u)
            user.blogs = user.blogs.filter(b => b.id.toString() !== id.toString())
            await user.save()
        })

        // delete blog from blog document
        await Blog.deleteOne({ _id: id })

        res.status(204).json({
            operation: 'Delete Blog',
            status: 'success'
        })
    } else {
        res.status(401).send('Unauthorised Action')
    }
})

module.exports = router