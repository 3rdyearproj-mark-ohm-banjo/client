import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'

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
const BorrowHistoryPage = () => {
  return (
    <>
      <Head>
        <title>ประวัติการยืมของคุณ</title>
      </Head>
      <EmptyState>ระบบนี้ยังไม่เปิดให้บริการในขณะนี้</EmptyState>
    </>
  )
}

BorrowHistoryPage.Layout = ProfileLayout

export default BorrowHistoryPage
