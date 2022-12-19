const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, ele) => sum + ele.likes, 0)
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0
    let maxBlog

    blogs.forEach(b => {
        if (b.likes > maxLikes) {
            maxBlog = b
            maxLikes = b.likes
        }
    })

    return maxBlog
}

const mostBlogs = (blogs) => {
    let authors = new Map()
    let result

    blogs.forEach(b => {
        if (!authors.get(b.author))
            authors.set(b.author, 1)
        else
            authors.set(b.author, authors.get(b.author) + 1)
    })

    const maxCount = Math.max(...authors.values())

    for (let key of authors.keys()) {
        if (authors.get(key) === maxCount) {
            result = key
        }
    }

    return {
        author: result,
        blogs: maxCount
    }
}

const mostLikes = (blogs) => {
    let authors = new Map()
    let result

    blogs.forEach(b => {
        if (!authors.get(b.author))
            authors.set(b.author, b.likes)
        else
            authors.set(b.author, authors.get(b.author) + b.likes)
    })

    const maxCount = Math.max(...authors.values())

    for (let key of authors.keys()) {
        if (authors.get(key) === maxCount) {
            result = key
        }
    }

    return {
        author: result,
        likes: maxCount
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}