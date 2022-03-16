import { lazy } from 'react'

const Home = lazy(() => import('containers/Home'))
const Details = lazy(() => import('containers/Details'))

const route = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/details/:id',
    component: Details,
    exact: true
  }
]

export default route
