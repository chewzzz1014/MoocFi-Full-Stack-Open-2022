const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Burning',
        author: 'John Park',
        url: 'https://google.com',
        likes: 20
    },
    {
        title: 'A Nightmare',
        author: 'chewzzz',
        url: 'https://google.com',
        likes: 15
    },
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'willremovethissoon'
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}