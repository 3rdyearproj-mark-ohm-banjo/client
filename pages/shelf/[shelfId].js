import React from 'react'
import {Button, Icon, Layout} from '../../components'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import {BOOK_SHELF} from '../../config/bookshelf-mockup'
import {TYPES} from '../../config/types-mockup'
import {TYPES_STYLE} from '../../config/types-styles'
import {PUBLISHERS} from '../../config/publisher-mockup'
import {ICONS} from '../../config/icon'
import {css} from 'styled-components'

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  padding: 16px;
`

const BookContainer = styled.section`
  width: 100%;
  background-color: ${COLORS.WHITE};
  border-radius: ${SPACING.MD};
  max-width: 1050px;
  box-shadow: 0 5px 20px ${COLORS.GRAY_DARK};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: ${SPACING.MD};
`

const BookImage = styled.img`
  border-radius: 16px;
  height: 500px;
  width: auto;
  flex-shrink: 0;
  align-self: center;
`

const BookName = styled.h1`
  font-size: 40px;
  font-weight: 650;
  margin-top: ${SPACING.LG};
  color: ${COLORS.PRIMARYc};
`

const ISBN = styled.h4`
  color: ${COLORS.GRAY_DARK_1};
`

const TypeContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.SM};
`

const smHead = css`
  font-size: 14px;
  width: 50%;
  font-weight: 400;
`

const HeadText = styled.h5`
  margin-bottom: ${SPACING.XS};
  font-weight: 600;
  color: ${(props) => props.color ?? COLORS.PRIMARY};
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

  > svg {
    margin-right: ${SPACING.SM};
  }
`

const NumberGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: ${SPACING.MD} 0;
`

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: calc(33% - 8px);
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
  line-height: 1em;
  padding: ${SPACING.MD} 0;
  font-weight: 600;
`

const Unit = styled.span`
  color: ${COLORS.GRAY_LIGHT_1};
  font-size: 12px;
  margin-top: -${SPACING.SM};
`

const SectionContent = styled.section`
  margin: ${SPACING.SM} 0;
  ${(props) => props.display && `display: ${props.display};`}
  ${(props) => props.flexDirection && `flex-direction: ${props.flexDirection};`}
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent};`}
  border: ${(props) => props.border ?? 'none'};
  padding: ${(props) => props.padding ?? SPACING.MD};
  border-radius: ${SPACING.MD};
`

const ButtonWrapper = styled.section`
  margin: ${SPACING.MD} 0;
`
const BookShelfPage = () => {
  return (
    <Body>
      <BookContainer>
        <BookImage src="https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg" />
        <section>
          <BookName>{BOOK_SHELF.name}</BookName>
          <ISBN>{BOOK_SHELF.isbn}</ISBN>
          <SectionContent
            border={`1px solid ${COLORS.SECONDARY}`}
            padding={SPACING.SM}
          >
            <HeadText>
              <Icon name={ICONS.faPenNib} /> ผู้แต่งหนังสือ: {BOOK_SHELF.author}
            </HeadText>
          </SectionContent>

          <NumberGroup>
            <ContentBox>
              ยอดการยืม
              <NumberBox>
                {BOOK_SHELF.totalBorrow.toLocaleString('us')}
                <Unit>เล่ม</Unit>
              </NumberBox>
            </ContentBox>

            <ContentBox>
              จำนวนที่ยืมได้
              <NumberBox>
                {BOOK_SHELF.totalAvailable.toLocaleString('us')}
                <Unit>เล่ม</Unit>
              </NumberBox>
            </ContentBox>

            <ContentBox>
              จำนวนในระบบ
              <NumberBox>
                {BOOK_SHELF.totalQuantity.toLocaleString('us')}

                <Unit>เล่ม</Unit>
              </NumberBox>
            </ContentBox>
          </NumberGroup>
          <SectionContent display="flex">
            <HeadText size="sm" color={COLORS.BLACK}>
              ปีแรกที่พิมพ์หนังสือ : {BOOK_SHELF.firstYearOfPublication}
            </HeadText>

            <HeadText size="sm" color={COLORS.BLACK}>
              สำนักพิมพ์ :{' '}
              {PUBLISHERS?.find((pub) => pub.id === BOOK_SHELF.publisher)?.name}
            </HeadText>
          </SectionContent>

          <HeadText> ประเภทของหนังสือ</HeadText>
          <TypeContainer>
            {BOOK_SHELF?.types?.map((type) => (
              <TypeBox
                key={`bookType-${type}`}
                bgColor={
                  TYPES_STYLE[
                    TYPES.find((typeName) => typeName.id === type)?.name
                  ]?.color
                }
              >
                <Icon
                  name={
                    TYPES_STYLE[
                      TYPES.find((typeName) => typeName.id === type)?.name
                    ]?.icon
                  }
                />

                {TYPES.find((typeName) => typeName.id === type)?.name}
              </TypeBox>
            ))}
          </TypeContainer>
        </section>

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
      </BookContainer>
    </Body>
  )
}

export default BookShelfPage
