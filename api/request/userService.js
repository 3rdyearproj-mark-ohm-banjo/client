import axios from 'axios'

export const login = (email, password) => {
  const res = axios.post(`/login`, {
    email,
    password,
  })

  return res
}

export const logout = () => {
  const res = axios.get('/logout')
  return res
}

export const getCurrentUser = async () => {
  const res = await axios.get('user/profile')
  return res
}

export const register = (userData) => {
  const res = axios.post(`/register`, userData)
  return res
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  login,
  logout,
  register,
  getCurrentUser,
}
