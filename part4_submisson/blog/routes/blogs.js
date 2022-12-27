const Blog = require('../models/blog')
const express = require('express')
const router = express.Router()

// we are using express-async-errors library. No try-catch block needed

router.get('/', async (req, res, next) => {
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         res.json(blogs)
    //     })
    //try {
    const foundBlogs = await Blog.find({})
    res.json(foundBlogs)
    //} catch (err) {
    //    next(err)
    // }
})

router.get('/:id', async (req, res, next) => {
    const foundBlog = await Blog.find({ _id: req.params.id })
    res.json(foundBlog)
})

router.post('/', async (req, res, next) => {
    const blog = new Blog(req.body)

    // blog
    //     .save()
    //     .then(result => {
    //         res.status(201).json(result)
    //     })
    //try {
    const result = await blog.save()
    res.status(201).json(result)
    // } catch (err) {
    //     next(err)
    // }
})

router.delete('/:id', async (req, res, next) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204)
})

module.exports = router