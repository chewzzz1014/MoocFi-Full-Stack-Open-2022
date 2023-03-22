import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store/store'

const renderApp = () => {
  root.render(<App />)
}
const root = ReactDOM.createRoot(document.getElementById('root'))


renderApp()
store.subscribe(renderApp)
