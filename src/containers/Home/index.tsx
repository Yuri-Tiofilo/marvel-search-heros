import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'

import { Header } from 'components/Controllers/Header'
import { loadCharactersNew } from 'common/query/useCharacters'
import { HomeFilter } from 'components/Filters/HomeFilter'
import ListHome from 'components/Lists/Home'
import { Footer } from 'components/Controllers/Footer'
import { useFavorites } from 'hooks/favorites'
import { queryClient } from 'common/services/query'

import { DataResultsAPI, Results } from './home.types'
import { Container, Content, Title, SubTitle } from './styles'

const Home = () => {
  const [resultsCharacters, setResultsCharacters] = useState<DataResultsAPI>(
    {} as DataResultsAPI
  )

  const [loading, setLoading] = useState(false)

  const [switchState, setSwitchState] = useState(false)
  const [pageFavorite, setPageFavorite] = useState(false)
  const [searched, setSearched] = useState(false)
  const [valueSearch, setValueSearch] = useState('')

  const { t } = useTranslation()

  const { saveFavorites, favorites } = useFavorites()

  const { data, error, isFetching } = useQuery(
    'characters',
    () =>
      loadCharactersNew({
        url: '/characters?orderBy=modified'
      }),
    { cacheTime: 360, refetchOnWindowFocus: false, staleTime: 1000 * 60 }
  )

  function dataStorage(
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

  useEffect(() => {
    if (data) {
      if (favorites.results) {
        const { filteredFavoritesStorage } = dataStorage(data, favorites)
        setResultsCharacters({
          ...data,
          results: filteredFavoritesStorage
        })
      } else {
        setResultsCharacters(data)
      }
    }
  }, [data, favorites])

  async function orderByName(checked: boolean) {
    setSwitchState(checked)

    setLoading(true)
    if (!checked) {
      const data = await queryClient.fetchQuery('characters', () =>
        loadCharactersNew({
          url: '/characters?orderBy=modified'
        })
      )

      setResultsCharacters(data)
    } else {
      const data = await queryClient.fetchQuery('characters', () =>
        loadCharactersNew({
          url: '/characters?orderBy=name'
        })
      )

      setResultsCharacters(data)
    }
    setLoading(false)
  }

  async function searchHeroName(search: string) {
    if (search !== '') {
      setLoading(true)

      const data = await queryClient.fetchQuery('characters', () =>
        loadCharactersNew({
          url: `/characters?name=${search}`
        })
      )

      setResultsCharacters(data)
      setLoading(false)

      setSearched(!searched)
    }
  }

  async function setFavorite() {
    // lista todos os favoritos vindos o asyncStorage
    setResultsCharacters(favorites)
    setPageFavorite(!pageFavorite)

    if (pageFavorite === true) {
      const { filteredFavoritesStorage } = dataStorage(data, favorites)
      setResultsCharacters({
        ...data,
        results: filteredFavoritesStorage
      })
    }
  }
  function setFavoriteStorage(element: Results) {
    const prevState = queryClient.getQueryData<DataResultsAPI>('characters')
    if (favorites.results) {
      if (favorites.results.length <= 4) {
        if (prevState) {
          const nextState = prevState.results.map((item: Results) => {
            if (item.id === element.id) {
              if (
                element.isFavorite === false ||
                element.isFavorite === undefined
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

          const favoritesStorage = nextState.filter(element => {
            return element.isFavorite === true
          })

          const newStateFavorites = {
            ...prevState,
            results: nextState
          } as DataResultsAPI

          queryClient.setQueryData('characters', newStateFavorites)
          setResultsCharacters(newStateFavorites)
          saveFavorites({
            ...prevState,
            count: favoritesStorage.length,
            results: favoritesStorage
          })
        }
      } else {
        alert('você já possui 5 favoritos, nosso limite é esse!')
      }
    } else {
      const nextState = prevState?.results.map((item: Results) => {
        if (item.id === element.id) {
          if (
            element.isFavorite === false ||
            element.isFavorite === undefined
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
        results: [{ ...element, isFavorite: true }]
      }

      saveFavorites(data as DataResultsAPI)

      queryClient.setQueryData('characters', {
        ...prevState,
        results: nextState
      })
    }
  }

  async function cleanSearch() {
    setSearched(false)
    setValueSearch('')

    const data = await queryClient.fetchQuery('characters', () =>
      loadCharactersNew({
        url: '/characters?orderBy=modified'
      })
    )

    setResultsCharacters(data)
  }

  return (
    <>
      <Container>
        <Header isHome />
        {error && <div>Error in API Marvel. Consulting Yuri Silva</div>}
        <Content>
          <Title>{t('general.home.title1')}</Title>

          <SubTitle>{t('general.home.subtitle')}</SubTitle>

          <HomeFilter
            lengthResults={resultsCharacters && resultsCharacters.count}
            setSwitch={checked => orderByName(checked)}
            switchState={switchState}
            setFavorite={setFavorite}
            onblur={element => searchHeroName(element.target.value)}
            isSearched={searched}
            cleanSearch={cleanSearch}
            onChangeText={element => setValueSearch(element.target.value)}
            value={valueSearch}
          />
          {isFetching || loading ? (
            <div>Loading...</div>
          ) : (
            data && (
              <ListHome
                resultsCharacters={
                  resultsCharacters && resultsCharacters.results
                }
                setFavoriteInStorage={element => {
                  if (!pageFavorite) {
                    setFavoriteStorage(element)
                  }
                }}
              />
            )
          )}

          {favorites && favorites?.results?.length === 0 && (
            <div>Você não possui nenhum favorito</div>
          )}
        </Content>
      </Container>
      {isFetching || loading || (resultsCharacters && <Footer />)}
    </>
  )
}

export default Home
