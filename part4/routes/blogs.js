const Blog = require('../models/blog')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         res.json(blogs)
    //     })
    try {
        const foundBlogs = await Blog.find({})
        res.json(foundBlogs)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    const blog = new Blog(req.body)

    // blog
    //     .save()
    //     .then(result => {
    //         res.status(201).json(result)
    //     })
    try {
        const result = await blog.save()
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
})

module.exports = router