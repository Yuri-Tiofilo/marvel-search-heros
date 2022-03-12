import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'common/styles/global'
import 'common/i18n'

import { Main } from 'containers/Main'
import AppProvider from 'hooks'
import theme from 'common/styles/theme'

const queryClient = new QueryClient()

const App: React.FC = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <Main />
          <GlobalStyle />
        </ThemeProvider>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </Router>
)

export default App
