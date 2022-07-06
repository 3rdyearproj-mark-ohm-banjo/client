import React from 'react'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

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
  width: 130px;
  height: 150px;
  background-color: ${COLORS.GRAY_LIGHT};
  border-radius: ${SPACING.MD};
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const BookName = styled.div`
  font-size: 18px;
  font-weight: 600;
`
const CircleProgress = styled.div`
  width: 100px;
  height: 100px;
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

const BorrowingCardInfo = () => {
  return (
    <CardContainer>
      <ImageWrapper></ImageWrapper>

      <ContentWrapper>
        <BookName>ติวเข้ม PAT2 พิชิตข้อสอบเต็ม 100% ภายใน 5 วัน</BookName>
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
