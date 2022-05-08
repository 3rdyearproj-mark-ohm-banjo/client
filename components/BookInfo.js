import React from 'react'
import {Button, Icon, BackgroundContainer} from './'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {ICONS} from '../config/icon'
import {SPACING} from '../styles/spacing'
import {COLORS} from '../styles/colors'
import {TYPES} from '../config/types-mockup'
import {PUBLISHERS} from '../config/publisher-mockup'
import {TYPES_STYLE} from '../config/types-styles'
import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectFlip} from 'swiper'
import 'swiper/css/effect-flip'
import {BASE_URL} from '../config/env'

const BookContainer = styled.section`
  width: 100%;
  background-color: ${COLORS.WHITE};
  border-radius: ${SPACING.MD};
  max-width: 1050px;
  box-shadow: 0 5px 20px ${COLORS.GRAY_DARK};
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding: ${SPACING.LG};

  @media (min-width: 768px) {
    flex-direction: row;
    gap: ${SPACING.LG};

    > section {
      flex-grow: 1;
    }
  }
`

const BookInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
`

const BookImageContainer = styled.div`
  max-height: 500px;
  width: 300px;
  flex-shrink: 0;
  align-self: center;
  transition: 0.1s;
  @media (min-width: 800px) {
    width: 320px;
  }
`

const BookImage = styled.img`
  border-radius: 16px;
  max-height: 500px;
`

const BookName = styled.h1`
  font-size: 40px;
  font-weight: 650;
  margin-top: ${SPACING.LG};
  color: ${COLORS.PRIMARY};
  line-height: 1.1em;
`

const ISBN = styled.h4`
  color: ${COLORS.GRAY_DARK_1};
`

const TypeContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.SM};
`

const HeadText = styled.h4`
  margin-bottom: ${SPACING.XS};
  font-weight: 600;
  color: ${COLORS.PRIMARY};
  word-break: break-all;

  ${(props) => props.size === 'sm' && smHead}
`

const TypeBox = styled.div`
  background-color: ${(props) => props.bgColor ?? COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  padding: ${SPACING.SM};
  width: max-content;
  border-radius: ${SPACING.SM};
  user-select: none;
  transition: 0.1s;
  align-self: start;

  > svg {
    margin-right: ${SPACING.SM};
  }

  &:hover {
    padding: ${SPACING.MD};
  }
`

const NumberGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.MD};
  margin: ${SPACING.MD} 0;
`

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: calc(33% - 8px);
  align-self: stretch;
  justify-content: space-between;
`

const NumberBox = styled.div`
  width: 100%;
  height: 90px;
  background: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${SPACING.SM};
  font-size: 32px;
  flex-direction: column;
  padding: ${SPACING.MD} 0;
  font-weight: 600;
`

const Unit = styled.span`
  color: ${COLORS.GRAY_LIGHT_1};
  font-size: 12px;
  margin-top: -${SPACING.SM};
`

const SectionContent = styled.section`
  ${(props) => props.margin && `margin: ${props.margin};`}
  ${(props) => props.display && `display: ${props.display};`}
  ${(props) => props.flexDirection && `flex-direction: ${props.flexDirection};`}
  ${(props) => props.gap && `gap: ${props.gap};`}
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent};`}
  border: ${(props) => props.border ?? 'none'};
  padding: ${(props) => props.padding ?? SPACING.MD};
  border-radius: ${SPACING.MD};
`

const ButtonWrapper = styled.section`
  display: flex;
  margin-top: ${SPACING.MD};
  flex-grow: 1;

  > button {
    align-self: end;
  }
`

const RoundBoxContainer = styled.div`
  display: flex;
  gap: ${SPACING.MD};
  flex-wrap: wrap;
  margin: ${SPACING.SM} 0;
`

const RoundContent = styled.div`
  padding: ${SPACING.SM} 0;
  border: 1px solid ${COLORS.GRAY_DARK_4};
  border-radius: ${SPACING.XS};

  > span {
    border-right: 1px solid ${COLORS.GRAY_DARK_4};
    padding: ${SPACING.SM};

    &:not(:first-of-type) {
      border-right: none;
    }
  }
`

const BookInfo = ({bookInfo}) => {
  return (
    <>
      <BookContainer>
        <BookImageContainer>
          <Swiper
            effect={'flip'}
            grabCursor={true}
            modules={[EffectFlip]}
            className="mySwiper"
            loop={true}
          >
            <SwiperSlide>
              <BookImage
                src={`${BASE_URL}bookShelf/bsImage/${bookInfo?.imageCover}`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <BookImage
                src={`${BASE_URL}bookShelf/bsImage/${bookInfo?.imageCover}`}
              />
            </SwiperSlide>
          </Swiper>
        </BookImageContainer>
        <BookInfoContainer>
          <BookName>{bookInfo?.bookName}</BookName>
          <ISBN>{bookInfo?.ISBN}</ISBN>
          <SectionContent padding={`${SPACING.SM} 0`}>
            <HeadText>
              <Icon name={ICONS.faPenNib} /> ผู้แต่งหนังสือ: {bookInfo.author}
            </HeadText>
          </SectionContent>

          <NumberGroup>
            <ContentBox>
              ยอดการยืม
              <NumberBox>
                {bookInfo?.totalBorrow?.toLocaleString('en-US')}
                <Unit>ครั้ง</Unit>
              </NumberBox>
            </ContentBox>

            <ContentBox>
              จำนวนที่ว่างให้ยืม
              <NumberBox>
                {bookInfo?.totalAvailable?.toLocaleString('en-US')}
                <Unit>เล่ม</Unit>
              </NumberBox>
            </ContentBox>
          </NumberGroup>
          <RoundBoxContainer>
            <RoundContent>
              <span>ปีแรกที่พิมพ์</span>
              <span>{bookInfo?.firstYearOfPublication}</span>
            </RoundContent>
            <RoundContent>
              <span>สำนักพิมพ์</span>
              <span>{bookInfo?.publisherId?.publisherName}</span>
            </RoundContent>
          </RoundBoxContainer>

          <HeadText> ประเภทของหนังสือ</HeadText>
          <TypeContainer>
            {bookInfo?.types?.map((type) => (
              <TypeBox
                key={`bookType-${type._id}`}
                bgColor={
                  TYPES_STYLE[type?.typeName?.replace(' ', '')?.toLowerCase()]
                    ?.color
                }
              >
                <Icon
                  name={
                    TYPES_STYLE[type?.typeName?.replace(' ', '')?.toLowerCase()]
                      ?.icon ?? TYPES_STYLE['default'].icon
                  }
                />

                {type?.typeName}
              </TypeBox>
            ))}
          </TypeContainer>

          <ButtonWrapper>
            <Button
              btnType="whiteBorder"
              isDisabled
              withIcon
              fullWidth
              iconName={ICONS.faBook}
            >
              คุณมีหนังสือนี้แล้ว
            </Button>

            {/* <Button withIcon fullWidth iconName={ICONS.faBook}>
        ยืมหนังสือ
      </Button> */}
          </ButtonWrapper>
        </BookInfoContainer>
      </BookContainer>
    </>
  )
}

BookInfo.propTypes = {
  bookInfo: PropTypes.object,
}

export default BookInfo
