const mongoose = require('mongoose')

const blogSchame = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchame)

module.exports = Blog