import React, { memo } from 'react'
import { Results } from 'containers/Home/home.types'

import { Container, ButtonFavorite } from './styles'
import { Link } from 'react-router-dom'

type Props = {
  resultsCharacters: Results[]
  setFavoriteInStorage(element: Results): void
}

function ListHome({ resultsCharacters, setFavoriteInStorage }: Props) {
  return (
    <>
      {resultsCharacters && (
        <Container style={{ maxWidth: '70rem', width: '100%' }}>
          {resultsCharacters.map((element, key) => (
            <li key={key}>
              <>
                <Link
                  to={`/details/${element.id}`}
                  style={{ textDecoration: 'none', color: 'initial' }}
                >
                  <img
                    src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                    alt={element.name}
                    height={230}
                    width={230}
                  />
                </Link>
                <div>
                  <Link
                    to={`/details/${element.id}`}
                    style={{ textDecoration: 'none', color: 'initial' }}
                  >
                    <h3>{element.name}</h3>
                  </Link>

                  <ButtonFavorite
                    isActive={element.isFavorite}
                    onClick={() => {
                      setFavoriteInStorage(element)
                    }}
                  />
                </div>
              </>
            </li>
          ))}
        </Container>
      )}
    </>
  )
}

export default memo(ListHome)
