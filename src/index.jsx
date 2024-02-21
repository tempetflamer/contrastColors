import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LanguageContextProvider from './context/LanguageContext'
import { HelmetProvider } from 'react-helmet-async'

const helmetContext = {}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HelmetProvider context={helmetContext}>
    <LanguageContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LanguageContextProvider>
  </HelmetProvider>
)
