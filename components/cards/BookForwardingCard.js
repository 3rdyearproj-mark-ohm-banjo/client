import React from 'react'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import Button from '../Button'
import Divider from '../Divider'

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
  width: 140px;
  height: 170px;
  border-radius: ${SPACING.SM};
  background-color: ${COLORS.GRAY_DARK};
  flex-shrink: 0;
  margin: 0 auto;
`

const BookHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  color: ${COLORS.GREEN_1};
`

const BookForwardingCard = () => {
  return (
    <CardLayout>
      <BookContainer>
        <ImageWrapper></ImageWrapper>
        <BookInfoWrapper>
          <BookHeader>
            <BookName>
              ขอให้โชคดีมีชัยในโลกแฟนตาซี! โอ๊ย ยัยเทพธิดาไม่ได้เรื่อง เล่ม 1
            </BookName>
            <Status>จัดส่งแล้ว</Status>
          </BookHeader>
          <Divider
            lineColor={COLORS.GRAY_LIGHT}
            lineMargin={`${SPACING.SM} 0`}
          />
          <ISBN>ISBN 123-123-123-123</ISBN>
          <BorrowDate>ได้รับวันที่ 12 ส.ค. 2022</BorrowDate> <br />
          <BorrowDate>อ่านจบเมื่อวันที่ 12 ส.ค. 2022</BorrowDate>
        </BookInfoWrapper>
      </BookContainer>
      <Divider lineColor={COLORS.GRAY_LIGHT} lineMargin={`${SPACING.SM} 0`} />
      <AddressContainer>
        <AddressWrapper>
          <AddressHead>ข้อมูลที่เกี่ยวข้องในการนำหนังสือไปส่งต่อ</AddressHead>
          <Receiver>
            <span>ชื่อผู้รับ Thanasit Eksolagul</span>
            <span>โทร 012-345-6789</span>
          </Receiver>
          <p>
            ที่อยู่ 126 Pracha Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140
          </p>
        </AddressWrapper>
        <ButtonWrapper>
          <SendDate>ส่งวันที่ 12 ส.ค. 2022</SendDate>
          <Button btnSize="sm">คุณได้ส่งหนังสือแล้ว</Button>
        </ButtonWrapper>
      </AddressContainer>
    </CardLayout>
  )
}

export default BookForwardingCard
