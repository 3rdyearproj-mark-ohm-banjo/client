import {useQuery} from 'react-query'
import {useCallback} from 'react'
import publisherService from '../request/publisherService'

const usePublishers = () => {
  return useQuery('getPublishers', publisherService.getAllPublisher, {
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
    refetchOnMount: false,
  })
}

export default usePublishers
