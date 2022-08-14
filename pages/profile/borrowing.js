import React from 'react'
import styled from 'styled-components'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import Head from 'next/head'
import BorrowingCardInfo from '../../components/cards/BorrowingCardInfo'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Scrollbar} from 'swiper'
import 'swiper/css'
import 'swiper/css/scrollbar'

const EmptyState = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  background-color: ${COLORS.GRAY_LIGHT};
  border-radius: ${SPACING.MD};
`

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 12px 0;
  padding: ${SPACING.MD} ${SPACING.MD} 0;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`

const SubTitle = styled.span`
  font-size: 14px;
  color: ${COLORS.GRAY_DARK_1};
`

const Red = styled.span`
  color: ${COLORS.RED_1};
  font-weight: 600;
`

const SwiperContainer = styled.div`
  padding-bottom: ${SPACING.MD};
  .swiper-wrapper {
    max-width: 0;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
  }

  .swiper-pointer-events {
    padding: ${SPACING.MD};
  }

  .swiper-scrollbar {
    bottom: 0px;
  }
`

const BookContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: ${SPACING['2X']};

  @media (min-width: 768px) {
    grid-template-columns: auto auto;
  }
`

const BookBorrowingPage = () => {
  return (
    <>
      <Head>
        <title>หนังสือที่คุณยืมอยู่</title>
      </Head>
      <TitleWrapper>
        <Title>หนังสือที่คุณกำลังยืมอยู่ (1 / 5 เล่ม) </Title>
        <SubTitle>
          เมื่ออ่านเสร็จแล้ว คุณสามารถกด<Red>ยืนยันว่าอ่านจบแล้วได้</Red>
          เพื่อให้ผู้ที่สนใจหนังสือเล่มนี้เหมือนกันมาขอยืมต่อได้
        </SubTitle>
        <SubTitle>
          <Red>
            ***หากหมดเวลาการยืมและคุณยังไม่ได้กดยืนยันว่าอ่านจบแล้ว
            ระบบจะทำการกดปุ่มให้อัตโนมัติ
          </Red>
        </SubTitle>
      </TitleWrapper>

      <BookContainer>
        <BorrowingCardInfo />
        <BorrowingCardInfo />
        <BorrowingCardInfo />
        <BorrowingCardInfo />
        <BorrowingCardInfo />
      </BookContainer>

      {/* <SwiperContainer>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            700: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[Scrollbar]}
          scrollbar
          className="mySwiper"
        >
          <SwiperSlide>
            <BorrowingCardInfo />
          </SwiperSlide>
          <SwiperSlide>
            <BorrowingCardInfo />
          </SwiperSlide>
          <SwiperSlide>
            <BorrowingCardInfo />
          </SwiperSlide>
          <SwiperSlide>
            <BorrowingCardInfo />
          </SwiperSlide>
          <SwiperSlide>
            <BorrowingCardInfo />
          </SwiperSlide>
        </Swiper>
      </SwiperContainer> */}
    </>
  )
}

BookBorrowingPage.Layout = ProfileLayout

export default BookBorrowingPage
