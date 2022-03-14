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
  onBlur(): void
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
  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)

    onBlur()
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
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
    </Container>
  )
}

export { Input }
