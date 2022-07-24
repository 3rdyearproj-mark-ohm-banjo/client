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
  width: 300px;
  height: 400px;
  padding: ${SPACING.MD};
  border-radius: ${SPACING.SM};
  background-color: ${COLORS.GRAY_LIGHT_1};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SPACING.MD};
  box-shadow: 0 1px 5px ${COLORS.GRAY_LIGHT};
`

const ImageWrapper = styled.div`
  width: 120px;
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

const BookName = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 2px;
  border: solid ${COLORS.GRAY_LIGHT};
  border-width: 0 0 1px;
`
const CircleProgress = styled.div`
  width: 220px;
  height: 220px;
  flex-shrink: 0;
`

const BookDateInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const GetBookDate = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${SPACING.MD} 0;
  font-size: 14px;
  line-height: 18px;

  > b {
    font-weight: 600;
  }
`

const BorrowingCardInfo = () => {
  return (
    <CardContainer>
      <CircleProgress>
        <CircularProgressbarWithChildren
          value={70}
          strokeWidth={6}
          styles={buildStyles({
            pathColor: COLORS.PRIMARY,
            backgroundColor: COLORS.GRAY_LIGHT_2,
          })}
          background
        >
          <ImageWrapper></ImageWrapper>
        </CircularProgressbarWithChildren>
      </CircleProgress>
      <ContentWrapper>
        <div>
          <BookName>ติวเข้ม PAT2 พิชิตข้อสอบเต็ม 100% ภายใน 5 วัน</BookName>
          <BookDateInfo>
            <GetBookDate>
              <span>วันที่ 7 ก.ย. 2022</span>
              <b>วันที่ได้รับหนังสือ</b>
            </GetBookDate>
            <br />
            <GetBookDate>
              <span>วันที่ 7 ก.ย. 2022</span>
              <b>วันที่หมดอายุการยืม</b>
            </GetBookDate>
          </BookDateInfo>
        </div>

        <Button btnSize="sm" borderRadius="4px" btnType="orangeGradient">
          คุณอ่านหนังสือเล่มนี้จบแล้ว
        </Button>
      </ContentWrapper>
    </CardContainer>
  )
}

export default BorrowingCardInfo
