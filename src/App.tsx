import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Main } from 'containers/Main'
import AppProvider from 'hooks'
import { Layout } from 'layout'
import theme from 'common/styles/theme'

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Layout theme={theme}>
        <Main />
      </Layout>
    </AppProvider>
  </Router>
)

export default App
