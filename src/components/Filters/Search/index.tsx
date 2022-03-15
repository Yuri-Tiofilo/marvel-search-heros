import React from 'react'
import { Input } from 'components/Controllers/Input'

import { FiSearch } from 'react-icons/fi'
import { Container } from './styles'

type Props = {
  onblur(element: React.FocusEvent<HTMLInputElement>): void
}

const Search = ({ onblur }: Props) => {
  return (
    <Container>
      <Input
        placeholder="Procure por heróis"
        icon={FiSearch}
        onBlur={element => {
          onblur(element)
        }}
      />
    </Container>
  )
}

export { Search }
