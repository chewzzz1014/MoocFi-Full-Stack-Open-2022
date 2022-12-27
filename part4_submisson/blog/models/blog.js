const mongoose = require('mongoose')

const blogSchame = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Blog = mongoose.model('Blog', blogSchame)

module.exports = Blog