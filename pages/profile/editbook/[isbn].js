import React from 'react'
import AddBookForm from '../../../components/forms/AddBookForm'
import {useRouter} from 'next/router'
import {BackgroundContainer} from '../../../components'
import Background from '../../../public/static/images/background-default.png'
import {AddBookLayout} from '../../../components/Layout'
import shelfService from '../../../api/request/shelfService'

const BookEditPage = () => {
  const router = useRouter()
  const bookIsbn = router.query.isbn

  const editBookShelf = (bookData, imageFile) => {
    shelfService.editShelf(bookData, imageFile).then(() => {
      router.push(`/profile`)
    })
  }

  return (
    <BackgroundContainer link={Background.src}>
      <AddBookLayout>
        <AddBookForm
          isbnBookToEdit={bookIsbn}
          onPrevious={() => router.push('/profile')}
          onSubmit={editBookShelf}
        ></AddBookForm>
      </AddBookLayout>
    </BackgroundContainer>
  )
}

export default BookEditPage
