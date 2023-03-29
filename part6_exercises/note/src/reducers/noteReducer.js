// reducer must be pure function
// pure function: do not cause any side effects and must return the same response when called with the same parameters
import { generateId } from '../utils/generateId'
import { createSlice } from '@reduxjs/toolkit'


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

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote(state, action) {
            const content = action.payload
            state.push({
                content,
                important: false,
                id: generateId()
            })
        },
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note => note.id !== id ? note : changedNote)
        }
    }
})

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