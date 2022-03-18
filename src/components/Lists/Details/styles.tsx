import styled from 'styled-components'

export const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 5fr);
  grid-gap: 1px;
  max-width: 70rem;
  width: 100%;

  margin-top: 10px;

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1px;
    /* max-width: 70rem; */

    padding: 0px 50px;
  }

  @media screen and (min-width: 480px) and (max-width: 1023px) {
    grid-template-columns: repeat(3, 5fr);
    grid-gap: 1px;
    max-width: 70rem;
  }

  li {
    display: flex;
    flex-direction: column;
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
      align-items: center;
    }
    div strong {
      font-size: 14px;
      /* font-weight: bold; */
      text-align: center;
      width: 100%;
    }

    img {
      height: 170px;
      width: 150px;
      margin: 0 auto;
    }

    @media screen and (max-width: 480px) {
      img {
        height: 150px;
        width: 120px;
      }
      > div {
        display: flex;
        padding: 20px 5px 20px 0px;
        justify-content: space-between;
      }
      div h3 {
        font-size: 18px;
        margin-right: 20px;
      }
    }

    @media screen and (min-width: 480px) and (max-width: 1023px) {
      > div {
        display: flex;
        padding: 20px 5px 20px 0px;
        justify-content: space-between;
      }
      div strong {
        font-size: 14px;
      }
    }
  }
`
