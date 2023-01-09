import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react/'
import { userEvent } from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    // use CSS selector
    //const { container } = render(<Note note={note} />)
    //const div = container.querySelector('.note')
    //expect(div).toHaveTextContent('Component testing is done with react-testing-library')

    render(<Note note={note} />)
    // looks for element that contains the text (not must be exactly same)
    const element = screen.getByText('Component testing is done with react-testing library', { exact: false })
    screen.debug(element)

    expect(element).toBeDefined()
})

// test the button
test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    //event handler (a mocj function defined with Jest)
    const mockHandler = jest.fn()

    render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    // session started to interact with rendered component
    const user = userEvent.setup()
    const button = screen.getByTest('make no important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHavaLength(1)
})