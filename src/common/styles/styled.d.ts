import 'styled-components'
import theme from '.'

declare module 'styled-components' {
  type ThemeType = typeof theme

  export interface DefaultTheme extends ThemeType {
    title: string
    COLORS: {
      BACKGROUND: string
      PRIMARY: string
      SECONDARY: string
      TITLE: string
      TEXT: string
      SUBTEXT: string
      BACKGROUND_SEARCH: string
      TEXT_RED: string
      WHITE: string
      WHITE300: string
      BORDER: string
      UNDERLINE: string
      ERROR: string
      SUCESS: string
    }
  }
}
