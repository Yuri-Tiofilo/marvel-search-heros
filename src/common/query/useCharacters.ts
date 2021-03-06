import { useQuery } from 'react-query'
import api from 'common/services/api'

import { baseConfig } from '../constants'

const { apiKey, hash, ts } = baseConfig

const urlDefault = `/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`

type PropsCharacters = {
  url: string
  params?: {
    ts?: string
    apiKey?: string
    hash?: string
    offset?: string
    page?: number
  }
}

export async function loadCharactersNew({ url }: PropsCharacters) {
  const urlFormatted = `${url}&ts=${ts}&apikey=${apiKey}&hash=${hash}`
  const { data } = await api.get(urlFormatted)
  const { data: responseFormatted } = data
  return responseFormatted
}

export async function loadCharacters(url: string) {
  const { data } = await api.get(url)
  const { data: responseFormatted } = data
  return responseFormatted
}

export function useCharacters({ url = urlDefault }: PropsCharacters) {
  return useQuery('characters', () => loadCharacters(url))
}
