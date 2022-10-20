import React, {useEffect, useState} from 'react'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import styled from 'styled-components'
import Head from 'next/head'
import {SPACING} from '../../styles/spacing'
import useMyNotification from '../../api/query/useMyNotification'
import {formatDate, thaiMonths} from '../../utils/format'
import {COLORS} from '../../styles/colors'
import {FONTS} from '../../styles/fonts'
import {years} from '../../config/years'
import Pagination from '../../components/Pagination'
import useSeenNotification from '../../api/query/useSeenNotification'
import {useSelector} from 'react-redux'

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

      &:last-of-type {
        text-align: center;
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

const PaginationWrapper = styled.div`
  border-radius: 28px;
  margin: 0 auto;
  padding: ${SPACING.MD};
  display: flex;
  justify-content: center;
`

const EmptyRow = styled.td`
  padding: ${SPACING['5X']} 0;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`

const NotificationPage = () => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const {data: myNotification} = useMyNotification(isAuth)
  const [filterMonth, setFilterMonth] = useState('all')
  const [filterYear, setFilterYear] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const {mutate: seenNotification} = useSeenNotification()
  const pageSize = 10

  const filterLogic = (item) => {
    const receiveDate = new Date(item.timestamp)
    return (
      (receiveDate.getMonth() === +filterMonth || isNaN(+filterMonth)) &&
      (receiveDate.getFullYear() === +filterYear || isNaN(+filterYear)) &&
      item
    )
  }

  const filterList = () => {
    return myNotification?.data?.data?.notificationList?.filter((item) => {
      return filterLogic(item)
    })
  }

  const mapNotificationType = (type, bookName) => {
    switch (type) {
      case 'addQueue':
        return `ผู้ใช้ส่งคำขอยืมหนังสือ ${bookName} มาถึงคุณ`
      case 'cancelBorrow':
        return `ผู้ใช้ต้องการยกเลิกส่งคำขอยืมหนังสือ ${bookName}`
      case 'confirmSendingSuccess':
        return `ผู้ส่งได้ส่งหนังสือ ${bookName} แล้ว`
      case 'acceptCancelBorrow':
        return `ผู้ส่งได้ยอมรับการยกเลิกยืมหนังสือ ${bookName} แล้ว`
      case 'confirmReceiveBook':
        return `ผู้ใช้รับหนังสือ ${bookName} จากคุณแล้ว`
      case 'checkMailFromAdmin':
        return `คุณถูกรายงานว่าไม่ส่งหนังสือ ${bookName} และผู้ดูแลระบบไม่สามารถติดต่อคุณได้ โปรดติดต่อผู้ดูแลระบบที่ ${process.env.NEXT_PUBLIC_SUPPORT_MAIL}`
      default:
        return
    }
  }

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (myNotification) {
      let unseenList = myNotification?.data?.data?.notificationList
        ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        .filter((item) => !item.seen)

      if (unseenList.length > 0) {
        seenNotification(unseenList)
      }
    }
  }, [myNotification, currentPage, seenNotification])

  return (
    <>
      <Head>
        <title>Share my Book - การแจ้งเตือนทั้งหมด</title>
      </Head>
      <TitleWrapper>
        <Title>การแจ้งเตือนทั้งหมด</Title>
      </TitleWrapper>
      <HeadWrapper>
        <span>เดือน</span>
        <Select
          onChange={(e) => {
            setCurrentPage(1)
            setFilterMonth(e.target.value)
          }}
        >
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
        <Select
          onChange={(e) => {
            setCurrentPage(1)
            setFilterYear(e.target.value)
          }}
        >
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
      <Table>
        <Thead>
          <tr>
            <td>จาก</td>
            <td>รายละเอียด</td>
            <td>วันที่ได้รับ</td>
            <td>วันที่อ่าน</td>
          </tr>
        </Thead>
        {filterList() &&
        filterList().slice((currentPage - 1) * pageSize, currentPage * pageSize)
          .length > 0 ? (
          <Tbody>
            {filterList()
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              ?.map((item) => (
                <tr key={item?._id}>
                  <td>{item?.senderEmail}</td>
                  <td>{mapNotificationType(item?.type, item?.bookName)}</td>
                  <td>{formatDate(item?.timestamp, true, true, true)}</td>

                  <td>
                    {item?.seen ? (
                      <>{formatDate(item?.seenTime, true, true, true)}</>
                    ) : (
                      <>-</>
                    )}
                  </td>
                </tr>
              ))}
          </Tbody>
        ) : (
          <tbody>
            <tr>
              <EmptyRow colSpan="5">ไม่พบข้อมูล</EmptyRow>
            </tr>
          </tbody>
        )}
      </Table>

      {filterList() && Math.ceil(filterList().length / pageSize) > 1 && (
        <PaginationWrapper>
          <Pagination
            totalPage={Math.ceil(filterList().length / pageSize)}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </PaginationWrapper>
      )}
    </>
  )
}

NotificationPage.Layout = ProfileLayout

export default NotificationPage
