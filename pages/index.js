import {useState} from 'react'
import Head from 'next/head'
import BookCard from '../components/BookCard'
import {BOOK_SHELF} from '../config/bookshelf-mockup'
import styled from 'styled-components'
import {SPACING} from '../styles/spacing'
import Pagination from '../components/Pagination'
import Background from '../public/static/images/background-default.png'
import {COLORS} from '../styles/colors'
import {SearchDropdown} from '../components'
import {FONTS} from '../styles/fonts'
import BackgroundContainer from '../components/BackgroundContainer'

const ContentWrapper = styled.section`
  max-width: 1050px;
  margin: 30px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${SPACING.MD};
`

const BookListContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.LG};
  margin: 30px 0 16px;
  justify-content: center;
`

const PaginationWrapper = styled.div`
  background-color: ${COLORS.WHITE};
  border-radius: 28px;
  margin: ${SPACING.MD} 0;
  padding: ${SPACING.MD};
`

const ToolContainer = styled.section`
  max-width: 1050px;
  margin: 0 ${SPACING.MD};
  width: 100%;
  background-color: ${COLORS.WHITE};
  padding: ${SPACING.MD};
  border-radius: ${SPACING.MD};
`

const SearchContainer = styled.div``

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.SM};

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid ${COLORS.GRAY_DARK};
  height: 40px;
  font-family: ${FONTS.PRIMARY};
  padding: ${SPACING.SM};
  outline: none;
  font-size: 16px;
  width: 100%;

  &:focus {
    border-color: ${COLORS.PRIMARY};
  }
`

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <>
      <Head>
        <title>Share my Book</title>
        <meta
          name="description"
          content="INT365/371 Share my Book Application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackgroundContainer link={Background.src}>
        <ContentWrapper>
          <ToolContainer>
            <SearchContainer>
              <Input type="search"></Input>
              <FilterContainer>
                <SearchDropdown />
                <SearchDropdown />
              </FilterContainer>
            </SearchContainer>
          </ToolContainer>

          <BookListContainer>
            <BookCard bookInfo={BOOK_SHELF} />
            <BookCard bookInfo={BOOK_SHELF} />
            <BookCard bookInfo={BOOK_SHELF} />
            <BookCard bookInfo={BOOK_SHELF} />
            <BookCard bookInfo={BOOK_SHELF} />
            <BookCard bookInfo={BOOK_SHELF} />
            <BookCard bookInfo={BOOK_SHELF} />
            <BookCard bookInfo={BOOK_SHELF} />
            <BookCard bookInfo={BOOK_SHELF} />
            <BookCard bookInfo={BOOK_SHELF} />
            <BookCard bookInfo={BOOK_SHELF} />
            <BookCard bookInfo={BOOK_SHELF} />
          </BookListContainer>

          <PaginationWrapper>
            <Pagination
              totalPage={20}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </PaginationWrapper>
        </ContentWrapper>
      </BackgroundContainer>
    </>
  )
}

export default Home
