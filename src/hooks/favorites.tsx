import React, { createContext, useState, useContext } from 'react'

import { DataResultsAPI } from 'containers/Home/home.types'

interface FavoriteContextData {
  favorites: DataResultsAPI
  saveFavorites(element: DataResultsAPI): void
}
const FavoriteContext = createContext<FavoriteContextData>(
  {} as FavoriteContextData
)

const FavoriteProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const listFavorites = localStorage.getItem('@Marvel:listFavorites')

    if (listFavorites) {
      return JSON.parse(listFavorites)
    }
    return {} as DataResultsAPI
  })

  function saveFavorites(element: DataResultsAPI) {
    setFavorites(element)

    localStorage.setItem('@Marvel:listFavorites', JSON.stringify(element))
  }

  return (
    <FavoriteContext.Provider value={{ favorites, saveFavorites }}>
      {children}
    </FavoriteContext.Provider>
  )
}
function useFavorites(): FavoriteContextData {
  const context = useContext(FavoriteContext)

  return context
}
export { FavoriteProvider, useFavorites }
