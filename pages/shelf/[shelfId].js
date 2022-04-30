import React from 'react'
import {BookInfo} from '../../components'
import {BOOK_SHELF} from '../../config/bookshelf-mockup'

const BookShelfPage = () => {
  return <BookInfo bookInfo={BOOK_SHELF} />
}

export default BookShelfPage
