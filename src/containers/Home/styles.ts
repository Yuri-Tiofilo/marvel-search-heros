import styled from 'styled-components'

export const Container = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Content = styled.main``

export const Title = styled.h1`
  text-transform: uppercase;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.TITLE};
  font-size: 2rem;
  letter-spacing: 0.15rem;
`
