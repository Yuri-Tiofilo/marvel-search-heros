type TumbMail = {
  path: string
  extension: string
}

export type Results = {
  name: string
  id: number
  description: string
  thumbnail: TumbMail
}

export type DataResultsAPI = {
  offset: number
  limit: number
  total: number
  count: number
  results: Results[]
}
