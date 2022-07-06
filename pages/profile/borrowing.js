import React from 'react'
import styled from 'styled-components'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import Head from 'next/head'
import BorrowingCardInfo from '../../components/cards/BorrowingCardInfo'

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

const BookWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.LG};
  padding: ${SPACING.MD};
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
          เมื่ออ่านเสร็จแล้ว คุณสามารถกด อ่านจบแล้วได้
          เพื่อให้ผู้ที่สนใจหนังสือเล่มนี้เหมือนกันมาขอยืมต่อได้
        </SubTitle>
        <SubTitle>**คุณสามารถยืมหนังสือได้พร้อมกันสูงสุด 5 เล่ม</SubTitle>
      </TitleWrapper>
      <BookWrapper>
        <BorrowingCardInfo />
      </BookWrapper>
    </>
  )
}

BookBorrowingPage.Layout = ProfileLayout

export default BookBorrowingPage
