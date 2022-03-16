import React from 'react'
import { Input } from 'components/Controllers/Input'

import { FiSearch } from 'react-icons/fi'
import { Container } from './styles'

type Props = {
  onblur(element: React.FocusEvent<HTMLInputElement>): void
  isHome?: boolean
}

const Search = ({ onblur, isHome = true }: Props) => {
  return (
    <Container isHome={isHome}>
      <Input
        placeholder="Procure por heróis"
        icon={FiSearch}
        onBlur={element => {
          onblur(element)
        }}
        isHome={isHome}
      />
    </Container>
  )
}

export { Search }
