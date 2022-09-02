import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import useBorrowHistory from '../../api/query/useBorrowHistory'
import BookHistoryCard from '../../components/cards/BookHistoryCard'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import {years} from '../../config/years'
import {COLORS} from '../../styles/colors'
import {FONTS} from '../../styles/fonts'
import {SPACING} from '../../styles/spacing'
import {formatDate, thaiMonths} from '../../utils/format'

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

const Table = styled.table`
  width: 100%;
  border: 1px solid ${COLORS.GRAY_LIGHT};
  border-radius: ${SPACING.MD};
  overflow: hidden;
  margin: ${SPACING.LG} 0;
  display: table;
`

const Thead = styled.thead`
  display: none;

  @media (min-width: 800px) {
    display: table-header-group;
  }

  > tr {
    > td {
      max-width: 300px;
      padding: ${SPACING.MD};
      border: 1px solid ${COLORS.GRAY_LIGHT};
      border-width: 0 0 1px;
      background-color: ${COLORS.GRAY_LIGHT_2};
      font-weight: 600;
    }
  }
`

const Tbody = styled.tbody`
  > tr {
    padding: ${SPACING.SM} 0;
    letter-spacing: 0.025em;
    display: flex;
    flex-direction: column;
    border: 1px solid ${COLORS.GRAY_LIGHT};
    border-width: 0 0 1px;

    > td {
      padding: ${SPACING.SM};
      border: none;
      margin: 0 auto;
      display: flex;
      width: 100%;
      justify-content: space-between;

      @media (min-width: 800px) {
        display: table-cell;
        width: initial;
        border: 1px solid ${COLORS.GRAY_LIGHT};
        border-width: 0 0 1px;
      }

      > span:first-child {
        width: 50%;
        display: block;

        @media (min-width: 800px) {
          display: none;
        }
      }

      > span:last-child {
        width: 50%;
      }
    }

    @media (min-width: 800px) {
      display: table-row;
    }

    &:last-of-type {
      border: none;

      > td {
        border: none;
      }
    }
  }
`

const EmptyRow = styled.td`
  padding: ${SPACING['5X']} 0;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`

const ContentWrapper = styled.div``

const BorrowHistoryPage = () => {
  const [filterMonth, setFilterMonth] = useState('')
  const [filterYear, setFilterYear] = useState('')
  const {data} = useBorrowHistory()

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
            <option value={index} key={`month-${index}`}>
              {month}
            </option>
          ))}
        </Select>
        <span>ปี</span>
        <Select onClick={(e) => setFilterYear(e.target.value)}>
          <option value="all" defaultValue>
            ทั้งหมด
          </option>
          {years.map((year, index) => (
            <option value={year} key={`year-${index}`}>
              {year}
            </option>
          ))}
        </Select>
      </HeadWrapper>
      <ContentWrapper>
        <Table>
          <Thead>
            <tr>
              <td>ภาพหน้าปก</td>
              <td>ISBN</td>
              <td>ชื่อหนังสือ</td>
              <td>วันที่ได้รับ</td>
              <td>วันหมดอายุ</td>
            </tr>
          </Thead>

          {data?.data?.data?.filter((item) => {
            const receiveDate = new Date(item.receiveTime)
            return (
              (receiveDate.getMonth() === +filterMonth ||
                isNaN(+filterMonth)) &&
              (receiveDate.getFullYear() === +filterYear ||
                isNaN(+filterYear)) &&
              item
            )
          }).length > 0 ? (
            <Tbody>
              {data?.data?.data
                ?.filter((item) => {
                  const receiveDate = new Date(item.receiveTime)
                  return (
                    (receiveDate.getMonth() === +filterMonth ||
                      isNaN(+filterMonth)) &&
                    (receiveDate.getFullYear() === +filterYear ||
                      isNaN(+filterYear)) &&
                    item
                  )
                })
                ?.map((row, i) => (
                  <tr key={`row${i}`}>
                    <td>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/bookShelf/bsImage/${row.book.bookShelf.imageCover}`}
                        alt={row.bookName}
                        width={80}
                        height={100}
                        objectFit="contain"
                      />
                    </td>
                    <td>
                      <span>ISBN</span>
                      <span>{row.book.bookShelf.ISBN}</span>
                    </td>
                    <td>
                      <span>ชื่อหนังสือ</span>
                      <span>{row.book.bookShelf.bookName}</span>
                    </td>
                    <td>
                      <span>วันที่ได้รับ</span>
                      <span>
                        {formatDate(row.receiveTime, true, true, true)}{' '}
                      </span>
                    </td>
                    <td>
                      <span>วันหมดอายุ</span>
                      <span>
                        {formatDate(row.expireTime, true, true, true)}{' '}
                      </span>
                    </td>
                  </tr>
                ))}
            </Tbody>
          ) : (
            <tbody>
              <tr>
                <EmptyRow colSpan="5">ไม่พบประวัติการยืม</EmptyRow>
              </tr>
            </tbody>
          )}
        </Table>
      </ContentWrapper>
    </>
  )
}

BorrowHistoryPage.Layout = ProfileLayout

export default BorrowHistoryPage
