import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { Header } from 'components/Header'
import { Container, Content, Title } from './styles'

const Home = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Header isHome />
      <Content>
        <Title>
          <Trans>{t('general.home.title')}</Trans>
        </Title>
      </Content>
    </Container>
  )
}

export default Home
