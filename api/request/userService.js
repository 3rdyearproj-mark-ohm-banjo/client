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

export const changePassword = (oldPassword, newPassword) => {
  const res = axiosPrivate.put(`user/changepassword`, {
    oldPassword,
    newPassword,
  })
  return res
}

export const sendBorrowRequest = (bookshelfId) => {
  const res = axiosPrivate.post(`user/addqueue/${bookshelfId}`)
  return res
}

export const confirmReceive = (bookId) => {
  const res = axiosPrivate.put(`user/confirmreceive/${bookId}`)
  return res
}

export const cancelBorrow = (bookshelfId) => {
  const res = axiosPrivate.put(`user/cancelborrow/${bookshelfId}`)
  return res
}

export const borrowRequest = () => {
  const res = axiosPrivate.get(`user/borrowRequest`)
  return res
}

export const forwardingRequest = () => {
  const res = axiosPrivate.get(`user/forwardingrequest`)
  return res
}

export const confirmReadingSuccess = (bookId) => {
  const res = axiosPrivate.put(`user/readingsuccess/${bookId}`)
  return res
}

export const confirmForwarding = (bookId) => {
  const res = axiosPrivate.put(`user/booksending/${bookId}`)
  return res
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  login,
  logout,
  register,
  getCurrentUser,
  cancelDonation,
  changePassword,
  sendBorrowRequest,
  confirmReceive,
  cancelBorrow,
  borrowRequest,
  forwardingRequest,
  confirmReadingSuccess,
  confirmForwarding,
}
