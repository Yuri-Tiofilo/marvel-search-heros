import React from 'react'
import { Input } from 'components/Controllers/Input'

import { FiSearch } from 'react-icons/fi'
import { Container } from './styles'

const Search = () => {
  return (
    <Container>
      <Input
        placeholder="Procure por heróis"
        icon={FiSearch}
        onBlur={() => {
          return false
        }}
      />
    </Container>
  )
}

export { Search }
