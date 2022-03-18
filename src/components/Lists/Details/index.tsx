import React, { memo } from 'react'

import { TumbMail } from 'containers/Home/home.types'

import { Container } from './styles'

export type Results = {
  title: string
  id: number
  description: string
  thumbnail: TumbMail
  isFavorite?: boolean
  name: string
}

type Props = {
  resultsCharacters: Results[]
}

function ListDetails({ resultsCharacters }: Props) {
  return (
    <>
      {resultsCharacters && (
        <Container
          style={{ maxWidth: '70rem', width: '100%', margin: '0 auto' }}
        >
          {resultsCharacters.map((element, key) => (
            <li key={key}>
              <>
                <img
                  src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                  alt={element.title}
                />
                <div>
                  <strong>{element.title}</strong>
                </div>
              </>
            </li>
          ))}
        </Container>
      )}
    </>
  )
}

export default memo(ListDetails)
