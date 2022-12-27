const mongoose = require('mongoose')

const blogSchame = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchame)

module.exports = Blog