import styled from 'styled-components'

type Props = {
  isHome: boolean
}

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: ${({ isHome }) => (!isHome ? 'flex-start' : 'column')};
  align-items: center;

  width: 100%;
`
