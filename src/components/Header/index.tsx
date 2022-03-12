import React from 'react'

import { Container, Image } from './styles'
import LogoHome from 'assets/logo.svg'
import LogoDetails from 'assets/logo_menor.svg'

type HeaderProps = {
  isHome?: boolean
}

const Header = ({ isHome = false }: HeaderProps) => {
  return (
    <>
      {isHome ? (
        <Container isHome={isHome}>
          <Image src={LogoHome} alt="Logo" />
        </Container>
      ) : (
        <header>
          <img src={LogoDetails} alt="Logo details" />
        </header>
      )}
    </>
  )
}

export { Header }
