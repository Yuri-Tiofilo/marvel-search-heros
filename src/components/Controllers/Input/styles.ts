import styled, { css } from 'styled-components'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
  isHome: boolean
}

export const Container = styled.div<ContainerProps>`
  background: ${({ theme, isHome }) =>
    !isHome ? theme.COLORS.WHITE : theme.COLORS.BACKGROUND_RED};
  border-radius: 52px;
  border: 1px solid transparent;
  padding: 16px;
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  color: ${({ theme, isHome }) =>
    !isHome ? theme.COLORS.TEXT : theme.COLORS.PRIMARY};
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
    color: ${({ theme, isHome }) =>
      !isHome ? theme.COLORS.TEXT : theme.COLORS.PRIMARY};
    background: transparent;
    border: 0;
    padding-left: 15px;
    &::placeholder {
      color: ${({ theme, isHome }) =>
        !isHome ? theme.COLORS.SUBTEXT : theme.COLORS.PRIMARY};
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
