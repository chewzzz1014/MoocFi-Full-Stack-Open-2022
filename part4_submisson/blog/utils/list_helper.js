const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, ele) => sum + ele)
}

module.exports = {
    dummy,
    totalLikes
}