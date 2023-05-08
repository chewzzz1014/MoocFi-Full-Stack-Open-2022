import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// for rendering async/await on browsers that're not rendering them
import 'core-js/stable/index.js'
import "regenerator-runtime/runtime.js"

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <App />
)