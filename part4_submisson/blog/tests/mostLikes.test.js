const { listWithOneBlog } = require('../utils/test_data')
const mostLikes = require('../utils/list_helper').mostLikes

describe('authors with most most likes', () => {
    test('authors with most likes', () => {
        const result = mostLikes(listWithOneBlog)

        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})