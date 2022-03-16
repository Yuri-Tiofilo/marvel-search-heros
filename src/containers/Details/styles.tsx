import styled from 'styled-components'
import ReactStars from 'react-stars'

export const Container = styled.div`
  width: 100vw;
  background: ${({ theme }) => theme.COLORS.WHITE300};
`

export const Content = styled.div`
  max-width: 85rem;
  width: 100%;

  margin: 3.75rem auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  position: relative;
  z-index: 1;
`

export const ContentTitle = styled.div`
  display: flex;
  flex-direction: row;
`

export const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.COLORS.TITLE};
`

export const Text = styled.p`
  color: ${({ theme }) => theme.COLORS.SUBTEXT};

  margin-top: 1.5rem;
  line-height: 1.8;
  text-align: justify;
`

export const ContentNumbers = styled.div``

export const Comics = styled.div``

export const Movies = styled.div``

export const ContentRating = styled.div``

export const Stars = styled(ReactStars)``

export const ContentImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 60%; */
`

export const Image = styled.img`
  height: 350px;
  width: 350px;
  opacity: 0.8;
`

export const TitlePerson = styled.div`
  position: absolute;
  right: 20px;

  h1 {
    font-size: 300px;
    color: ${({ theme }) => theme.COLORS.WHITE};
    text-transform: uppercase;
    z-index: -1;
    font-weight: bold;
  }
`
