import axios from 'axios'
import {BASE_URL} from '../../config/env'

const getAllPublisher = async () => {
  const res = await axios.get(`${BASE_URL}publisher`)
  return res.data
}

const getPublisherById = () => {}

const addPublisher = (data) => {}

const editPublisher = (data) => {}

const deletePublisher = (id) => {}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllPublisher,
  getPublisherById,
  addPublisher,
  editPublisher,
  deletePublisher,
}
