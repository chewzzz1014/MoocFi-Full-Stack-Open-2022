// store all states here

import { createStore } from 'redux'
import { counterReducer } from '../reducers/counter'

const store = createStore(counterReducer)

console.log(store.getState())
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })

console.log(store.getState())
store.dispatch({ type: 'ZERO' })
store.dispatch({ type: 'DECREMENT' })

console.log(store.getState())
