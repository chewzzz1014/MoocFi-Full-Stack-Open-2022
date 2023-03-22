import { createStore } from 'redux'
import { noteReducer } from '../reducers/note'

const store = createStore(noteReducer)

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