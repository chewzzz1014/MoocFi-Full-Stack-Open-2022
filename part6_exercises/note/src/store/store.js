import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import noteReducer, { setNotes } from '../reducers/noteReducer'
import filterReducer, { filterChange } from '../reducers/filterRedecur'
import { getAll } from '../services/notes'

// using redux library
// const reducer = combineReducers({
//     notes: noteReducer,
//     filter: filterReducer
// })
// const store = createStore(reducer)

// using redux toolkit
const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer
    }
})

store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

store.dispatch({
    type: 'notes/createNote',
    payload: 'the app is in redux store'
})

store.dispatch({
    type: 'notes/createNote',
    payload: 'state changes are made with'
})

getAll().then(notes => 
    store.dispatch(setNotes(notes))
)

export default store 