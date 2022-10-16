import {axiosPrivate} from '../axios'

const getMyNotification = () => {
  const res = axiosPrivate.get(`notification/mynotification`)
  return res
}

const seenNotification = (seenList) => {
  const res = axiosPrivate.put(`notification/seennotification`, {
    seenList,
  })
  return res
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getMyNotification,
  seenNotification,
}
