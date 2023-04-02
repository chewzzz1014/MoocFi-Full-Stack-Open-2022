// reducer must be pure function
// pure function: do not cause any side effects and must return the same response when called with the same parameters
import { createSlice } from '@reduxjs/toolkit'
import * as noteService from '../services/notes'

// using createSlice to create reducer and action creators
const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2
    }
]

// const createNote = (content) => {
//     return {
//         type: 'NEW_NOTE',
//         payload: {
//             content,
//             important: false,
//             id: generateId()
//         }
//     }
// }

// const toggleImportanceOf = (id) => {
//     return {
//         type: 'TOGGLE_IMPORTANCE',
//         payload: { id }
//     }
// }

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        // has type value of notes/createNote
        createNote(state, action) {
            const content = action.payload
            // we can mutate state in createSlice! redux toolkit utilizes Immer library that uses the mutated state to produce a new, immutable state
            // the state changes remain immutable
            state.push(action.payload)
        },
        // has type value of notes/toggleImportanceOf
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }

            console.log(state)

            return state.map(note => note.id !== id ? note : changedNote)
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        }
    }
})


// export action creators
export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

// export action creator
export const initializeNotes = () => {
    return async (dispatch) => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

// export action creator
export const createNote = (content) => {
    return async (dispatch) => {
        const newNote = await noteService.createNew(content)
        dispatch(appendNote(newNote))
    }
}

// export reducer
export default noteSlice.reducer


// using redux
// const noteReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'NEW_NOTE':
//             return [
//                 ...state,
//                 action.payload
//             ]
//         case 'TOGGLE_IMPORTANCE':
//             return state.map((note) => note.id === action.payload.id ? {
//                 ...note,
//                 important: !note.important
//             } : note)
//         default:
//             return state
//     }
// }

// export {
//     toggleImportanceOf,
//     createNote
// }
// export default noteReducer