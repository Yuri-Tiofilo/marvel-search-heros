import { useQuery } from 'react-query'
import api from 'common/services/api'

import { baseConfig } from '../constants'

const { apiKey, hash, ts } = baseConfig

const urlDefault = `/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`

type PropsCharacters = {
  url?: string
  params?: {
    ts?: string
    apiKey?: string
    hash?: string
    offset?: string
    page?: number
  }
}

export async function loadCharacters(url: string, params?: object) {
  const urlFormatted = '/'
  const { data } = await api.get(url)
  return data
}

export function useCharacters({ url = urlDefault }: PropsCharacters) {
  return useQuery('characters', () => loadCharacters(url))
}
