const totalLikes = require('../utils/list_helper').totalLikes
const { listWithOneBlog } = require('../utils/test_data')

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)

        expect(result).toBe(36)
    })
})