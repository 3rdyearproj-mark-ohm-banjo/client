import axios from 'axios'

const getAllPublisher = async () => {
  const res = await axios.get(`/publisher`)
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
