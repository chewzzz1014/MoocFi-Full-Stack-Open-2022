const Blog = require('../models/blog')
const User = require('../models/user')
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
    const foundBlog = await Blog.findOne({ _id: req.params.id })
    res.status(200).json(foundBlog)
})


// title: {
//     type: String,
//         required: true
// },
// author: String,
//     url: String,
//         likes: Number,
//             user: {
//     type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
// }

router.post('/', async (req, res, next) => {
    const { body } = req

    const user = await User.findById(body.userId)

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
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = router