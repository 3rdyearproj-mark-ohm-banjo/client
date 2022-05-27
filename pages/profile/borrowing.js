import React from 'react'
import styled from 'styled-components'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import Head from 'next/head'

const EmptyState = styled.div`
  height: 200px;
  line-height: 200px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  background-color: ${COLORS.GRAY_LIGHT};
  border-radius: ${SPACING.MD};
  width: 100%;
`

const BookBorrowingPage = () => {
  return (
    <>
      <Head>
        <title>หนังสือที่คุณยืมอยู่</title>
      </Head>
      <EmptyState>
        ระบบยืมหนังสือผ่านทางระบบยังไม่เปิดให้บริการในขณะนี้
      </EmptyState>
    </>
  )
}

BookBorrowingPage.Layout = ProfileLayout

export default BookBorrowingPage
