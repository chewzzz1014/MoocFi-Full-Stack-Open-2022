import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store/store'
import { Provider } from 'react-redux'

const renderApp = () => {
  console.log(store.getState())
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'))


renderApp()
store.subscribe(renderApp)
