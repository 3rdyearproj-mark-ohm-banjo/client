import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import {SPACING} from '../styles/spacing'
import Button from './Button'
import PropTypes from 'prop-types'

const CardLayout = styled.div`
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.SM};
`

const ImageMock = styled.div`
  max-height: 200px;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`

const BookName = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.1em;
  min-height: 2.5em;
`

const DonationDate = styled.span`
  font-size: 12px;
`

const BookOwnerCard = ({
  bookId,
  canCancel,
  bookInfo,
  donationTime,
  onCancel,
}) => {
  return (
    <CardLayout>
      <ImageMock>
        {bookInfo?.imageCover && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/bookShelf/bsImage/${bookInfo?.imageCover}`}
            alt={bookInfo?.bookName}
            layout="fill"
            objectFit="contain"
          ></Image>
        )}
      </ImageMock>
      <BookName>{bookInfo?.bookName}</BookName>
      <DonationDate>บริจาควันที่ {donationTime}</DonationDate>
      {canCancel ? (
        <Button
          btnSize="sm"
          btnType="orangeGradient"
          onClick={() => onCancel(true, {bookId, bookName: bookInfo?.bookName})}
        >
          ยกเลิกการบริจาค
        </Button>
      ) : (
        <Button btnSize="sm" btnType="whiteBorder" isDisabled>
          หนังสือเล่มนี้ถูกส่งต่อแล้ว
        </Button>
      )}
    </CardLayout>
  )
}

BookOwnerCard.propTypes = {
  bookInfo: PropTypes.object,
  donationDate: PropTypes.string,
}

export default BookOwnerCard
