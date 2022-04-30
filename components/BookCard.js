import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import {TYPES} from '../config/types-mockup'
import {TYPES_STYLE} from '../config/types-styles'
import {COLORS} from '../styles/colors'
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

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
  }

  @media (min-width: 680px) {
    max-width: 320px;
  }
`

const BookImage = styled.img`
  width: 120px;
  height: 160px;
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
`

const Types = styled.div`\
margin:${SPACING.XS} 0 ;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.XS};
`

const Type = styled.div`
  background-color: ${(props) => props.color ?? COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  border-radius: ${SPACING.MD};
  padding: 1px 6px;
  width: max-content;
`

const Author = styled.span`
  font-size: 14px;
  color: ${COLORS.BLACK_2};
`

const BorrowCount = styled.div`
  font-size: 13px;
  color: ${COLORS.GRAY_DARK_1};
  font-weight: 400;
`

const ButtonWrapper = styled.div`
  flex-grow: 1;
  display: flex;

  > button {
    align-self: end;
  }
`

const BookCard = ({bookInfo}) => {
  const router = useRouter()

  return (
    <Card onClick={() => router.push(`shelf/${bookInfo?.id}`)}>
      <BookImage src={bookInfo?.image} alt={bookInfo?.name} />
      <BookInfoContainer>
        <BookName>{bookInfo?.name}</BookName>
        <Types>
          {bookInfo?.types?.map((type) => (
            <Type
              key={`bookType-${type}`}
              color={
                TYPES_STYLE[
                  TYPES.find((typeName) => typeName.id === type)?.name
                ]?.color
              }
            >
              {TYPES.find((typeName) => typeName.id === type)?.name}
            </Type>
          ))}
        </Types>
        <Author>โดย {bookInfo?.author}</Author>

        <BorrowCount>
          <span>การยืม</span> {bookInfo?.totalBorrow.toLocaleString('en-US')}{' '}
          ครั้ง
        </BorrowCount>

        <ButtonWrapper>
          <Button btnSize="sm" fullWidth>
            ยืมหนังสือ
          </Button>
        </ButtonWrapper>
      </BookInfoContainer>
    </Card>
  )
}

export default BookCard
