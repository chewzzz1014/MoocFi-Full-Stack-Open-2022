import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import anecdoteReducer, { setAnecdote } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { getAll } from './services/anecdotes'
// const store = createStore(combineReducers({
//   filter: filterReducer,
//   anecdotes: anecdoteReducer
// }))

const store = configureStore({
  reducer: {
    filter: filterReducer,
    anecdotes: anecdoteReducer,
    notifications: notificationReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

renderApp()
store.subscribe(renderApp)