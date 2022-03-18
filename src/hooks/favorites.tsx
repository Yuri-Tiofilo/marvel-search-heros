import React, { createContext, useState, useContext } from 'react'
import { toast } from 'react-toastify'

import { DataResultsAPI, Results } from 'containers/Home/home.types'
import { queryClient } from 'common/services/query'
import { loadCharactersNew } from 'common/query/useCharacters'

type PropsSetStorage = {
  prevState: DataResultsAPI | undefined
  itemFavorite: Results
}

type PropsSetStorageDetails = {
  itemFavorite: Results
  characterId: string | undefined
  data: DataResultsAPI | undefined
}

interface FavoriteContextData {
  favorites: DataResultsAPI
  saveFavorites(element: DataResultsAPI): void
  setFavoriteStorage({
    prevState,
    itemFavorite
  }: PropsSetStorage): Results[] | void
  setFavoriteDetails({
    characterId,
    itemFavorite,
    data
  }: PropsSetStorageDetails): void
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

  function setIsFavoriteState(
    prevState: DataResultsAPI,
    itemFavorite: Results
  ) {
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

    return { nextState }
  }

  async function setFavoriteDetails({
    characterId,
    itemFavorite,
    data
  }: PropsSetStorageDetails) {
    if (favorites.results) {
      const filtered = favorites.results.filter((element: Results) => {
        return element.id === data?.results[0].id
      })
      const indexFavorite = favorites.results.findIndex((element: Results) => {
        return element.id === data?.results[0].id
      })
      if (filtered.length === 0) {
        if (favorites.results.length <= 4) {
          const data = {
            ...favorites,
            count: favorites.count + 1,
            results: [
              ...favorites.results,
              { ...itemFavorite, isFavorite: true }
            ]
          }
          saveFavorites(data as DataResultsAPI)
        }
      } else {
        const filteredRemove = favorites.results.filter(
          (element: Results, index: number) => {
            if (index !== indexFavorite) {
              return element
            }
          }
        )

        const data = {
          ...favorites,
          count: favorites.count - 1,
          results: filteredRemove
        }

        saveFavorites(data as DataResultsAPI)
      }

      await queryClient.fetchQuery('character-details', () =>
        loadCharactersNew({ url: `/characters/${characterId}?` })
      )
    } else {
      const data = {
        limit: 20,
        offset: 0,
        count: 1,
        results: [{ ...itemFavorite, isFavorite: true }]
      }

      saveFavorites(data as DataResultsAPI)

      await queryClient.fetchQuery('character-details', () =>
        loadCharactersNew({ url: `/characters/${characterId}?` })
      )
    }
  }

  function setFavoriteStorage({
    prevState,
    itemFavorite
  }: PropsSetStorage): Results[] | void {
    if (favorites.results) {
      const filter = favorites.results.filter((element: Results) => {
        return element.id === itemFavorite.id
      })
      if (filter.length !== 0) {
        const indexFavorite = favorites.results.findIndex(
          (element: Results) => {
            return element.id === itemFavorite.id
          }
        )

        const filteredRemove = favorites.results.filter(
          (element: Results, index: number) => {
            if (index !== indexFavorite) {
              return element
            }
          }
        )

        saveFavorites({
          ...prevState,
          count: filteredRemove.length,
          results: filteredRemove
        } as DataResultsAPI)
      } else {
        if (favorites.results.length <= 4) {
          if (prevState) {
            const { nextState } = setIsFavoriteState(prevState, itemFavorite)
            const favoritesStorage = nextState.filter(
              (itemFavorite: Results) => {
                return itemFavorite.isFavorite === true
              }
            )

            const newStateFavorites = {
              ...prevState,
              results: nextState
            } as DataResultsAPI

            queryClient.setQueryData('characters', newStateFavorites)
            saveFavorites({
              ...prevState,
              count: favoritesStorage.length,
              results: [
                ...favorites.results,
                { ...itemFavorite, isFavorite: true }
              ]
            })
          }
        } else {
          toast.error(
            'Você já possui 5 favoritos. Nosso limite maximo é de 5 favoritos',
            {
              position: 'top-right'
            }
          )
        }
      }
    } else {
      const data = {
        limit: 20,
        offset: 0,
        count: 1,
        results: [{ ...itemFavorite, isFavorite: true }]
      }

      saveFavorites(data as DataResultsAPI)
    }
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        saveFavorites,
        setFavoriteStorage,
        setFavoriteDetails
      }}
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
