import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'common/styles/global'
import 'common/i18n'

import { Main } from 'containers/Main'
import AppProvider from 'hooks'
import theme from 'common/styles/theme'

import { queryClient } from 'common/services/query'

const App: React.FC = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <Main />
          <GlobalStyle />
        </ThemeProvider>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Router>
)

export default App
