import Head from 'next/head'
import React from 'react'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import styled, {css} from 'styled-components'
import {SPACING} from '../../styles/spacing'
import {COLORS} from '../../styles/colors'
import {useState} from 'react'
import BookForwardingCard from '../../components/cards/BookForwardingCard'

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 12px 0;
  padding: ${SPACING.MD} ${SPACING.MD} 0;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`

const ActiveBtnStyle = css`
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.GRAY_LIGHT};
`

const SwitchButtonWrapper = styled.div`
  display: flex;
  gap: ${SPACING.SM};
  width: max-content;
  padding: ${SPACING.SM};
  background-color: ${COLORS.GRAY_LIGHT};
  border-radius: ${SPACING.SM};
`

const SwitchButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: ${SPACING.XS} ${SPACING.SM};
  font-weight: 600;
  border-radius: ${SPACING.SM};
  transition: 0.2s;

  ${(props) => props.isActive && ActiveBtnStyle}

  &:hover {
    ${ActiveBtnStyle}
  }
`

const BookWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.LG};
  padding: ${SPACING.MD};
`

const Forwarding = () => {
  const [currentView, setCurrentView] = useState('all')

  return (
    <>
      <Head>
        <title>หนังสือที่ต้องส่งต่อ</title>
      </Head>
      <TitleWrapper>
        <Title>หนังสือที่ต้องส่งต่อ</Title>

        <SwitchButtonWrapper>
          <SwitchButton
            isActive={currentView === 'all' ? true : false}
            onClick={() => setCurrentView('all')}
          >
            หนังสือทั้งหมด
          </SwitchButton>
          <SwitchButton
            isActive={currentView === 'sent' ? true : false}
            onClick={() => setCurrentView('sent')}
          >
            ส่งเรียบร้อยแล้ว
          </SwitchButton>
        </SwitchButtonWrapper>
      </TitleWrapper>
      <BookWrapper>
        <BookForwardingCard />
        <BookForwardingCard />
        <BookForwardingCard />
      </BookWrapper>
    </>
  )
}

Forwarding.Layout = ProfileLayout

export default Forwarding
