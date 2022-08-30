import React from 'react'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import styled from 'styled-components'
import Head from 'next/head'
import {SPACING} from '../../styles/spacing'

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

const NotificationPage = () => {
  return (
    <>
      <Head>
        <title>Share my Book - การแจ้งเตือนทั้งหมด</title>
      </Head>
      <TitleWrapper>
        <Title>การแจ้งเตือนทั้งหมด</Title>
      </TitleWrapper>
    </>
  )
}

NotificationPage.Layout = ProfileLayout

export default NotificationPage
