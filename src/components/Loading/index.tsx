import React, { memo } from 'react'
import { Container } from './styles'

const Loading = () => (
  <Container>
    <h1>Loading...</h1>
  </Container>
)

export default memo(Loading)