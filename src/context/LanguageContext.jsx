import React, { createContext, useContext, useState } from 'react'
import { en, fr } from '../data/data.js'

/**
 * Create context LanguageContext
 */
export const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => Function.prototype,
})

/**
 * Allow us to use useLanguageState() instead of useContext(LanguageContext) for better clarity
 */
export const useLanguageState = () => useContext(LanguageContext)

/**
 * LanguageContext.Provider allow us to touch global state everywhere in our App.
 * This global state will carry state & dispatch from our reducer.
 */
const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr')
  const [data, setData] = useState(fr)

  return <LanguageContext.Provider value={{ language, setLanguage, data, setData }}>{children}</LanguageContext.Provider>
}

export default LanguageContextProvider
