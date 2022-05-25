import {useQuery} from 'react-query'
import {useCallback} from 'react'
import typeService from '../request/typeService'

const useTypes = () => {
  return useQuery('getTypes', typeService.getAllTypes, {
    select: useCallback(
      (data) =>
        data?.data?.map((item) => {
          return {
            id: item._id,
            name: item.typeName,
          }
        }),
      []
    ),
    refetchOnMount: false,
  })
}

export default useTypes
