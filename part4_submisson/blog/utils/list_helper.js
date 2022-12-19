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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}