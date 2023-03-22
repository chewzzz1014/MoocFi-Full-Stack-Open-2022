import store from "../store/store"
import { generateId } from "../utils/generateId"

const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    store.dispatch({
        type: 'NEW_NOTE',
        payload: {
            content,
            important: false,
            id: generateId()
        }
    })
}

const toggleImportance = (id) => {
    store.dispatch({
        type: 'TOGGLE_IMPORTANCE',
        payload: { id }
    })
}

export {
    addNote,
    toggleImportance
}