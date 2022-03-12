import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Header } from 'components/Header'
import { Container, Content, Title, SubTitle } from './styles'
import { useCharacters } from 'common/query/useCharacters'

const Home = () => {
  const [resultsCharacters, setResultsCharacters] = useState(undefined)
  const { t } = useTranslation()

  const { status, data, error, isFetching, isPreviousData } = useCharacters({
    url: '/characters?&ts=9&apikey=0f7f683a2a1c279ebeb328deba9cb9af&hash=a0b8708edffb7834d623d07480ea13f2',
    page: 0
  })

  useEffect(() => {
    if (data) setResultsCharacters(data)
  }, [data])

  console.log(resultsCharacters)

  return (
    <Container>
      <Header isHome />
      <Content>
        <Title>{t('general.home.title1')}</Title>

        <SubTitle>{t('general.home.subtitle')}</SubTitle>
      </Content>
    </Container>
  )
}

export default Home
