import {useQuery} from 'react-query'
import userService from '../request/userService'

const useISBNbook = () => {
  return useQuery('getCurrentUser', userService.getCurrentUser)
}

export default useISBNbook
