import styled, { css } from 'styled-components'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  color: #606360;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #ff9900;
      border-color: #ff9900;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #ff9900;
    `}
    input {
    flex: 1;
    color: #f4ede8;
    background: transparent;
    border: 0;
    &::placeholder {
      color: #606360;
    }
    ${props =>
      props.isFocused &&
      css`
        color: #ff9900;
        border-color: #ff9900;
      `}
    ${props =>
      props.isFilled &&
      css`
        color: #ff9900;
      `}
  }
  svg {
    margin-right: 16px;
  }
  & + div {
    margin-top: 8px;
  }
`
