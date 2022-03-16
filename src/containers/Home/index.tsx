import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'

import { Header } from 'components/Controllers/Header'
import { loadCharacters } from 'common/query/useCharacters'
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

  const [listFavoritesState, setListFavoritesState] = useState<DataResultsAPI>(
    {} as DataResultsAPI
  )

  const [loading, setLoading] = useState(false)

  const [switchState, setSwitchState] = useState(false)

  const { t } = useTranslation()
  const { saveFavorites } = useFavorites()

  const { data, error, isFetching } = useQuery(
    'characters',
    () =>
      loadCharacters(
        '/characters?orderBy=modified&ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2'
      ),
    { cacheTime: 360, refetchOnWindowFocus: false, staleTime: 1000 * 60 }
  )

  useEffect(() => {
    const listFavorites: DataResultsAPI | string | null = localStorage.getItem(
      '@Marvel:listFavorites'
    )
    if (listFavorites) {
      setListFavoritesState(JSON.parse(listFavorites) as DataResultsAPI)
    }
    if (data) {
      if (listFavorites) {
        const list = JSON.parse(listFavorites) as DataResultsAPI
        const mapedResults = data?.results?.map((result: Results) => {
          list.results.map((favorite: Results) => {
            if (result.id === favorite.id) {
              return {
                ...result,
                isFavorite: true
              }
            } else {
              return {
                ...result
              }
            }
          })
        })

        setResultsCharacters({
          ...data,
          results: mapedResults
        })
      } else {
        setResultsCharacters(data)
      }
    }
  }, [data])

  async function orderByName(checked: boolean) {
    setSwitchState(checked)

    setLoading(true)
    if (!checked) {
      const data = await loadCharacters(
        '/characters?orderBy=modified&ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2'
      )
      setResultsCharacters(data)
    } else {
      const data = await loadCharacters(
        '/characters?ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2'
      )

      setResultsCharacters(data)
    }
    setLoading(false)
  }

  async function searchHeroName(search: string) {
    if (search !== '') {
      setLoading(true)

      const data = await loadCharacters(
        `/characters?name=${search}&ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2`
      )
      setResultsCharacters(data)
      setLoading(false)
    }
  }

  async function setFavorite() {
    // lista todos os favoritos vindos o asyncStorage
    if (listFavoritesState !== null) {
      setResultsCharacters(listFavoritesState)
    } else {
    }

    return false
  }

  function setFavoriteStorage(element: Results) {
    const prevState = queryClient.getQueryData<DataResultsAPI>('characters')
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

      const newStateFavorites = {
        ...prevState,
        results: nextState
      } as DataResultsAPI

      queryClient.setQueryData('characters', newStateFavorites)

      setResultsCharacters(newStateFavorites)

      saveFavorites(newStateFavorites)
    }
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
          />

          {isFetching || loading ? (
            <div>Loading...</div>
          ) : (
            data && (
              <ListHome
                resultsCharacters={resultsCharacters.results}
                setFavoriteInStorage={element => {
                  setFavoriteStorage(element)
                }}
              />
            )
          )}
        </Content>
      </Container>
      {isFetching || loading || (resultsCharacters && <Footer />)}
    </>
  )
}

export default Home
