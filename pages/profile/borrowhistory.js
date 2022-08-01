import Head from 'next/head'
import React from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import {FONTS} from '../../styles/fonts'
import {SPACING} from '../../styles/spacing'
import {thaiMonths} from '../../utils/format'

const TitleWrapper = styled.div`
  width: 100%;
  margin: ${SPACING.MD};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: start;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`

const Select = styled.select`
  padding: ${SPACING.XS};
  font-family: ${FONTS.SARABUN};
`

const HeadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${SPACING.SM};
  padding: 0 ${SPACING.MD};
  font-size: 14px;
  font-family: ${FONTS.SARABUN};
`

const ContentWrapper = styled.div``

const BorrowHistoryPage = () => {
  const yearsBorrow = ['2022', '2023']
  const [filterMonth, setFilterMonth] = useState('')
  const [filterYear, setFilterYear] = useState('')

  return (
    <>
      <Head>
        <title>ประวัติการยืมของคุณ</title>
      </Head>
      <TitleWrapper>
        <Title>ประวัติการยืมของคุณ</Title>
      </TitleWrapper>
      <HeadWrapper>
        <span>เดือนที่ยืม</span>
        <Select onClick={(e) => setFilterMonth(e.target.value)}>
          <option value="all" defaultValue>
            ทั้งหมด
          </option>
          {thaiMonths['full'].map((month, index) => (
            <option value={month} key={`month-${index}`}>
              {month}
            </option>
          ))}
        </Select>
        <span>ปี</span>
        <Select onClick={(e) => setFilterYear(e.target.value)}>
          <option value="all" defaultValue>
            ทั้งหมด
          </option>
          {yearsBorrow.map((year, index) => (
            <option value={year} key={`year-${index}`}>
              {year}
            </option>
          ))}
        </Select>
      </HeadWrapper>
      <ContentWrapper></ContentWrapper>
    </>
  )
}

BorrowHistoryPage.Layout = ProfileLayout

export default BorrowHistoryPage
