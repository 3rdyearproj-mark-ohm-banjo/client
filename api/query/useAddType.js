import {useMutation} from 'react-query'
import typeService from '../request/typeService'

const useAddType = (type) => {
  return useMutation('addType', () => typeService.addType(type), {})
}

export default useAddType
