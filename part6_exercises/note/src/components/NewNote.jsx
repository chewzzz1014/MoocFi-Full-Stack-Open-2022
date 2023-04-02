import { useDispatch } from "react-redux"
import { createNote } from "../reducers/noteReducer"
import { createNew } from "../services/notes"

function NewNote() {
    const dispatch = useDispatch()

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(createNote(newNote))
    }

    return (
        <form onSubmit={addNote}>
            <input name='note' />
            <button type='submit'>add</button>
        </form>
    )
}

export default NewNote
