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
import { dataStorage } from 'common/utils'

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

  const {
    favorites,
    setFavoriteStorage: storageFavorite,
    saveFavorites
  } = useFavorites()

  const { data, error, isFetching } = useQuery(
    'characters',
    () =>
      loadCharactersNew({
        url: '/characters?orderBy=modified'
      }),
    { cacheTime: 360, refetchOnWindowFocus: false, staleTime: 1000 * 60 }
  )
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
    // eslint-disable-next-line
  }, [data])

  async function fetchData(filter: string): Promise<DataResultsAPI> {
    const data = await queryClient.fetchQuery('characters', () =>
      loadCharactersNew({
        url: filter
      })
    )
    return data
  }

  async function orderByName(checked: boolean) {
    setSwitchState(checked)

    setLoading(true)
    const data = await fetchData(
      !checked ? '/characters?orderBy=modified' : '/characters?orderBy=name'
    )

    setResultsCharacters(data)
    setLoading(false)
  }

  async function searchHeroName(search: string) {
    if (search !== '') {
      setLoading(true)

      const data = await fetchData(`/characters?name=${search}`)

      setResultsCharacters(data)
      setLoading(false)

      setSearched(!searched)
    }
  }

  async function setFavorite() {
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
    storageFavorite({
      prevState: resultsCharacters,
      itemFavorite: element
    })
  }

  async function cleanSearch() {
    setSearched(false)
    setValueSearch('')

    const data = await fetchData('/characters?orderBy=modified')
    setResultsCharacters(data)
  }

  function setFavoriteInPageListFavorites(element: Results) {
    const indexFavorite = favorites.results.findIndex((favorite: Results) => {
      return favorite.id === element.id
    })

    const filteredRemove = favorites.results.filter(
      (favorite: Results, index: number) => {
        if (index !== indexFavorite) {
          return favorite
        }
      }
    )

    saveFavorites({
      ...favorites,
      count: favorites.count - 1,
      results: filteredRemove
    })

    setResultsCharacters({
      ...favorites,
      results: filteredRemove
    })
  }
  return (
    <>
      <Container>
        <Header isHome />
        {error && <div>{t('general.home.error')}</div>}
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
            pageFavorites={pageFavorite}
          />

          {isFetching || loading ? (
            <div>{t('general.home.loading')}</div>
          ) : (
            data && (
              <ListHome
                resultsCharacters={
                  resultsCharacters && resultsCharacters.results
                }
                setFavoriteInStorage={element => {
                  if (!pageFavorite) {
                    setFavoriteStorage(element)
                  } else {
                    setFavoriteInPageListFavorites(element)
                  }
                }}
              />
            )
          )}

          {favorites && favorites?.results?.length === 0 && pageFavorite && (
            <div>{t('general.home.notFavorites')}</div>
          )}
        </Content>
      </Container>
      {isFetching || loading || (resultsCharacters && <Footer />)}
    </>
  )
}

export default Home
