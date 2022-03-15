import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Header } from 'components/Controllers/Header'
import { Container, Content, Title, SubTitle } from './styles'
import { loadCharacters } from 'common/query/useCharacters'

import { HomeFilter } from 'components/Filters/HomeFilter'

import { DataResultsAPI, Results } from './home.types'
import ListHome from 'components/Lists/Home'

import { Footer } from 'components/Controllers/Footer'
import { useFavorites } from 'hooks/favorites'

const Home = () => {
  const [resultsCharacters, setResultsCharacters] = useState<
    DataResultsAPI | undefined
  >(undefined)

  const [listFavoritesState, setListFavoritesState] = useState<
    DataResultsAPI | undefined
  >(undefined)

  const [loading, setLoading] = useState(false)

  const [switchState, setSwitchState] = useState(false)

  const { t } = useTranslation()
  const { saveFavorites } = useFavorites()

  const { data, error, isFetching } = useQuery(
    ['characters', 1],
    () =>
      loadCharacters(
        '/characters?&ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2'
      ),
    { cacheTime: 360 }
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
        const { data: results } = data
        const mapedResults = results?.results?.map((result: Results) => {
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

        console.log(mapedResults)
      } else {
        const { data: results } = data
        setResultsCharacters(results)
      }
    }
  }, [data])

  // async function teste() {
  //   const { data } = await loadCharacters(
  //     '/characters?ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2&limit=1'
  //   )

  //   setResultsCharacters(data)
  // }

  async function orderByName(checked: boolean) {
    setSwitchState(checked)

    setLoading(true)
    if (checked) {
      const { data } = await loadCharacters(
        '/characters?orderBy=modified&ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2'
      )
      setResultsCharacters(data)
    } else {
      const { data } = await loadCharacters(
        '/characters?ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2'
      )

      setResultsCharacters(data)
    }
    setLoading(false)
  }

  async function searchHeroName(search: string) {
    if (search !== '') {
      setLoading(true)
      const { data } = await loadCharacters(
        `/characters?name=${search}&ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2`
      )

      setResultsCharacters(data)
      setLoading(false)
    }
  }

  async function setFavorite() {
    // lista todos os favoritos vindos o asyncStorage

    return false
  }

  function setFavoriteStorage(element: Results) {
    const maped = []
    const data = {
      count: 1,
      offset: 0,
      limit: 20,
      total: 0,
      results: [element]
    }

    saveFavorites(element)

    // data.results.push()
    // console.log(data)
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
            <ListHome
              resultsCharacters={resultsCharacters}
              setFavoriteInStorage={element => {
                setFavoriteStorage(element)
              }}
            />
          )}
        </Content>
      </Container>
      {isFetching || loading || (resultsCharacters && <Footer />)}
    </>
  )
}

export default Home
