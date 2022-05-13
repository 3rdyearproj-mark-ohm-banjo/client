import {useState, useEffect} from 'react'
import Head from 'next/head'
import BookCard from '../components/BookCard'
import styled from 'styled-components'
import {SPACING} from '../styles/spacing'
import Background from '../public/static/images/background-default.png'
import {COLORS} from '../styles/colors'
import {Icon, SearchDropdown} from '../components'
import {FONTS} from '../styles/fonts'
import BackgroundContainer from '../components/BackgroundContainer'
import IconButton from '../components/IconButton'
import {ICONS} from '../config/icon'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Scrollbar} from 'swiper'
import 'swiper/css'
import 'swiper/css/scrollbar'
import {css} from 'styled-components'
import {useRouter} from 'next/router'
import {TYPES} from '../config/types-mockup'
import shelfService from '../api/request/shelfService'
import {default_param} from '../config/searchQuery'
import {ContentWrapper} from '../components/Layout'

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

const RecommendWrapper = styled.section`
  width: 100%;
  padding: ${SPACING.MD};
  background-color: ${COLORS.GRAY_LIGHT_2};
  border-radius: ${SPACING.MD};
  color: ${COLORS.PRIMARY};

  ${(props) => props.type === 'secondary' && SecondaryRecommendStyled}
`

const Title = styled.h3`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: ${SPACING.SM};

  > svg {
    margin-left: ${SPACING.SM};
  }
`

const BreadCrumb = styled.ul`
  display: flex;
  align-self: start;
  align-items: center;
  font-size: 14px;
  gap: ${SPACING.MD};
`

const Home = () => {
  const router = useRouter()
  const [isTriggerFilter, setIsTriggerFilter] = useState(false)
  const [queryParam, setQueryParam] = useState(default_param)
  const [recommendBook, setRecommendBook] = useState([])
  const [newBook, setNewBook] = useState([])

  const handleClickSearch = () => {
    router.push({pathname: '/search', query: queryParam})
  }

  useEffect(() => {
    shelfService.getAllShelf().then((res) => {
      setNewBook(res.data)
      setRecommendBook(res.data)
    })

    return () => {
      setNewBook([])
      setRecommendBook([])
    }
  }, [])

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
          <BreadCrumb>
            <li>หน้าแรก</li>
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
                    value={queryParam.searchText}
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
                  <SearchDropdown
                    dataList={TYPES}
                    onClickDropdown={(val) =>
                      setQueryParam({...queryParam, type: val})
                    }
                    showCurrentData
                  />
                  <SearchDropdown />
                </FilterContainer>
              )}
            </SearchContainer>
          </ToolContainer>

          <BookListContainer>
            <RecommendWrapper>
              <Title>
                หนังสือยอดนิยมที่สุด <Icon name={ICONS.faFire} />
              </Title>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  600: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                scrollbar={{
                  hide: true,
                }}
                modules={[Scrollbar]}
                loop={true}
                className="mySwiper"
              >
                {recommendBook.map((book) => (
                  <SwiperSlide key={`recommendBook-${book._id}`}>
                    <BookCard bookInfo={book}></BookCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </RecommendWrapper>

            <RecommendWrapper type="secondary">
              <Title>
                หนังสือมาใหม่ <Icon name={ICONS.faCalendarDays} />
              </Title>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  600: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                scrollbar={{
                  hide: true,
                }}
                modules={[Scrollbar]}
                loop={true}
                className="mySwiper"
              >
                {newBook.map((book) => (
                  <SwiperSlide key={`newBook-${book._id}`}>
                    <BookCard bookInfo={book}></BookCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </RecommendWrapper>
          </BookListContainer>
        </ContentWrapper>
      </BackgroundContainer>
    </>
  )
}

export default Home
