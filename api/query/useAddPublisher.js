import {useMutation} from 'react-query'
import publisherService from '../request/publisherService'

const useAddPublisher = (publisher) => {
  return useMutation(
    'addPublisher',
    () => publisherService.addPublisher(publisher),
    {}
  )
}

export default useAddPublisher
