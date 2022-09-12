import axios from 'axios'

const CRYPTO_API_KEY = 'api_key=03232aa5-9939-4273-8204-db508967098e'
const CRYPTO_API_URL = 'https://api.simpleswap.io/v1'

export const list = () => axios.get(`${CRYPTO_API_URL}/get_all_currencies?${CRYPTO_API_KEY}`)
