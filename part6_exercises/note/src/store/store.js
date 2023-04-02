// import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import noteReducer from '../reducers/noteReducer'
import filterReducer from '../reducers/filterRedecur'

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

export default store 