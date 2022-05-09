import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import {BASE_URL} from '../config/env'
import {COLORS} from '../styles/colors'
import {SPACING} from '../styles/spacing'
import Button from './Button'

const CardLayout = styled.div`
  width: 200px;
  height: 450px;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.SM};
`

const ImageMock = styled.div`
  max-height: 250px;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`

const BookName = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.1em;
  min-height: 2.5em;
`

const DonationDate = styled.span`
  font-size: 13px;
`

const BookOwnerCard = ({bookInfo, donationDate}) => {
  return (
    <CardLayout>
      <ImageMock>
        {bookInfo?.imageCover && (
          <Image
            src={`${BASE_URL}bookShelf/bsImage/${bookInfo?.imageCover}`}
            alt={bookInfo?.BookName}
            layout="fill"
            objectFit="contain"
          ></Image>
        )}
      </ImageMock>
      <BookName>{bookInfo?.bookName}</BookName>
      <DonationDate>บริจาควันที่ 12 ส.ค. 65</DonationDate>
      <Button btnSize="sm" btnType="secondary">
        แก้ไขข้อมูล
      </Button>
      <Button btnSize="sm" btnType="orangeGradient">
        ยกเลิกการบริจาค
      </Button>
    </CardLayout>
  )
}

export default BookOwnerCard
