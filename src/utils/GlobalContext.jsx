import React, { createContext, useContext, useState } from 'react'

/**
 * Create Global Context
 */
export const GlobalContext = createContext({
  colors: [
    {
      name: 'White',
      hexa: '#ffffff',
    },
    {
      name: 'Black',
      hexa: '#000000',
    },
  ],
  setColors: () => Function.prototype,
  addColor: () => Function.prototype,
})

/**
 * Allow us to use useGlobalState() instead of useContext(GlobalContext) for better clarity
 */
export const useGlobalState = () => useContext(GlobalContext)

/**
 * GlobalContext.Provider allow us to touch global state everywhere in our App.
 * This global state will carry state & dispatch from our reducer.
 */
const GlobalContextProvider = ({ children }) => {
  const [colors, setColors] = useState([])

  const addColor = (color) => {
    setColors([...colors, color])
  }

  return <GlobalContext.Provider value={{ colors, setColors, addColor }}>{children}</GlobalContext.Provider>
}

export default GlobalContextProvider
