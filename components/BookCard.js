import {useRouter} from 'next/router'
import React from 'react'
import styled, {css} from 'styled-components'
import {LOCAL_BASE_URL} from '../config/env'
import {TYPES_STYLE} from '../config/types-styles'
import {COLORS} from '../styles/colors'
import {FONTS} from '../styles/fonts'
import {SPACING} from '../styles/spacing'
import Button from './Button'

const Card = styled.div`
  display: flex;
  padding: ${SPACING.LG};
  gap: ${SPACING.SM};
  width: 100%;
  overflow: hidden;
  border-radius: ${SPACING.SM};
  background-color: ${COLORS.WHITE};
  transition: 0.3s;
  user-select: none;

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
  }

  @media (min-width: 680px) {
    max-width: 330px;
  }
`

const BookImage = styled.img`
  width: 110px;
  height: 150px;
  object-fit: cover;
  border-radius: ${SPACING.MD};
  flex-shrink: 0;
`

const BookInfoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const BookName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  font-size: 20px;
  font-weight: 600;
  max-height: 40px;
  line-height: 20px;
  color: ${COLORS.PRIMARY};

  ${(props) => props.isLong && 'font-size: 16px;'}
`

const Types = styled.div`\
margin:${SPACING.XS} 0 ;
 
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.XS};
`

const TypeSmStyle = css`
  font-size: 10px;
  padding: 0 ${SPACING.SM};
`

const Type = styled.div`
  font-size: 11px;
  background-color: ${(props) => props.color ?? COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  border-radius: ${SPACING.MD};
  padding: 1px 6px;
  width: max-content;
  ${(props) => props.size === 'sm' && TypeSmStyle}
`

const BorrowCount = styled.span`
  font-size: 12px;
  color: ${(props) => props.color ?? COLORS.GRAY_DARK_1};
  font-weight: 400;
  font-family: ${FONTS.SARABUN};

  b {
    font-weight: 600;
  }
`

const BottomZone = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: end;

  > * {
    width: 100%;
  }
`

const BookCard = ({bookInfo}) => {
  const router = useRouter()

  return (
    <Card onClick={() => router.push(`/shelf/${bookInfo?.ISBN}`)}>
      <BookImage
        src={`${LOCAL_BASE_URL}bookShelf/bsImage/${bookInfo?.imageCover}`}
        alt={bookInfo?.bookName}
      />
      <BookInfoContainer>
        <BookName isLong={bookInfo?.bookName.length > 30}>
          {bookInfo?.bookName}
        </BookName>
        <Types>
          {bookInfo?.types?.map((type) => (
            <Type
              key={`bookType-${type?._id}`}
              color={
                TYPES_STYLE[type?.typeName?.replace(' ', '')?.toLowerCase()]
                  ?.color
              }
              size={bookInfo?.types.length > 3 ? 'sm' : ''}
            >
              {type?.typeName}
            </Type>
          ))}
        </Types>

        <BorrowCount>
          <span>การยืม</span> {bookInfo?.totalBorrow.toLocaleString('en-US')}{' '}
          ครั้ง
        </BorrowCount>

        <BorrowCount color={COLORS.PRIMARY}>
          <span>
            เหลือ <b>{bookInfo?.totalAvailable.toLocaleString('en-US')}</b> เล่ม
          </span>
        </BorrowCount>

        <BottomZone>
          {bookInfo?.totalAvailable > 0 && (
            <Button btnSize="sm">ยืมหนังสือ</Button>
          )}

          {bookInfo?.totalAvailable === 0 && (
            <Button btnSize="sm">ต่อคิว</Button>
          )}
        </BottomZone>
      </BookInfoContainer>
    </Card>
  )
}

export default BookCard
