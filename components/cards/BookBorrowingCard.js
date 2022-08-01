import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {useRouter} from 'next/router'

const CardLayout = styled.div`
  max-width: 300px;
  width: 100%;
  height: 120px;
  display: flex;
  gap: ${SPACING.SM};
  align-items: center;
  padding: ${SPACING.MD};
  border-radius: ${SPACING.SM};
  box-shadow: 0 5px 10px ${COLORS.GRAY_LIGHT};
  user-select: none;

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 10px ${COLORS.GRAY_DARK};
    transition: 0.1s;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const CircleProgress = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
`
const BookName = styled.p`
  font-weight: 600;
  color: ${COLORS.PRIMARY};
`

const BorrowDate = styled.span`
  font-size: 14px;
  color: ${COLORS.GRAY_DARK};
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

const BookBorrowingCard = ({bookInfo}) => {
  const router = useRouter()
  return (
    <CardLayout onClick={() => router.push(`/profile/borrowing`)}>
      <ContentWrapper>
        <BookName>ติวเข้ม PAT2 พิชิตข้อสอบเต็ม 100% ภายใน 5 วัน</BookName>
        <BorrowDate>ได้รับวันที่ 12 ส.ค. 2022</BorrowDate>
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
    </CardLayout>
  )
}

export default BookBorrowingCard