/*
1. Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default. Add CSS classes to the component to help the testing as necessary.

2. Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.

3. Make a test, which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.

4. Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created. 
*/
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import AddBlogForm from './AddBlogFrom'

test('renders content', () => {
    const blog = {
        title: 'What Do You Mean',
        author: 'Mr Z',
        url: 'https://google.com'
    }

    const handleDelete = jest.fn()
    const handleLike = jest.fn()

    const { container } = render(<Blog key={'212222'} blog={blog} handleDelete={handleDelete} handleLike={handleLike} />)

    const div = container.querySelector('#blog-title-author')
    expect(div).toBeDefined()
})

/*
test('show blog url and likes after show button is clicked', async () => {
    const blog = {
        title: 'What Do You Mean',
        author: 'Mr Z',
        url: 'https://google.com'
    }

    const { container } = render(<Blog key={'212222'} blog={blog} handleDelete={handleDelete} handleLike={handleLike} />)

    const mockHandler = jest.fn()

    const user = userEvent.setup()
    const button = screen.getByText('view', { exact: false })
    await user.click(button)

    //expect(mockHandler.mock.calls).toContainElement()
})
*/

test('event handler is called twice if like button is clicked twice', async () => {
    const blog = {
        title: 'What Do You Mean',
        author: 'Mr Z',
        url: 'https://google.com'
    }

    const handleDelete = jest.fn()
    const handleLike = jest.fn()

    const { container } = render(<Blog key={'212222'} blog={blog} handleDelete={handleDelete} handleLike={handleLike} />)

    const user = userEvent.setup()
    const button = container.querySelector('#likes-btn')
    await user.click(button)
    await user.click(button)

    expect(handleLike.mock.calls).toHaveLength(2)
})

test('<AddBlogForm /> updates parent state and call', async () => {
    //const createBlog = jest.fn()
    const user = userEvent.setup()

    const addBlog = jest.fn()
    const handleBlogForm = jest.fn()

    const { container } = render(<AddBlogForm
        addBlog={addBlog}
        handleBlogForm={handleBlogForm}
        newBlog={{
            title: '',
            author: '',
            url: '',
        }}
    />)


    const input1 = container.querySelector('#title-input')
    const input2 = container.querySelector('#author-input')
    const input3 = container.querySelector('#url-input')
    const subBtn = container.querySelector('#submit-blog')

    await user.type(input1, 'Wonderful World')
    await user.type(input2, 'John White')
    await user.type(input3, 'https://google.com')
    await user.click(subBtn)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].content).toBe('Wonderful World')
    expect(addBlog.mock.calls[0][1].content).toBe('John White')
    expect(addBlog.mock.calls[0][2].content).toBe('https://google.com')
})