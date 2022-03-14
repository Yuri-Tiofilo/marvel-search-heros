import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Header } from 'components/Controllers/Header'
import { Container, Content, Title, SubTitle } from './styles'
import { loadCharacters } from 'common/query/useCharacters'

import { HomeFilter } from 'components/Filters/HomeFilter'

import { DataResultsAPI } from './home.types'
import { ListHome } from 'components/Lists/Home'

import { Footer } from 'components/Controllers/Footer'

const Home = () => {
  const [resultsCharacters, setResultsCharacters] = useState<
    DataResultsAPI | undefined
  >(undefined)
  const [switchState, setSwitchState] = useState(false)

  const { t } = useTranslation()

  const { data, error, isFetching } = useQuery(
    ['characters', 1],
    () =>
      loadCharacters(
        '/characters?&ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2'
      ),
    { cacheTime: 360 }
  )
  useEffect(() => {
    if (data) {
      const { data: results } = data
      setResultsCharacters(results)
    }
  }, [data])

  async function teste() {
    const { data } = await loadCharacters(
      '/characters?ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2&limit=1'
    )

    setResultsCharacters(data)
  }

  async function setFavorite() {
    // lista todos os favoritos vindos o asyncStorage
    return false
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
            teste={() => teste()}
            lengthResults={resultsCharacters && resultsCharacters.count}
            setSwitch={checked => setSwitchState(checked)}
            switchState={switchState}
            setFavorite={setFavorite}
          />

          {isFetching ? <div>Loading...</div> : null}

          <ListHome resultsCharacters={resultsCharacters} />
        </Content>
      </Container>
      {resultsCharacters && <Footer />}
    </>
  )
}

export default Home
