const env = process.env.NODE_ENV

const baseConfig = {
  url: process.env.REACT_APP_BASE_URL,
  apiKey: process.env.API_KEY,
  hash: process.env.HASH,
  ts: process.env.TS
}

export { baseConfig, env }
