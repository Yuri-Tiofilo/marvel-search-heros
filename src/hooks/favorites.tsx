import React, { createContext, useCallback, useState, useContext } from 'react'
import api from 'common/services/api'

import { DataResultsAPI, Results } from 'containers/Home/home.types'

interface User {
  id: string
  avatar_url: string
  name: string
  email: string
}
interface FavoriteContextData {
  favorites: DataResultsAPI
  saveFavorites(element: Results): void
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

  function saveFavorites(element: Results) {
    favorites.results.push(element)

    const data = {
      count: favorites.results,
      offset: 0,
      limit: 20,
      total: 20,
      results: [] as Results[]
    }

    data.results = favorites.results

    console.log('veio aqui', favorites)
    console.log('veio aqui', data)

    setFavorites(data)

    // localStorage.setItem(
    //   '@Marvel:listFavorites',
    //   JSON.stringify({
    //     error: true
    //   })
    // )
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
