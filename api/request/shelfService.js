import axios from 'axios'
import {BASE_URL} from '../../config/env'

const getShelfById = async (id) => {
  const res = await axios.get(`${BASE_URL}bookShelf/bs/${id}`)
  return res.data
}

const getShelfByIsbn = async (isbn) => {
  const res = await axios
    .get(`${BASE_URL}bookShelf/bs/${isbn}`)
    .then((res) => res.data)
    .catch((err) => err.response)
  return res
}

const getAllShelf = async () => {
  const res = await axios
    .get(`${BASE_URL}bookShelf/bs`)
    .then((res) => res.data)
    .catch((err) => err.response)
  return res
}

const getShelfByPage = async (params, size) => {
  const res = await axios
    .get(`${BASE_URL}bookShelf/bsP`, {params: {...params, size}})
    .then((res) => res.data)
    .catch((err) => err.response)
  return res
}

const addShelf = async (data, file) => {
  const formData = new FormData()
  if (file) {
    formData.append('imgfile', file[0])
  }
  formData.append('book', JSON.stringify(data))

  const res = await axios
    .post(`${BASE_URL}bookShelf/bs`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data)
  return res
}

const editShelf = (data) => {}

const deleteShelf = (id) => {}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllShelf,
  getShelfByPage,
  getShelfById,
  getShelfByIsbn,
  addShelf,
  editShelf,
  deleteShelf,
}
