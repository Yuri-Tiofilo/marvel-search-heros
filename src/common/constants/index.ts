const env = process.env.NODE_ENV

const baseConfig = {
  url: process.env.REACT_APP_BASE_URL,
  apiKey: process.env.REACT_APP_API_KEY,
  hash: process.env.REACT_APP_HASH,
  ts: process.env.REACT_APP_TS
}

export { baseConfig, env }
