import React from 'react'
import styled from 'styled-components'
import {COLORS} from '../styles/colors'
import {SPACING} from '../styles/spacing'
import Button from './Button'
import Divider from './Divider'

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
  align-items: center;
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
  margin: auto 0 0;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const Status = styled.span`
  flex-shrink: 0;
  color: ${COLORS.GREEN_3};
`

const BookRequestCard = ({BookInfo}) => {
  return (
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
          <Status>จัดส่งแล้ว</Status>
        </BookHeader>

        <Divider lineColor={COLORS.GRAY_LIGHT} lineMargin={`${SPACING.SM} 0`} />

        <BorrowDate>วันที่ขอยืม : 15/12/2022 เวลา 13:20 น.</BorrowDate>
        <LimitReceive>จะได้รับภายในวันที่ 20/12/2022</LimitReceive>

        <ButtonWrapper>
          {/* <Button btnSize="sm" btnType="whiteBorder">
            ยกเลิกรายการ
          </Button> */}

          <Button btnSize="sm">ยืนยันการรับหนังสือ</Button>
          <Button btnSize="sm" btnType="orangeGradient">
            ติดต่อผู้ดูแลระบบ
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    </CardContainer>
  )
}

export default BookRequestCard
