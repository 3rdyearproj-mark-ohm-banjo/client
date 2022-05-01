import axios from 'axios'
import {LOCAL_BASE_URL} from '../config/env'

const getShelfById = (id) => {}

const getShelfByIsbn = async (isbn) => {
  const res = await axios
    .get(`${LOCAL_BASE_URL}bookShelf/${isbn}`)
    .then((res) => res.data)
    .catch((err) => err.response.data)
  return res
}

const getAllShelf = async () => {
  const res = await axios
    .get(`${LOCAL_BASE_URL}bookShelf`)
    .then((res) => res.data)
    .catch((err) => err.response.data)
  return res
}

const addShelf = async (data, file) => {
  console.log(data, typeof data?.image)
  const formData = new FormData()
  if (file) {
    formData.append('image', file)
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
