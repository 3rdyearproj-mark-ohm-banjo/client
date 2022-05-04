import React, {useState, useEffect} from 'react'
import {BackgroundContainer, BookInfo} from '../../components'
import {BOOK_SHELF} from '../../config/bookshelf-mockup'
import {useRouter} from 'next/router'
import shelfService from '../../api/shelfService'
import styled from 'styled-components'
import {A11y} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import BookCard from '../../components/BookCard'
import Background from '../../public/static/images/background-default.png'
import {SPACING} from '../../styles/spacing'
import {COLORS} from '../../styles/colors'
import {TYPES_STYLE} from '../../config/types-styles'
import 'swiper/css'
import Head from 'next/head'

const SwiperContainer = styled.div`
  max-width: 100%;
`

const OtherContentContainer = styled.section`
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 1050px) {
    max-width: 1050px;
  }
`

const ViewMoreCard = styled.div`
  display: flex;
  gap: ${SPACING.SM};
  width: 100%;
  overflow: hidden;
  border-radius: ${SPACING.SM};
  background-color: ${(props) => props.bgColor ?? COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  transition: 0.1s;
  user-select: none;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  height: 182px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
    font-weight: 650;
    font-size: 30px;
    opacity: 0.9;
  }

  @media (min-width: 600px) {
    max-width: 320px;
  }
`

const RelateContentHead = styled.h4`
  font-size: 20px;
  margin: ${SPACING['2X']} 0 ${SPACING.SM};
  color: ${COLORS.PRIMARY};
  font-weight: 600;
  background-color: ${COLORS.GRAY_LIGHT_1};
  width: max-content;
  border-radius: ${SPACING.SM};
  padding: ${SPACING.SM} ${SPACING.MD};
  box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
  user-select: none;
`

const BookShelfPage = () => {
  const router = useRouter()
  const ISBN = router.query.isbn
  const [bookShelf, setBookShelf] = useState()
  const [relatedBook, setRelatedBook] = useState({})

  useEffect(() => {
    if (ISBN) {
      shelfService.getShelfByIsbn(ISBN).then((res) => {
        setBookShelf(res.data[0])
      })
    }
  }, [ISBN])

  useEffect(() => {
    if (bookShelf) {
      bookShelf.types.map((type) => {
        shelfService
          .getShelfByPage({type: type.typeName, page: 1}, 5)
          .then((res) => {
            setRelatedBook({...relatedBook, [type.typeName]: res.data})
          })
      })
    }
  }, [bookShelf])

  if (!ISBN) {
    return <div>Loading...</div>
  }

  if (!bookShelf) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>{bookShelf?.bookName}</title>
      </Head>
      <BackgroundContainer link={Background.src}>
        <BookInfo bookInfo={bookShelf} />
        <OtherContentContainer>
          {Object.keys(relatedBook).map((type) => (
            <React.Fragment key={`bookShelf-${type}`}>
              <RelateContentHead>หนังสือ {type} เพิ่มเติม</RelateContentHead>
              <SwiperContainer>
                <Swiper
                  modules={[A11y]}
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
                  loopFillGroupWithBlank={true}
                  scrollbar={{draggable: true}}
                  className="mySwiper"
                >
                  {relatedBook[type].map((book) => (
                    <SwiperSlide
                      key={`relatedBook-type${type._id}-id${book._id}`}
                    >
                      <BookCard bookInfo={book} />
                    </SwiperSlide>
                  ))}

                  <SwiperSlide>
                    <ViewMoreCard
                      bgColor={
                        TYPES_STYLE[type?.replace(' ', '')?.toLowerCase()]
                          ?.color
                      }
                    >
                      ดูเพิ่มเติม
                    </ViewMoreCard>
                  </SwiperSlide>
                </Swiper>
              </SwiperContainer>
            </React.Fragment>
          ))}
        </OtherContentContainer>
      </BackgroundContainer>
    </>
  )
}

export default BookShelfPage
