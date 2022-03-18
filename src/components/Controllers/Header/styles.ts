import styled from 'styled-components'

type Props = {
  isHome?: boolean
}

export const Container = styled.header<Props>`
  display: flex;
  width: 100%;
  justify-content: ${({ isHome }) => (isHome ? 'center' : 'center')};
  align-items: ${({ isHome }) => (isHome ? 'center' : 'center')};
  padding: ${({ isHome }) => (isHome ? '1.875rem 0.625rem' : '1rem 5rem')};

  @media screen and (max-width: 480px) {
    flex-direction: ${({ isHome }) => (isHome ? 'row' : 'column')};
  }

  @media screen and (min-width: 480px) and (max-width: 1023px) {
    flex-direction: ${({ isHome }) => (isHome ? 'row' : 'column')};
  }
`

export const Image = styled.img``

export const ContentImage = styled.div`
  width: 20%;

  @media screen and (max-width: 480px) {
    display: flex;
    justify-content: center;
    width: 100%;

    margin-bottom: 20px;
  }

  @media screen and (min-width: 480px) and (max-width: 1023px) {
    display: flex;
    justify-content: center;
    width: 100%;

    margin-bottom: 20px;
  }
`

export const ContentSearch = styled.div`
  width: 80%;
  margin-right: 60px;
  justify-content: flex-start;
  align-items: flex-start;

  @media screen and (max-width: 480px) {
    width: 150%;
    margin-right: 0px;
  }

  @media screen and (min-width: 480px) and (max-width: 1023px) {
    width: 100%;
  }
`
