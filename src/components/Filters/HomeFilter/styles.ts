import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 40px 0px 10px 0px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-top: 50px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`

export const Order = styled.div`
  display: flex;
  flex-direction: row;

  color: ${({ theme }) => theme.COLORS.TEXT_RED};

  @media screen and (max-width: 480px) {
    margin-top: 20px;
  }
`

export const ContentOrder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    margin-right: 16px;
  }

  img {
    margin-right: 10px;
  }

  @media screen and (max-width: 480px) {
    span {
      margin-right: 5px;
    }
  }
`

export const Favorite = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  border: 0;
  background: transparent;
  span {
    color: ${({ theme }) => theme.COLORS.TEXT_RED};
    margin-left: 10px;
  }

  @media screen and (max-width: 480px) {
    margin-left: 30px;
    span {
      color: ${({ theme }) => theme.COLORS.TEXT_RED};
      margin-left: 5px;
    }
  }
`

export const TextResults = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.SUBTEXT};
`
