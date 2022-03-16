import styled from 'styled-components'
import Favorite from 'assets/favorito_02.svg'
import FavoriteHover from 'assets/favorito_01.svg'

type PropsButtonFavorite = {
  isActive?: boolean
}

export const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  max-width: 70rem;
  width: 100%;

  margin-top: 10px;

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
    /* max-width: 70rem; */
  }

  @media screen and (min-width: 480px) and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 8px;
    max-width: 70rem;
  }

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    /* padding: 20px; */

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
    }

    > div {
      display: flex;
      padding: 20px 0px;
      justify-content: space-between;
    }
    div h3 {
      font-size: 18px;
      /* font-weight: bold; */
      margin-right: 20px;
    }

    img {
      height: 230px;
      width: 230px;
    }

    @media screen and (max-width: 480px) {
      img {
        height: 160px;
        width: 160px;
      }
    }

    @media screen and (min-width: 480px) and (max-width: 1023px) {
      > div {
        display: flex;
        padding: 20px 5px 20px 0px;
        justify-content: space-between;
      }
      div h3 {
        font-size: 18px;
        /* font-weight: bold; */
        margin-right: 20px;
      }
    }
  }
`

export const ButtonFavorite = styled.button<PropsButtonFavorite>`
  border: 0;
  background: ${({ isActive }) =>
    isActive
      ? `url(${FavoriteHover}) no-repeat center`
      : `url(${Favorite}) no-repeat center`};
  width: 30px;
  height: 30px;

  margin-right: 20px;

  z-index: 999999;

  transition: background 0.5s;

  :hover {
    background: url(${FavoriteHover}) no-repeat center;
  }
`
