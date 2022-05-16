import {useQuery} from 'react-query'
import {useCallback} from 'react'
import typeService from '../request/typeService'

export const useTypesQuery = () => {
  return useQuery('getAllType', typeService.getAllTypes, {
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
  })
}
