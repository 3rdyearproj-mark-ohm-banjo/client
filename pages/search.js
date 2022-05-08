import {useState, useEffect} from 'react'
import BookCard from '../components/BookCard'
import styled, {css} from 'styled-components'
import {SPACING} from '../styles/spacing'
import Pagination from '../components/Pagination'
import Background from '../public/static/images/background-default.png'
import {COLORS} from '../styles/colors'
import {Icon, SearchDropdown} from '../components'
import {FONTS} from '../styles/fonts'
import BackgroundContainer from '../components/BackgroundContainer'
import IconButton from '../components/IconButton'
import {ICONS, ICON_SIZE} from '../config/icon'
import {useRouter} from 'next/router'
import {TYPES} from '../config/types-mockup'
import shelfService from '../api/shelfService'
import Head from 'next/head'
import {default_param} from '../config/searchQuery'
import publisherService from '../api/publisherService'
import typeService from '../api/typeService'

const ContentWrapper = styled.section`
  max-width: 1050px;
  width: 100%;
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
  max-width: 100%;
  max-height: 1000px;
  height: 100%;
  width: 100%;
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
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const SearchInputContainer = styled.div`
  height: 40px;
  width: 100%;
  position: relative;

  > button {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 36px;
    height: 36px;
  }
`

const Input = styled.input`
  border-radius: 20px;
  border: 1px solid ${COLORS.GRAY_DARK};
  font-family: ${FONTS.PRIMARY};
  padding: ${SPACING.SM} ${SPACING.LG};
  outline: none;
  font-size: 16px;
  width: 100%;

  &:focus {
    border-color: ${COLORS.PRIMARY};
  }
`

const SecondaryRecommendStyled = css`
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.GRAY_LIGHT_2};
`

const BreadCrumb = styled.ul`
  display: flex;
  align-self: start;
  align-items: center;
  font-size: 14px;
  gap: ${SPACING.MD};
`

const BreadCrumbLink = styled.li`
  &:hover {
    transition: 0.1s;
    cursor: pointer;
    text-decoration: underline;
  }
`

const NoResult = styled.div`
  height: 200px;
  width: 100%;
  line-height: 200px;
  text-align: center;
  font-size: 24px;
  background-color: ${COLORS.GRAY_LIGHT_2};
  border-radius: ${SPACING.MD};
`

const TypeContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.SM};
  flex-basis: 100%;
`

const TypeItem = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  padding: 4px 12px;
  background-color: ${COLORS.PRIMARY};
  border-radius: 6px;
  color: ${COLORS.WHITE};
  gap: 8px;
  cursor: pointer;
  transition: 200ms;

  &:hover {
    opacity: 0.7;
  }
