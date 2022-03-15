import React from 'react'
// import { AuthProvider } from './auth'
import { FavoriteProvider } from './favorites'

const AppProvider: React.FC = ({ children }) => (
  <FavoriteProvider>{children}</FavoriteProvider>
)
export default AppProvider
