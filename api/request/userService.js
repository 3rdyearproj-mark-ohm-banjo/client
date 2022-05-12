import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const login = (email, password) => {
  const res = axios
    .post(`/login`, {
      email,
      password,
    })
    .then((res) => {
      cookies.set('user-token', res.data.token, {path: '/'})
      return res
    })

  return res
}

export const logout = () => {
  cookies.remove('user-token')
}

export const register = (userData) => {
  const res = axios.post(`/register`, userData)
  console.log(res)
  return res
}
