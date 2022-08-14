import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import Button from '../Button'
import Divider from '../Divider'
import {useState} from 'react'
import ConfirmModal from '../ConfirmModal'
import {ICONS} from '../../config/icon'
import userService from '../../api/request/userService'

const CardContainer = styled.div`
  padding: ${SPACING.MD};
  border-radius: ${SPACING.SM};
  background-color: ${COLORS.GRAY_LIGHT_1};
  display: flex;
  flex-direction: column;
  gap: ${SPACING.MD};
  box-shadow: 0 1px 5px ${COLORS.GRAY_LIGHT};

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SPACING.SM};
  flex-shrink: 0;
`

const ImageContainer = styled.div`
  width: 140px;
  height: 170px;
  background-color: ${COLORS.GRAY_DARK};
  border-radius: ${SPACING.SM};
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ISBN = styled.span`
  text-align: center;
  font-weight: 600;
`

const BookHeader = styled.div`
  display: flex;
  justify-content: space-between;
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

const LimitReceive = styled.span`
  font-size: 14px;
  color: ${COLORS.GRAY_DARK_3};
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: ${SPACING.MD};
  margin: ${SPACING.LG} 0 0;

  @media (min-width: 1024px) {
    flex-direction: row;
    margin: auto 0 0;
  }
`

const Status = styled.span`
  flex-shrink: 0;
  font-weight: 600;
  color: ${COLORS.GREEN_3};

  ${(props) => props.type === 'waiting' && `color: ${COLORS.BLUE_LIGHT_3}`}
`

const BookRequestCard = ({bookInfo, cardType}) => {
  const defaultConfirmModal = {
    show: false,
    type: '',
  }

  const [confirmModal, setConfirmModal] = useState(defaultConfirmModal)

  const handleSubmit = () => {
    switch (cardType) {
      case 'receive':
        // userService
        //   .confirmReceive(bookInfo._id)
        //   .then(() => toast.success('ยืนยันการรับหนังสือสำเร็จแล้ว'))
        //   .catch((err) => toast.error(err))

        setConfirmModal(defaultConfirmModal)

      case 'queue':
        setConfirmModal(defaultConfirmModal)
      default:
        setConfirmModal(defaultConfirmModal)
    }
  }

  return (
    <>
      <ConfirmModal
        onClose={setConfirmModal}
        onShow={confirmModal?.show}
        header={
          confirmModal?.type === 'queue'
            ? `ยืนยันการออกจากคิว?`
            : 'ยืนยันการได้รับหนังสือ'
        }
        icon={ICONS.faBook}
        iconBg={COLORS.GREEN_1}
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
            onClick={setConfirmModal}
            fullWidth
            borderRadius="4px"
          >
            ยกเลิก
          </Button>
          <Button
            btnSize="sm"
            onClick={handleSubmit}
            fullWidth
            borderRadius="4px"
          >
            ยืนยัน
          </Button>
        </div>
      </ConfirmModal>
      <CardContainer>
        <ImageWrapper>
          <ImageContainer></ImageContainer>
          <ISBN>ISBN 132-13-21231-32</ISBN>
        </ImageWrapper>
        <ContentWrapper>
          <BookHeader>
            <BookName>
              ขอให้โชคดีมีชัยในโลกแฟนตาซี! โอ๊ย ยัยเทพธิดาไม่ได้เรื่อง เล่ม 1
            </BookName>
            {cardType === 'queue' ? (
              <Status type="waiting">อยู่ในคิว</Status>
            ) : (
              <Status>จัดส่งแล้ว</Status>
            )}
          </BookHeader>

          <Divider
            lineColor={COLORS.GRAY_LIGHT}
            lineMargin={`${SPACING.SM} 0`}
          />

          {cardType === 'queue' ? (
            <>
              <BorrowDate>วันที่เข้าคิว : 15/12/2022 เวลา 13:20 น.</BorrowDate>
              <LimitReceive>คุณอยู่ในคิวที่ XXX</LimitReceive>
            </>
          ) : (
            <>
              <BorrowDate>วันที่ขอยืม : 15/12/2022 เวลา 13:20 น.</BorrowDate>
              <LimitReceive>จะได้รับภายในวันที่ 20/12/2022</LimitReceive>
            </>
          )}

          <ButtonWrapper>
            {/* <Button btnSize="sm" btnType="whiteBorder">
            ยกเลิกรายการ
          </Button> */}

            {cardType === 'queue' ? (
              <>
                <Button
                  btnSize="sm"
                  btnType="orangeGradient"
                  onClick={() =>
                    setConfirmModal({
                      type: 'queue',
                      show: true,
                    })
                  }
                >
                  ออกจากคิว
                </Button>
              </>
            ) : (
              <>
                <Button
                  btnSize="sm"
                  onClick={() =>
                    setConfirmModal({
                      type: 'receive',
                      show: true,
                    })
                  }
                >
                  ยืนยันการรับหนังสือ
                </Button>
                <Button btnSize="sm" btnType="orangeGradient">
                  ติดต่อผู้ดูแลระบบ
                </Button>
              </>
            )}
          </ButtonWrapper>
        </ContentWrapper>
      </CardContainer>
    </>
  )
}

BookRequestCard.propTypes = {
  bookInfo: PropTypes.object,
  cardType: PropTypes.oneOf(['receive', 'queue']),
}

BookRequestCard.defaultProps = {
  cardType: 'receive',
}

export default BookRequestCard
