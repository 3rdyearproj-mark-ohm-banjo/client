import axios from 'axios'
import {LOCAL_BASE_URL} from '../config/env'

const getAllTypes = async () => {
  const data = await axios.get(`${LOCAL_BASE_URL}type`).catch((err) => err)
  return data
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
