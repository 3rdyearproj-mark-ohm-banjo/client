import axios, {axiosPrivate} from '../axios'

const addAdmin = (adminData) => {
  const res = axiosPrivate.post(`admin/register`, adminData)
  return res
}

const getAllReport = (pageSize = 10, pageNo = 1, query) => {
  const q = (() => {
    if (query) {
      return '&' + q
    } else return null
  })()

  let url = `admin/reportinformation?size=${pageSize}&page=${pageNo}`

  if (q) {
    url += q
  }

  const res = axiosPrivate.get(url)
  return res
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  addAdmin,
  getAllReport,
}
