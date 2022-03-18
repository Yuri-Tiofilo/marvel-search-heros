import React, { createContext, useState, useContext } from 'react'

import { DataResultsAPI, Results } from 'containers/Home/home.types'
import { queryClient } from 'common/services/query'

type PropsSetStorage = {
  prevState: DataResultsAPI | undefined
  itemFavorite: Results
}

interface FavoriteContextData {
  favorites: DataResultsAPI
  saveFavorites(element: DataResultsAPI): void
  setFavoriteStorage({
    prevState,
    itemFavorite
  }: PropsSetStorage): Results[] | void
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

  // function teste(prevState: DataResultsAPI, itemFavorite: Results) {
  //   const nextState = prevState.results.map((item: Results) => {
  //     if (item.id === itemFavorite.id) {
  //       if (
  //         itemFavorite.isFavorite === false ||
  //         itemFavorite.isFavorite === undefined
  //       ) {
  //         return {
  //           ...item,
  //           isFavorite: true
  //         }
  //       } else {
  //         return {
  //           ...item,
  //           isFavorite: false
  //         }
  //       }
  //     } else {
  //       return item
  //     }
  //   })

  //   return { nextState }
  // }

  function setFavoriteStorage({
    prevState,
    itemFavorite
  }: PropsSetStorage): Results[] | void {
    if (favorites.results) {
      if (favorites.results.length <= 5) {
        if (prevState) {
          const nextState = prevState.results.map((item: Results) => {
            if (item.id === itemFavorite.id) {
              if (
                itemFavorite.isFavorite === false ||
                itemFavorite.isFavorite === undefined
              ) {
                return {
                  ...item,
                  isFavorite: true
                }
              } else {
                return {
                  ...item,
                  isFavorite: false
                }
              }
            } else {
              return item
            }
          })

          const favoritesStorage = nextState.filter((itemFavorite: Results) => {
            return itemFavorite.isFavorite === true
          })

          const newStateFavorites = {
            ...prevState,
            results: nextState
          } as DataResultsAPI

          queryClient.setQueryData('characters', newStateFavorites)
          saveFavorites({
            ...prevState,
            count: favoritesStorage.length,
            results: [...favoritesStorage, ...favorites.results]
          })
        }
      } else {
        alert('você já possui 5 favoritos, nosso limite é esse!')
      }
    } else {
      const nextState = prevState?.results.map((item: Results) => {
        if (item.id === itemFavorite.id) {
          if (
            itemFavorite.isFavorite === false ||
            itemFavorite.isFavorite === undefined
          ) {
            return {
              ...item,
              isFavorite: true
            }
          } else {
            return {
              ...item,
              isFavorite: false
            }
          }
        } else {
          return item
        }
      })
      const data = {
        limit: 20,
        offset: 0,
        count: 1,
        results: [{ ...itemFavorite, isFavorite: true }]
      }

      saveFavorites(data as DataResultsAPI)

      return nextState
    }
  }

  return (
    <FavoriteContext.Provider
      value={{ favorites, saveFavorites, setFavoriteStorage }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}
function useFavorites(): FavoriteContextData {
  const context = useContext(FavoriteContext)

  return context
}
export { FavoriteProvider, useFavorites }
