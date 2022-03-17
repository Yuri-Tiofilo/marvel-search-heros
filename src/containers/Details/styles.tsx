import styled from 'styled-components'
import ReactStars from 'react-stars'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
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

  @media screen and (max-width: 480px) {
    align-items: center;
    flex-direction: column;

    img {
      margin-top: 30px;
    }
  }

  @media screen and (min-width: 480px) and (max-width: 1023px) {
    align-items: center;
    flex-direction: column;

    img {
      margin-top: 40px;
    }
  }
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 480px) {
    width: 80%;
  }

  @media screen and (min-width: 480px) and (max-width: 1023px) {
    width: 70%;
  }
`

export const ContentTitle = styled.div`
  display: flex;
  flex-direction: row;
`

export const Title = styled.h1`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.COLORS.TITLE};
  text-transform: uppercase;
`

export const Text = styled.p`
  color: ${({ theme }) => theme.COLORS.SUBTEXT};

  margin-top: 1.5rem;
  line-height: 1.8;
  text-align: justify;
`

export const ContentNumbers = styled.div`
  display: flex;
  align-items: center;

  margin: 30px 0px;

  color: ${({ theme }) => theme.COLORS.SUBTEXT};

  .box {
    display: flex;
    align-items: center;
    margin-right: 60px;

    height: 50px;

    font-weight: bold;

    img {
      margin-right: 10px;
    }
  }
`

export const Comics = styled.div``

export const Movies = styled.div``

export const ContentRating = styled.div`
  display: flex;
  align-items: center;

  span {
    font-weight: bold;
    margin-right: 10px;
    color: ${({ theme }) => theme.COLORS.SUBTEXT};
  }
`

export const Stars = styled(ReactStars)`
  span {
    margin-right: 2px !important;
  }
`

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

  @media screen and (max-width: 480px) {
    height: 250px;
    width: 250px;
  }

  @media screen and (min-width: 480px) and (max-width: 1023px) {
    height: 300px;
    width: 300px;
  }
`

export const TitlePerson = styled.div`
  position: absolute;
  right: 80px;

  h1 {
    font-size: 300px;
    color: ${({ theme }) => theme.COLORS.WHITE};
    text-transform: uppercase;
    z-index: -1;
    font-weight: bold;
  }

  @media screen and (max-width: 480px) {
    right: 20px;
    top: 250px;

    h1 {
      font-size: 140px;
    }
  }

  @media screen and (min-width: 480px) and (max-width: 1023px) {
    right: 20px;
    top: 250px;

    h1 {
      font-size: 200px;
    }
  }
`
export const LastComics = styled.div`
  span {
    font-weight: bold;
    margin-right: 10px;
    color: ${({ theme }) => theme.COLORS.SUBTEXT};
  }
`
