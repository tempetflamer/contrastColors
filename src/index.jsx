import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalContexttProvider from './utils/GlobalContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <GlobalContexttProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalContexttProvider>
)
