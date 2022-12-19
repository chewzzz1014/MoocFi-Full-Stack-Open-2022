const { listWithOneBlog } = require('../utils/test_data')
const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('most favorite blog', () => {
    test('blog with the most likes', () => {
        const result = favoriteBlog(listWithOneBlog)

        expect(result).toEqual({
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        })
    })
})