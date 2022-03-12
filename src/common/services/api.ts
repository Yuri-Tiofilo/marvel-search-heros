import axios from 'axios'
import { baseConfig } from '../constants'

const api = axios.create({
  baseURL: `${baseConfig.url}`
})
export default api
