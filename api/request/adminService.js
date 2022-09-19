import axios, {axiosPrivate} from '../axios'

const addAdmin = (adminData) => {
  const res = axiosPrivate.post(`/register`, adminData)
  return res
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  addAdmin,
}
