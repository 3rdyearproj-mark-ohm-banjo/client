import React from 'react'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Button from '../Button'

const CardContainer = styled.div`
  padding: ${SPACING.MD};
  border-radius: ${SPACING.SM};
  background-color: ${COLORS.GRAY_LIGHT_1};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SPACING.MD};
  box-shadow: 0 1px 5px ${COLORS.GRAY_LIGHT};

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const ImageWrapper = styled.div`
  width: 110px;
  height: 150px;
  background-color: ${COLORS.GRAY_LIGHT};
  border-radius: ${SPACING.MD};
  flex-shrink: 0;
`

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.SM};
`

const ButtonWrapper = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    margin-top: auto;
  }
`

const BookName = styled.div`
  font-size: 18px;
  font-weight: 600;
`
const CircleProgress = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
`

const TimeLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2em;

  > span {
    font-size: 18px;
    font-weight: 600;
  }

  > span:first-child,
  > span:last-child {
    font-size: 14px;
    font-weight: 600;
    color: ${COLORS.PRIMARY};
  }
`

const GetBookDate = styled.span`
  font-size: 14px;
  line-height: 18px;
`

const BorrowingCardInfo = () => {
  return (
    <CardContainer>
      <ImageWrapper></ImageWrapper>

      <ContentWrapper>
        <div>
          <BookName>ติวเข้ม PAT2 พิชิตข้อสอบเต็ม 100% ภายใน 5 วัน</BookName>
          <GetBookDate>
            <b>วันที่ได้รับหนังสือ</b> วันที่ 7 ก.ย. 2022
          </GetBookDate>
          <br />
          <GetBookDate>
            <b>วันที่หมดอายุการยืม</b> วันที่ 7 ก.ย. 2022
          </GetBookDate>
        </div>
        <ButtonWrapper>
          <Button
            btnSize="sm"
            borderRadius="4px"
            btnType="orangeGradient"
            fullWidth
          >
            คุณอ่านหนังสือเล่มนี้จบแล้ว
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
      <CircleProgress>
        <CircularProgressbarWithChildren
          value={70}
          styles={buildStyles({
            pathColor: COLORS.PRIMARY,
          })}
        >
          <TimeLeft>
            <span>เหลือ</span>
            <span>5</span>
            <span>วัน</span>
          </TimeLeft>
        </CircularProgressbarWithChildren>
      </CircleProgress>
    </CardContainer>
  )
}

export default BorrowingCardInfo
