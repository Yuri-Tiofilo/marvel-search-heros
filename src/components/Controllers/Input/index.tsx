import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react'
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'
import { Container } from './styles'
import { useTheme } from 'styled-components'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: object
  icon?: React.ComponentType<IconBaseProps>
  onBlur(element: React.FocusEvent<HTMLInputElement>): void
}
const Input: React.FC<InputProps> = ({
  containerStyle = {},
  icon: Icon,
  onBlur,
  ...rest
}) => {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const handleInputFocus = useCallback(() => {
    setIsFocused(true)

    setIsFilled(!!inputRef.current?.value)
  }, [])
  const handleInputBlur = useCallback(element => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)

    onBlur(element)
  }, [])

  return (
    <Container
      style={containerStyle}
      isErrored={false}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} color={theme.COLORS.PRIMARY} />}
      <input
        onFocus={handleInputFocus}
        onBlur={element => handleInputBlur(element)}
        ref={inputRef}
        onKeyDown={element => console.log('veio aqui')}
        {...rest}
      />
    </Container>
  )
}

export { Input }
