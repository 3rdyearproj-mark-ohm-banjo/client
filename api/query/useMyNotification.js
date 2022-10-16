import {useQuery} from 'react-query'
import notificationService from '../request/notificationService'

const useMyForwardRequest = (enabled = true) => {
  return useQuery('getMyNotification', notificationService.getMyNotification, {
    enabled,
  })
}

export default useMyForwardRequest
