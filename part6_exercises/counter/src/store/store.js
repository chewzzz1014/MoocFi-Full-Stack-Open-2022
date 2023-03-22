// store all states here

import { createStore } from 'redux'
import { counterReducer } from '../reducers/counter'

const store = createStore(counterReducer)

// create callback function the store calls whenever an action is dispatched to the store
store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
})


store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'ZERO' })
store.dispatch({ type: 'DECREMENT' })


export default store 