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
import IconButton from '../components/IconButton'
import {ICONS} from '../config/icon'

const ContentWrapper = styled.section`
  max-width: 1050px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${SPACING.MD};
  background-color: ${COLORS.GRAY_LIGHT_3};
  border-radius: ${SPACING.MD};
  box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
`

const BookListContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.LG};
  margin: 30px 0 16px;
  justify-content: center;
`

const PaginationWrapper = styled.div`
  border-radius: 28px;
  margin: ${SPACING.MD} 0;
  padding: ${SPACING.MD};
`

const ToolContainer = styled.section`
  max-width: 550px;
  margin: 0 ${SPACING.MD};
  width: 100%;
  padding: ${SPACING.MD};
`

const SearchContainer = styled.div``

const ToolItemContainer = styled.div`
  display: flex;
  gap: ${SPACING.LG};

  > button {
    flex-shrink: 0;
  }
`

const FilterContainer = styled.div`
  transition: 0.3s;
  border-radius: ${SPACING.MD};
  background-color: ${COLORS.GRAY_LIGHT_3};
  padding: ${SPACING.MD};
  margin: ${SPACING.MD} 0;
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
  const [isTriggerFilter, setIsTriggerFilter] = useState(false)

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
              <ToolItemContainer>
                <Input type="search" placeholder="ค้นหาหนังสือ..."></Input>
                <IconButton
                  name={ICONS.faFilter}
                  borderRadius="8px"
                  onClick={() => setIsTriggerFilter(!isTriggerFilter)}
                  isActive={isTriggerFilter}
                />
              </ToolItemContainer>
              {isTriggerFilter && (
                <FilterContainer>
                  <SearchDropdown />
                  <SearchDropdown />
                </FilterContainer>
              )}
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
              totalPage={10}
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
