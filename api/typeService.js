import axios from 'axios'
import {BASE_URL} from '../config/env'

const getAllTypes = async () => {
  const res = await axios
    .get(`${BASE_URL}type`)
    .then((res) => res)
    .catch((err) => err.response)
  return res.data
}

const getTypeById = () => {}

const addType = (data) => {}

const editType = (data) => {}

const deleteType = (id) => {}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllTypes,
  getTypeById,
  addType,
  editType,
  deleteType,
}