`

const SearchPage = ({isEmptyQuery, publishers, types}) => {
  const router = useRouter()
  const pageSize = 3
  const [isTriggerFilter, setIsTriggerFilter] = useState(false)
  const [queryParam, setQueryParam] = useState(router.query)
  const currentTypes = router?.query?.types && router?.query?.types?.split(',')
  const [bookData, setBookData] = useState([])
  const [totalPage, setTotalPage] = useState(0)

  const onPageChange = (page) => {
    router.push({pathname: '/search', query: {...queryParam, page}})
  }

  const handleClickSearch = () => {
    router.push({pathname: '/search', query: queryParam})
  }

  useEffect(() => {
    if (router.query.page) {
      setQueryParam(router.query)
      shelfService.getShelfByPage(router.query, pageSize).then((res) => {
        setTotalPage(res.total)
        setBookData(res.data)
      })
    }
  }, [router])

  useEffect(() => {
    if (isEmptyQuery) {
      router.push({pathname: '/search', query: default_param})
    }
  }, [isEmptyQuery])

  return (
    <>
      <Head>
        <title>Share my Book - ค้นหาหนังสือ</title>
      </Head>
      <BackgroundContainer link={Background.src}>
        <ContentWrapper>
          <BreadCrumb>
            <BreadCrumbLink onClick={() => router.push('/')}>
              หน้าแรก
            </BreadCrumbLink>
            <Icon name={ICONS.faChevronRight} size={ICON_SIZE.sm} />
            <li>ค้นหา</li>
          </BreadCrumb>
          <ToolContainer>
            <SearchContainer>
              <ToolItemContainer>
                <SearchInputContainer>
                  <Input
                    type="search"
                    placeholder="ค้นหาหนังสือ..."
                    onChange={(e) => {
                      setQueryParam({...queryParam, searchText: e.target.value})
                    }}
                    value={queryParam.searchText || ''}
                  />
                  <IconButton
                    onClick={handleClickSearch}
                    name={ICONS.faSearch}
                    borderRadius="50%"
                  />
                </SearchInputContainer>
                <IconButton
                  name={ICONS.faFilter}
                  borderRadius="8px"
                  onClick={() => setIsTriggerFilter(!isTriggerFilter)}
                  isActive={isTriggerFilter}
                />
              </ToolItemContainer>
              {isTriggerFilter && (
                <FilterContainer>
                  {currentTypes?.length > 0 && (
                    <TypeContainer>
                      {currentTypes?.map((type) => (
                        <TypeItem
                          key={type}
                          onClick={() => {
                            router.push({
                              pathname: 'search',
                              query: {
                                ...queryParam,
                                types: currentTypes
                                  .filter((currentType) => currentType !== type)
                                  .toString(),
                              },
                            })
                          }}
                        >
                          {types.find((item) => item.id === type)?.name}
                        </TypeItem>
                      ))}
                    </TypeContainer>
                  )}
                  <SearchDropdown
                    dataList={
                      currentTypes
                        ? types.filter(
                            (type) => currentTypes.indexOf(type.id) === -1
                          )
                        : types
                    }
                    onClickDropdown={(val) =>
                      router.push({
                        pathname: '/search',
                        query: {
                          ...queryParam,
                          types: queryParam.types
                            ? queryParam.types + ',' + val
                            : val,
                        },
                      })
                    }
                  />
                  <SearchDropdown
                    dataList={publishers}
                    onClickDropdown={(val) =>
                      router.push({
                        pathname: '/search',
                        query: {...queryParam, publisher: val},
                      })
                    }
                    placeHolder="ค้นหาสำนักพิมพ์..."
                    showCurrentData
                    value={router?.query?.publisher}
                  />
                </FilterContainer>
              )}
            </SearchContainer>
          </ToolContainer>

          <BookListContainer>
            {bookData?.length > 0 && (
              <>
                {bookData.map((book) => (
                  <BookCard key={`book-${book?._id}`} bookInfo={book} />
                ))}
              </>
            )}

            {bookData?.length === 0 && (
              <NoResult>ขออภัย ไม่พบข้อมูลการค้นหานี้</NoResult>
            )}
          </BookListContainer>

          {Math.ceil(totalPage / pageSize) > 1 && (
            <PaginationWrapper>
              <Pagination
                totalPage={Math.ceil(totalPage / pageSize)}
                currentPage={parseInt(queryParam.page)}
                onPageChange={onPageChange}
              />
            </PaginationWrapper>
          )}
        </ContentWrapper>
      </BackgroundContainer>
    </>
  )
}

export default SearchPage

export const getServerSideProps = async (context) => {
  const publishers = await publisherService.getAllPublisher().then((res) =>
    res.data.map((item) => {
      return {
        id: item._id,
        name: item.publisherName,
      }
    })
  )

  const types = await typeService.getAllTypes().then((res) =>
    res.data.map((item) => {
      return {
        id: item._id,
        name: item.typeName,
      }
    })
  )

  return {
    props: {
      isEmptyQuery: Object.keys(context.query).length < 1 ? true : false,
      publishers,
      types,
    },
  }
}
