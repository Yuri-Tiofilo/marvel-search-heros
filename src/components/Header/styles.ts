import styled from 'styled-components'

type Props = {
  isHome?: boolean
}

export const Container = styled.header<Props>`
  display: ${({ isHome }) => (isHome ? 'flex' : 'block')};
  width: 100%;
  justify-content: ${({ isHome }) => (isHome ? 'center' : 'flex-start')};
  align-items: ${({ isHome }) => (isHome ? 'center' : 'flex-start')};
  padding: ${({ isHome }) => (isHome ? '1.875rem 0.625rem' : '0.625rem')};
`

export const Image = styled.img``
