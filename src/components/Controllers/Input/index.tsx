import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback
} from 'react'
import { IconBaseProps } from 'react-icons'
import { useTheme } from 'styled-components'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>
  onBlur(element: React.FocusEvent<HTMLInputElement>): void
  isHome?: boolean
}
const Input: React.FC<InputProps> = ({
  icon: Icon,
  onBlur,
  isHome = true,
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
  const handleInputBlur = useCallback(
    element => {
      setIsFocused(false)

      setIsFilled(!!inputRef.current?.value)

      onBlur(element)
    },
    [onBlur]
  )

  return (
    <Container
      isHome={isHome}
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
        {...rest}
      />
    </Container>
  )
}

export { Input }
