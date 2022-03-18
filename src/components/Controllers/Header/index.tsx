import React from 'react'
import { Link } from 'react-router-dom'

import LogoHome from 'assets/logo.svg'
import LogoDetails from 'assets/logo_menor.svg'
import { Search } from 'components/Filters/Search'

import { Container, Image, ContentImage, ContentSearch } from './styles'

type HeaderProps = {
  isHome?: boolean
}

const Header = ({ isHome = false }: HeaderProps) => {
  return (
    <>
      {isHome ? (
        <Container isHome={isHome}>
          <Link to="/" style={{ cursor: 'pointer' }}>
            <Image src={LogoHome} alt="Logo details" />
          </Link>
        </Container>
      ) : (
        <Container isHome={isHome}>
          <ContentImage>
            <Link to="/" style={{ cursor: 'pointer' }}>
              <Image src={LogoDetails} alt="Logo details" />
            </Link>
          </ContentImage>

          <ContentSearch>
            <Search
              isHome={false}
              onblur={() => {}}
              cleanSearch={() => {}}
              onChangeText={() => {}}
              value=""
              isSearched={false}
            />
          </ContentSearch>
        </Container>
      )}
    </>
  )
}

export { Header }
