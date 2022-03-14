import React from 'react'

import { render, fireEvent, wait } from '@testing-library/react'
import { Input } from '../../components/Controllers/Input'

describe('Input Component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input
        name="email"
        placeholder="E-mail"
        onBlur={() => {
          return false
        }}
      />
    )

    expect(getByPlaceholderText('E-mail')).toBeTruthy()
  })

  it('should render highlight in input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input
        placeholder="E-mail"
        onBlur={() => {
          return false
        }}
      />
    )

    const inputElement = getByPlaceholderText('E-mail')
    const containerElement = getByTestId('input-container')

    fireEvent.focus(inputElement)

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: transparent;')
      expect(containerElement).toHaveStyle('color: #ff0000')
    })

    fireEvent.blur(inputElement)

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #0000;')
      expect(containerElement).not.toHaveStyle('color: #ff9900;')
    })
  })

  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input
        name="email"
        placeholder="E-mail"
        onBlur={() => {
          return false
        }}
      />
    )

    const inputElement = getByPlaceholderText('E-mail')
    const containerElement = getByTestId('input-container')

    fireEvent.change(inputElement, {
      target: { value: 'yuri@incca.com.br' }
    })

    await wait(() => {
      expect(containerElement).toHaveStyle('color: rgb(96, 99, 96);')
    })
  })
})
