import axios, {axiosPrivate} from '../axios'
import Cookies from 'universal-cookie'

export const login = (email, password) => {
  const res = axiosPrivate.post(`/login`, {
    email,
    password,
  })

  return res
}

export const logout = () => {
  const cookies = new Cookies()
  console.log(cookies.get('jwt'))
  const res = axiosPrivate.get('/logout')
  return res
}

export const getCurrentUser = () => {
  const res = axiosPrivate.get('user/profile')
  return res
}

export const register = (userData) => {
  const res = axios.post(`/register`, userData)
  return res
}

export const cancelDonation = (bookId) => {
  const res = axiosPrivate.delete(`user/canceldonation/${bookId}`)
  return res
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  login,
  logout,
  register,
  getCurrentUser,
  cancelDonation,
}
