import axios from 'axios'
const PORT = 8080
const URL = 'http://gsupport.gsoft.com.br'
const api = axios.create({
    baseURL: URL
})

export default api