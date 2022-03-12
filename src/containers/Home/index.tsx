import { Header } from 'components/Header'
import React from 'react'

import { Container, Content, Title } from './styles'

const Home = () => {
  return (
    <Container>
      <Header isHome />
      <Content>
        <Title>Explore o Universo</Title>
      </Content>
    </Container>
  )
}

export default Home
