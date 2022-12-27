const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb
}