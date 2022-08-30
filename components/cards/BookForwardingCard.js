import React from 'react'
import styled from 'styled-components'
import userService from '../../api/request/userService'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import Button from '../Button'
import Divider from '../Divider'
import toast from 'react-hot-toast'
import Image from 'next/image'
import {formatDate} from '../../utils/format'
import {useSelector} from 'react-redux'
import useMyForwardRequest from '../../api/query/useMyForwardRequest'

const CardLayout = styled.div`
  padding: ${SPACING.MD};
  border-radius: ${SPACING.SM};
  background-color: ${COLORS.GRAY_LIGHT_1};
  display: flex;
  flex-direction: column;
  gap: ${SPACING.SM};
  box-shadow: 0 1px 5px ${COLORS.GRAY_LIGHT};
`

const ImageWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 170px;
  border-radius: ${SPACING.SM};
  background-color: ${COLORS.GRAY_LIGHT};
  flex-shrink: 0;
  margin: 0 auto;
`

const BookHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const BookName = styled.span`
  flex-basis: 75%;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
`

const BorrowDate = styled.span`
  margin-top: ${SPACING.SM};
`
const ISBN = styled.div`
  font-weight: 600;
`

const Status = styled.span`
  flex-shrink: 0;
  font-weight: 600;
  color: ${COLORS.GREEN_3};

  ${(props) => props.type === 'waiting' && `color: ${COLORS.BLUE_LIGHT_3}`}
`

const BookInfoWrapper = styled.div`
  width: 100%;
`

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.MD};

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const AddressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const AddressWrapper = styled.div`
  @media (min-width: 768px) {
    flex: 0 0 75%;
  }
`

const ButtonWrapper = styled.div`
  width: 100%;
  flex: 0 0 25%;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.SM};

  @media (min-width: 768px) {
    justify-content: space-between;
    align-items: center;
    align-items: flex-end;
  }
`

const AddressHead = styled.div`
  font-weight: 600;
`

const Receiver = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.MD};
`

const SendDate = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.GREEN_1};
`

const BookForwardingCard = ({bookInfo}) => {
  const {refetch: getMyForward} = useMyForwardRequest(false)
  const donationHistory = useSelector(
    (state) => state?.user?.user?.donationHistory
  )

  const donationInfo = donationHistory?.find((history) => {
    if (history.book._id === bookInfo?.book?._id) {
      return history
    }
  })

  const statusDictionary = {
    inProcess: 'กำลังดำเนินการ',
    sending: 'จัดส่งแล้ว',
  }

  const submitForwarding = () => {
    toast.promise(userService.confirmForwarding(bookInfo.book._id), {
      loading: 'กำลังดำเนินการ...',
      success: () => {
        getMyForward()
        return 'ยืนยันการส่งหนังสือสำเร็จ'
      },
      error: () => {
        getMyForward()
        return 'เกิดข้อผิดพลาด'
      },
    })
  }

  const statusCase = () => {
    let status = bookInfo.status
    if (bookInfo.sendingTime) {
      status = 'sending'
    }

    return statusDictionary[status]
  }

  return (
    <CardLayout>
      <BookContainer>
        <ImageWrapper>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/bookShelf/bsImage/${bookInfo?.book?.bookShelf?.imageCover}`}
            layout="fill"
            objectFit="contain"
            alt={bookInfo?.book?.bookShelf?.bookName}
          ></Image>
        </ImageWrapper>
        <BookInfoWrapper>
          <BookHeader>
            <BookName>{bookInfo?.book?.bookShelf?.bookName}</BookName>
            <Status>{statusCase()}</Status>
          </BookHeader>
          <Divider
            lineColor={COLORS.GRAY_LIGHT}
            lineMargin={`${SPACING.SM} 0`}
          />
          <ISBN>ISBN {bookInfo?.book?.bookShelf?.ISBN}</ISBN>
          <BorrowDate>
            {donationInfo
              ? `บริจาคเมื่อวันที่ ${formatDate(
                  donationInfo.donationTime,
                  true,
                  true,
                  true
                )}`
              : `อ่านจบเมื่อวันที่ XX/XX/XXXX`}
          </BorrowDate>
        </BookInfoWrapper>
      </BookContainer>
      <Divider lineColor={COLORS.GRAY_LIGHT} lineMargin={`${SPACING.SM} 0`} />
      <AddressContainer>
        <AddressWrapper>
          <AddressHead>ข้อมูลที่เกี่ยวข้องในการนำหนังสือไปส่งต่อ</AddressHead>
          <Receiver>
            <span>
              ชื่อผู้รับ {bookInfo?.receiverInfo?.firstname}{' '}
              {bookInfo?.receiverInfo?.lastname}
            </span>
            <span>โทร {bookInfo?.receiverInfo?.tel}</span>
          </Receiver>
          <p>ที่อยู่ {bookInfo?.receiverInfo?.address}</p>
        </AddressWrapper>
        <ButtonWrapper>
          {bookInfo.sendingTime && (
            <SendDate>
              ส่งวันที่ {formatDate(bookInfo.sendingTime, true, true, true)}
            </SendDate>
          )}

          {!bookInfo.sendingTime ? (
            <Button btnSize="sm" onClick={submitForwarding}>
              ยืนยันการส่งหนังสือ
            </Button>
          ) : (
            <Button btnSize="sm" btnType="orangeGradient" isDisabled={true}>
              คุณส่งหนังสือเล่มนี้แล้ว
            </Button>
          )}
        </ButtonWrapper>
      </AddressContainer>
    </CardLayout>
  )
}

export default BookForwardingCard
