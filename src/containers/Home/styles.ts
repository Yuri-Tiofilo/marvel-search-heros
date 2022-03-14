import styled from 'styled-components'

export const Container = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 70rem;
`

export const Title = styled.h1`
  text-transform: uppercase;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.TITLE};
  font-size: 2rem;
  letter-spacing: 0.15rem;
  text-align: center;

  padding-bottom: 10px;
`

export const SubTitle = styled.span`
  font-weight: 400;
  font-size: 16px;
  text-align: center;

  color: ${({ theme }) => theme.COLORS.SUBTEXT};
`
