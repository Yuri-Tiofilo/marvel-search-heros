import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  max-width: 70rem;
  width: 100%;

  margin-top: 10px;

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
    div h3 {
      font-size: 18px;
      /* font-weight: bold; */
      margin: 5px 0 20px;
    }
    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }
      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
        svg {
          margin-right: 5px;
        }
      }
      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`
