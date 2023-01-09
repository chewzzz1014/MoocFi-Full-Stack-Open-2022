import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const createNote = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<NoteForm createNote={createNote} />)

    // use getAllByRole for many input fields
    // getAllByRole will return array 
    //const input = screen.getByRole('textbox')

    //  use placeholder text to select the input field
    //const input = screen.getByPlaceholderText('write here note content')

    const input = container.querySelector('#note-input')
    const sendBtn = screen.getByText('save')

    await user.type(input, 'testing a form...')
    await user.click(sendBtn)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})