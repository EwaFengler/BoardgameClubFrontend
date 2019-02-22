import axios from 'axios'

export const HTTP = axios.create({
  // TODO: jeżeli odpalasz na własnym komputerze:
  // baseURL: `http://localhost:8080/`,
  baseURL: `http://192.168.1.61:8080/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})
