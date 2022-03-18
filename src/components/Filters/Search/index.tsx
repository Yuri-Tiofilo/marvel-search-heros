import React from 'react'
import { Input } from 'components/Controllers/Input'

import { FiSearch, FiX } from 'react-icons/fi'
import { Container } from './styles'

type Props = {
  onblur(element: React.FocusEvent<HTMLInputElement>): void
  isHome?: boolean
  isSearched?: boolean
  onChangeText(element: React.ChangeEvent<HTMLInputElement>): void
  cleanSearch(): void
  value: string
}

const Search = ({
  onblur,
  isHome = true,
  isSearched = false,
  onChangeText,
  cleanSearch,
  value
}: Props) => {
  return (
    <>
      <Container isHome={isHome}>
        <Input
          placeholder="Procure por heróis"
          icon={FiSearch}
          onBlur={element => {
            onblur(element)
          }}
          isHome={isHome}
          onChange={element => onChangeText(element)}
          value={value}
        />
      </Container>
      {isSearched && (
        <div
          style={{
            maxWidth: '50rem',
            width: '100%',
            margin: '0 auto',
            paddingTop: 20,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={cleanSearch}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FiX size={25} style={{ marginRight: 10 }} />
            Limpar filtro
          </span>
        </div>
      )}
    </>
  )
}

export { Search }
