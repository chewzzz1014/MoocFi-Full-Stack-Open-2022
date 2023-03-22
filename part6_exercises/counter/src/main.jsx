import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store/store'

// to rerender App when state is changed
const renderApp = () => {
  root.render(<App />)
}

const root = ReactDOM.createRoot(document.getElementById('root'))

renderApp()
// everytime state is changed, render App component
store.subscribe(renderApp)
