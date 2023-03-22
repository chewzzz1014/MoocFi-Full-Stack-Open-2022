// reducer must be pure function
// pure function: do not cause any side effects and must return the same response when called with the same parameters
import { generateId } from '../utils/generateId'

const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        payload: {
            content,
            important: false,
            id: generateId()
        }
    }
}

const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        payload: { id }
    }
}

const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return [
                ...state,
                action.payload
            ]
        case 'TOGGLE_IMPORTANCE':
            return state.map((note) => note.id === action.payload.id ? {
                ...note,
                important: !note.important
            } : note)
        default:
            return state
    }
}

export {
    toggleImportanceOf,
    createNote
}
export default noteReducer