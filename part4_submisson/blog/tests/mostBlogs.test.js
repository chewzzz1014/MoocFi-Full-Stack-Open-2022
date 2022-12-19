const { listWithOneBlog } = require('../utils/test_data')
const mostBlogs = require('../utils/list_helper').mostBlogs

describe('authors with most blogs', () => {
    test('authors with most blogs', () => {
        const result = mostBlogs(listWithOneBlog)

        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})