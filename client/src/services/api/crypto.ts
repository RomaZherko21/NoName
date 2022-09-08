import axios from 'axios'

export const list = () => axios.get('https://api.coincap.io/v2/assets/')
