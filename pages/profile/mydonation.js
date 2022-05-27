import Head from 'next/head'
import Image from 'next/image'
import React, {useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from '../../components'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import {formatDate} from '../../utils/format'
import styled from 'styled-components'
import {SPACING} from '../../styles/spacing'
import ConfirmModal from '../../components/ConfirmModal'
import {fetchCurrentUser} from '../../redux/feature/UserSlice'
import {ICONS} from '../../config/icon'
import {COLORS} from '../../styles/colors'
import BookOwnerCard from '../../components/BookOwnerCard'
import userService from '../../api/request/userService'
import Pagination from '../../components/Pagination'
import {useRouter} from 'next/router'
import toast, {Toaster} from 'react-hot-toast'

const Table = styled.table`
  width: 100%;
  border: 1px solid ${COLORS.GRAY_LIGHT};
  border-radius: ${SPACING.MD};
  overflow: hidden;
  margin: ${SPACING.LG} 0;
  display: none;

  @media (min-width: 768px) {
    display: table;
  }
`

const Thead = styled.thead`
  > tr > td {
    padding: ${SPACING.MD};
    border: 1px solid ${COLORS.GRAY_LIGHT};
    border-width: 0 0 1px 0;
    background-color: ${COLORS.GRAY_LIGHT_2};
    font-weight: 600;
  }
`

const Tbody = styled.tbody`
  > tr {
    > td {
      padding: ${SPACING.SM} 0;
      border: 1px solid ${COLORS.GRAY_LIGHT};
      border-width: 0 0 1px 0;
    }

    &:last-of-type > td {
      border: none;
    }
  }
`

const MobileDonationWrapper = styled.div`
  margin: 50px 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${SPACING.LG};
  @media (min-width: 768px) {
    display: none;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: ${SPACING.MD};
  justify-content: start;
  width: 100%;
`

const DonationCount = styled.span`
  font-size: 14px;
  color: ${COLORS.GRAY_DARK};
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`

const PaginationWrapper = styled.div`
  border-radius: 28px;
  margin: ${SPACING.MD} auto;
  padding: ${SPACING.MD};
  width: 100%;
  display: flex;
  justify-content: center;
`

const MyDonationPage = ({currentPage}) => {
  const pageSize = 5
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})
  const router = useRouter()
  const dispatch = useDispatch()
  const donationHistory = useSelector(
    (state) => state.user?.user?.donationHistory
  )
  const userId = useSelector((state) => state.user?.user?._id)
  let donationFormat = useMemo(
    () =>
      donationHistory?.map((history) => {
        return {
          _id: history?._id,
          bookId: history?.book?._id,
          ISBN: history?.book?.bookShelf?.ISBN,
          bookName: history?.book?.bookShelf?.bookName,
          imageCover: history?.book?.bookShelf?.imageCover,
          currentHolder: history?.book?.currentHolder,
          bookHistorys: history?.book?.bookHistorys,
          donationTime: history?.donationTime,
        }
      }),
    [donationHistory]
  )

  const handleDeleteSubmit = () => {
    userService.cancelDonation(deleteItem?.bookId).then(() => {
      toast.success('ยกเลิกการบริจาคสำเร็จ')
      dispatch(fetchCurrentUser())
      setShowCancelModal(false)
      setDeleteItem({})
    })
  }

  const handleShowModal = () => {
    setShowCancelModal(false)
    setDeleteItem({})
  }

  const onPageChange = (page) => {
    router.push({pathname: '/profile/mydonation', query: {page}})
  }

  return (
    <>
      <Head>
        <title>ประวัติการบริจาคของคุณ</title>
      </Head>
      <Toaster />
      <ConfirmModal
        onSubmit={handleDeleteSubmit}
        onClose={handleShowModal}
        onShow={showCancelModal}
        header={`คุณต้องการยกเลิกการบริจาค ${deleteItem.bookName} จริงๆ หรอ?`}
        icon={ICONS.faFaceSadTear}
        iconBg={COLORS.RED_1}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            width: '70%',
          }}
        >
          <Button
            btnSize="sm"
            bgColor={COLORS.RED_1}
            onClick={handleShowModal}
            fullWidth
            borderRadius="4px"
          >
            ยกเลิก
          </Button>
          <Button
            btnSize="sm"
            onClick={handleDeleteSubmit}
            fullWidth
            borderRadius="4px"
          >
            ยืนยัน
          </Button>
        </div>
      </ConfirmModal>

      <TitleWrapper>
        <Title>หนังสือที่คุณบริจาคทั้งหมด</Title>
        <DonationCount>
          บริจาคแล้วทั้งหมด {donationHistory?.length} เล่ม
        </DonationCount>
      </TitleWrapper>

      <Table>
        <Thead>
          <tr>
            <td>ภาพหน้าปก</td>
            <td>ISBN</td>
            <td>ชื่อหนังสือ</td>
            <td>วันที่บริจาค</td>
            <td></td>
          </tr>
        </Thead>

        <Tbody>
          {donationFormat
            ?.slice(
              (currentPage - 1) * pageSize,
              (currentPage - 1) * pageSize + pageSize
            )
            ?.map((row, i) => (
              <tr key={`row${i}`}>
                <td>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/bookShelf/bsImage/${row.imageCover}`}
                    alt={row.bookName}
                    width={120}
                    height={150}
                    objectFit="contain"
                  />
                </td>
                <td>{row.ISBN}</td>
                <td>{row.bookName}</td>
                <td>{formatDate(row.donationTime, true, true, true)}</td>
                <td>
                  {row.bookHistorys.length < 2 &&
                  row.currentHolder === userId ? (
                    <Button
                      btnSize="sm"
                      btnType="orangeGradient"
                      onClick={() => {
                        setShowCancelModal(true)
                        setDeleteItem({
                          bookId: row.bookId,
                          bookName: row?.bookName,
                        })
                      }}
                    >
                      ยกเลิกการบริจาค
                    </Button>
                  ) : (
                    <Button isDisabled>หนังสือถูกส่งต่อแล้ว</Button>
                  )}
                </td>
              </tr>
            ))}
        </Tbody>
      </Table>

      <MobileDonationWrapper>
        {donationFormat
          ?.slice(
            (currentPage - 1) * pageSize,
            (currentPage - 1) * pageSize + pageSize
          )
          ?.map((item) => (
            <BookOwnerCard
              key={item._id}
              bookId={item.bookId}
              bookInfo={item}
              donationTime={formatDate(item.donationTime, true, true, true)}
              canCancel={
                item.bookHistorys.length < 2 && item.currentHolder === userId
              }
              onCancel={() => {
                setShowCancelModal(true)
                setDeleteItem({
                  bookId: item.bookId,
                  bookName: item?.bookName,
                })
              }}
              cardType="secondary"
            />
          ))}
      </MobileDonationWrapper>

      {Math.ceil(donationHistory?.length / pageSize) > 1 && (
        <PaginationWrapper>
          <Pagination
            totalPage={Math.ceil(donationHistory.length / pageSize)}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </PaginationWrapper>
      )}
    </>
  )
}

MyDonationPage.Layout = ProfileLayout

export default MyDonationPage

export const getServerSideProps = (context) => {
  return {
    props: {
      currentPage: context.query.page ? +context.query.page : 1,
    },
  }
}
