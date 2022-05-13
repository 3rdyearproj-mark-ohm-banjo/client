import {useQuery} from 'react-query'
import userService from '../request/userService'

export const useCurrentUser = () => {
  return useQuery('currentUser', userService.getCurrentUser)
}
