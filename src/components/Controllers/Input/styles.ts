import styled, { css } from 'styled-components'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.COLORS.BACKGROUND_RED};
  border-radius: 52px;
  border: 1px solid transparent;
  padding: 16px;
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  ${props =>
    props.isErrored &&
    css`
      border-color: ${({ theme }) => theme.COLORS.ERROR};
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: ${({ theme }) => theme.COLORS.PRIMARY};
    `}
  ${props =>
    props.isFilled &&
    css`
      color: ${({ theme }) => theme.COLORS.PRIMARY};
    `}
    input {
    color: ${({ theme }) => theme.COLORS.PRIMARY};
    background: transparent;
    border: 0;
    padding-left: 15px;
    &::placeholder {
      color: ${({ theme }) => theme.COLORS.TEXT_RED};
    }
    ${props =>
      props.isFocused &&
      css`
        color: ${({ theme }) => theme.COLORS.PRIMARY};
        border-color: ${({ theme }) => theme.COLORS.PRIMARY};
      `}
    ${props =>
      props.isFilled &&
      css`
        color: ${({ theme }) => theme.COLORS.PRIMARY};
      `}
  }
  svg {
    margin-right: 16px;
  }
  & + div {
    margin-top: 8px;
  }
`
