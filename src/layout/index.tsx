import React, { ReactNode } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import GlobalStyle from '../common/styles/global'
import 'common/i18n'

type Props = {
  theme: DefaultTheme
  children: ReactNode
}

const Layout = ({ theme, children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  )
}

export { Layout }
