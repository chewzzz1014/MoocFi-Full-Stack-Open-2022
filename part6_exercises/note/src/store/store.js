import { createStore, combineReducers } from 'redux'
import noteReducer from '../reducers/noteReducer'
import { createNote } from '../reducers/noteReducer'
import { filterChange } from '../reducers/filterRedecur'
import filterReducer from '../reducers/filterRedecur'


const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
})
const store = createStore(reducer)

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