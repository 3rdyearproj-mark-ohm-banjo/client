import React from 'react'
import {BackgroundContainer, BookInfo} from '../../components'
import {BOOK_SHELF} from '../../config/bookshelf-mockup'
import {useRouter} from 'next/router'
import shelfService from '../../api/shelfService'
import styled from 'styled-components'
import {A11y} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import BookCard from '../../components/BookCard'
import Background from '../../public/static/images/background-default.png'
import {TYPES} from '../../config/types-mockup'
import {SPACING} from '../../styles/spacing'
import {COLORS} from '../../styles/colors'
import {TYPES_STYLE} from '../../config/types-styles'
import 'swiper/css'

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
  background-color: ${(props) => props.bgColor ?? COLORS.WHITE};
  color: ${COLORS.WHITE};
  transition: 0.1s;
  user-select: none;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  height: 192px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
    font-weight: 650;
    font-size: 30px;
    opacity: 0.9;
  }

  @media (min-width: 680px) {
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
  const shelfId = router.query.shelfId
  if (!shelfId) {
    return <div>Loading...</div>
  }

  //const data = shelfService.getShelfById(shelfId)
  // if (!data) {
  //   return <div>Loading...</div>
  // }
  return (
    <BackgroundContainer link={Background.src}>
      <BookInfo bookInfo={BOOK_SHELF} />
      <OtherContentContainer>
        {BOOK_SHELF.types.map((type) => (
          <>
            <RelateContentHead>
              หนังสือ {TYPES.find((tp) => tp.id === type)?.name} เพิ่มเติม
            </RelateContentHead>
            <SwiperContainer>
              <Swiper
                modules={[A11y]}
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                  800: {
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
                <SwiperSlide>
                  <BookCard bookInfo={BOOK_SHELF} />
                </SwiperSlide>
                <SwiperSlide>
                  <BookCard bookInfo={BOOK_SHELF} />
                </SwiperSlide>
                <SwiperSlide>
                  <BookCard bookInfo={BOOK_SHELF} />
                </SwiperSlide>
                <SwiperSlide>
                  <BookCard bookInfo={BOOK_SHELF} />
                </SwiperSlide>
                <SwiperSlide>
                  <BookCard bookInfo={BOOK_SHELF} />
                </SwiperSlide>

                <SwiperSlide>
                  <ViewMoreCard
                    bgColor={
                      TYPES_STYLE[
                        TYPES.find((typeName) => typeName.id === type)?.name
                      ]?.color
                    }
                  >
                    ดูเพิ่มเติม
                  </ViewMoreCard>
                </SwiperSlide>
              </Swiper>
            </SwiperContainer>
          </>
        ))}
      </OtherContentContainer>
    </BackgroundContainer>
  )
}

export default BookShelfPage
