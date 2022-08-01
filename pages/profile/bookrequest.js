import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import BookRequestCard from '../../components/cards/BookRequestCard'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'

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

const AlertText = styled.span`
  font-size: 14px;
  color: ${COLORS.RED_1};
`

const BookWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.LG};
  padding: ${SPACING.MD};
`

const BookRequest = () => {
  return (
    <>
      <Head>
        <title>หนังสือที่จะได้รับ</title>
      </Head>
      <TitleWrapper>
        <Title>หนังสือที่คุณได้ส่งคำขอเพื่อขอยืม</Title>
        <SubTitle>
          เมื่อคุณได้รับหนังสือแล้ว อย่าลืมมากด **ยืนยันการรับหนังสือ**
        </SubTitle>
        <AlertText>
          **หากไม่ได้รับหนังสือในเวลาที่กำหนดหรือหนังสือไม่สามารถใช้งานได้
          ผู้ใช้สามารถติดต่อผู้ดูแลระบบเพื่อขอหนังสือใหม่ได้
        </AlertText>
      </TitleWrapper>
      <BookWrapper>
        <BookRequestCard />
        <BookRequestCard />
      </BookWrapper>
      <TitleWrapper>
        <Title>หนังสือที่คุณได้เข้าคิวเพื่อขอยืม</Title>
      </TitleWrapper>
      <BookWrapper>
        <BookRequestCard cardType="queue" />
        <BookRequestCard cardType="queue" />
      </BookWrapper>
    </>
  )
}

BookRequest.Layout = ProfileLayout

export default BookRequest