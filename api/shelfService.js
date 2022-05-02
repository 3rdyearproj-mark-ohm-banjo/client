import axios from 'axios'
import {LOCAL_BASE_URL} from '../config/env'

const getShelfById = async (id) => {
  const res = await axios
    .get(`${LOCAL_BASE_URL}bookShelf/bs/${id}`)
    .then((res) => res.data)
    .catch((err) => err.response.data)
  return res
}

const getShelfByIsbn = async (isbn) => {
  const res = await axios
    .get(`${LOCAL_BASE_URL}bookShelf/bs/${isbn}`)
    .then((res) => res.data)
    .catch((err) => err.response.data)
  return res
}

const getAllShelf = async () => {
  const res = await axios
    .get(`${LOCAL_BASE_URL}bookShelf/bs`)
    .then((res) => res.data)
    .catch((err) => err.response.data)
  return res
}

const addShelf = async (data, file) => {
  const formData = new FormData()
  if (file) {
    formData.append('imgfile', file[0])
  }
  formData.append('book', JSON.stringify(data))

  const res = await axios
    .post(`${LOCAL_BASE_URL}bookShelf/bs`, formData, {
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
  getShelfById,
  getShelfByIsbn,
  addShelf,
  editShelf,
  deleteShelf,
}
