import {useQuery} from 'react-query'
import {useCallback} from 'react'
import publisherService from '../request/publisherService'

export const usePublishersQuery = () => {
  return useQuery('getAllPublisher', publisherService.getAllPublisher, {
    select: useCallback(
      (data) =>
        data?.data?.map((item) => {
          return {
            id: item._id,
            name: item.publisherName,
          }
        }),
      []
    ),
  })
}
