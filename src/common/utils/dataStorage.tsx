import { DataResultsAPI, Results } from 'containers/Home/home.types'

export function dataStorage(
  stateQuery: DataResultsAPI,
  favoritesState: DataResultsAPI
) {
  const filteredFavoritesStorage = stateQuery.results.map(
    (characters: Results) => ({
      ...characters,
      isFavorite: favoritesState.results.some(
        (favorite: Results) => favorite.id === characters.id
      )
    })
  )

  return { filteredFavoritesStorage }
}
