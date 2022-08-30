import {useCallback} from 'react'
import {useQuery} from 'react-query'
import userService from '../request/userService'

const useMyBorrowRequest = (enabled = true) => {
  return useQuery(
    'getBorrowRequest',
    () => userService.borrowRequest(),
    {
      select: useCallback((data) => {
        const mappedBorrow = data?.data?.data?.allRequest.map((item) => {
          const findBook = data?.data?.data?.bookTransaction.find(
            (bookTran) => bookTran.book.bookShelf === item.bookShelf._id
          )

          if (findBook) {
            item.book = findBook.book
          }

          return item
        })

        return mappedBorrow
      }, []),
      refetchOnMount: false,
    },
    enabled
  )
}

export default useMyBorrowRequest
