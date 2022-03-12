import { useQuery } from 'react-query'
import api from 'common/services/api'

import { baseConfig } from '../constants'

const { apiKey, hash, ts } = baseConfig

const urlDefault = `/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`

type PropsCharacters = {
  url?: string
  page?: number
}

export function useCharacters({ url = urlDefault, page = 0 }: PropsCharacters) {
  return useQuery('posts', async () => {
    const { data } = await api.get(url)
    return data
  })
}
