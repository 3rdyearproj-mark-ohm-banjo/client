import Head from 'next/head'
import React from 'react'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import styled from 'styled-components'
import {SPACING} from '../../styles/spacing'
import {COLORS} from '../../styles/colors'

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

const SubTitle = styled.span`
  font-size: 14px;
  color: ${COLORS.GRAY_DARK_1};
`

const Forwarding = () => {
  return (
    <>
      <Head>
        <title>หนังสือที่ต้องส่งต่อ</title>
      </Head>
      <TitleWrapper>
        <Title>หนังสือที่ต้องส่งต่อ</Title>
      </TitleWrapper>
    </>
  )
}

Forwarding.Layout = ProfileLayout

export default Forwarding
