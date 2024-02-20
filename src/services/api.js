import axios from 'axios'
const PORT = 8081
const URLTeste = `//localhost:8081`
const URL = `http://adm.gsoft.com.br:${PORT}`
const api = axios.create({
    baseURL: URL,
    
})

export default api