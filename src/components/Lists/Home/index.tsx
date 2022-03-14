import React from 'react'
import { DataResultsAPI, Results } from 'containers/Home/home.types'

import { Container } from './styles'
import { Link } from 'react-router-dom'

type Props = {
  resultsCharacters?: DataResultsAPI
}

export function ListHome({ resultsCharacters }: Props) {
  return (
    <>
      {resultsCharacters && (
        <Container style={{ maxWidth: '70rem', width: '100%' }}>
          {resultsCharacters.results.map((element, key) => (
            <Link
              to={`/details/${element.name}`}
              key={key}
              style={{ textDecoration: 'none', color: 'initial' }}
            >
              <li>
                <img
                  src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                  alt={element.name}
                  height={230}
                  width={230}
                />
                <div>
                  <h3>{element.name}</h3>
                </div>
              </li>
            </Link>
          ))}
        </Container>
      )}
    </>
  )
}
