import axios, { axiosPrivate } from '../axios'
import Cookies from 'universal-cookie'

const login = (email, password) => {
  const res = axiosPrivate.post(`/login`, {
    email,
    password,
  })

  return res
}

const logout = () => {
  const res = axiosPrivate.get('/logout')
  return res
}

const getCurrentUser = () => {
  const res = axiosPrivate.get('user/profile')
  return res
}

const register = (userData) => {
  const res = axios.post(`/register`, userData)
  return res
}

const cancelDonation = (bookId) => {
  const res = axiosPrivate.delete(`user/canceldonation/${bookId}`)
  return res
}

const changePassword = (oldPassword, newPassword) => {
  const res = axiosPrivate.put(`user/changepassword`, {
    oldPassword,
    newPassword,
  })
  return res
}

const updateInfo = (info) => {
  const res = axiosPrivate.put(`user/editInfo`, info)
  return res
}

const sendBorrowRequest = (bookshelfId) => {
  const res = axiosPrivate.post(`user/addqueue/${bookshelfId}`)
  return res
}

const confirmReceive = (bookId) => {
  const res = axiosPrivate.put(`user/confirmreceive/${bookId}`)
  return res
}

const cancelBorrow = (bookshelfId, bookTransactionId) => {
  const res = axiosPrivate.put(`user/cancelborrow/${bookshelfId}?bookHisId=${bookTransactionId}`)
  return res
}

const confirmCancelBorrow = (bookHisId) => {
  const res = axiosPrivate.delete(`user/acceptcancelborrow/${bookHisId}`)
  return res
}

const borrowRequest = () => {
  const res = axiosPrivate.get(`user/borrowRequest`)
  return res
}

const forwardingRequest = () => {
  const res = axiosPrivate.get(`user/forwardingrequest`)
  return res
}

const confirmReadingSuccess = (bookId) => {
  const res = axiosPrivate.put(`user/readingsuccess/${bookId}`)
  return res
}

const confirmForwarding = (bookId) => {
  const res = axiosPrivate.put(`user/booksending/${bookId}`)
  return res
}

const currentHoldingBook = () => {
  const res = axiosPrivate.get(`user/currentholding`)
  return res
}

const borrowHistory = () => {
  const res = axiosPrivate.get(`user/successborrowrequest`)
  return res
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  login,
  logout,
  register,
  getCurrentUser,
  cancelDonation,
  updateInfo,
  changePassword,
  sendBorrowRequest,
  confirmReceive,
  cancelBorrow,
  borrowRequest,
  forwardingRequest,
  confirmReadingSuccess,
  confirmForwarding,
  currentHoldingBook,
  borrowHistory,
  confirmCancelBorrow
}
