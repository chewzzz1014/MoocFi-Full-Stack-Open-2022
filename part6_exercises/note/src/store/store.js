import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import noteReducer, { createNote } from '../reducers/noteReducer'
import filterReducer, { filterChange } from '../reducers/filterRedecur'

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
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

store.dispatch({
    type: 'NEW_NOTE',
    payload: {
        content: 'the app is in redux store',
        important: true,
        id: 1
    }
})

store.dispatch({
    type: 'NEW_NOTE',
    payload: {
        content: 'state changes are made with actions',
        important: false,
        id: 2
    }
})

export default store 