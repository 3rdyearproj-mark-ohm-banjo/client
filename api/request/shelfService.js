import axios from 'axios'

const getShelfById = async (id) => {
  const res = await axios.get(`/bookShelf/bs/${id}`)
  return res.data
}

const getShelfByIsbn = async (isbn) => {
  const res = await axios
    .get(`/bookShelf/bs/${isbn}`)
    .then((res) => res.data)
    .catch((err) => err.response)
  return res
}

const getAllShelf = async () => {
  const res = await axios
    .get(`/bookShelf/bs`)
    .then((res) => res.data)
    .catch((err) => err.response)
  return res
}

const getShelfByPage = async (params, size) => {
  const res = await axios
    .get(`/bookShelf/bsP`, {params: {...params, size}})
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
    .post(`/bookShelf/bs`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data)
  return res
}

const editShelf = async (data, file) => {
  // const formData = new FormData()
  // if (file) {
  //   formData.append('imgfile', file[0])
  // }
  // formData.append('book', JSON.stringify(data))
  // const res = await axios
  //   .put(`${BASE_URL}/bookShelf/bs/${data.ISBN}`, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //   .then((res) => res.data)
  //   .catch((err) => err.response.data)
  // return res
}

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
