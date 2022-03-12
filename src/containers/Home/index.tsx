import React from 'react'
import { useTranslation } from 'react-i18next'

import { Header } from 'components/Header'
import { Container, Content, Title, SubTitle } from './styles'

const Home = () => {
  const { t } = useTranslation()

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
