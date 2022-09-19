import React from 'react'
import BackgroundContainer from '../BackgroundContainer'
import UserLayout from './UserLayout'
import Background from '../../public/static/images/background-default.png'
import ProfileHead from '../ProfileHead'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'

const ProfileLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING['2X']};
  max-width: 1440px;
  width: 100%;
  margin-top: 30px;
  padding: ${SPACING.MD};

  @media (min-width: 960px) {
    flex-direction: row;
  }
`

const ProfileWrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${SPACING.MD};
  background-color: ${COLORS.GRAY_LIGHT_3};
  border-radius: ${SPACING.MD};
  box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
  gap: ${SPACING['3X']};
`

const ProfileHeadWrapper = styled.div`
  @media (min-width: 960px) {
    display: flex;
    position: relative;
    max-width: 250px;
    width: 100%;
  }
`

const ChildrenWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ProfileLayout = ({children}) => {
  return (
    <UserLayout>
      <BackgroundContainer link={Background.src}>
        <ProfileLayoutWrapper>
          <ProfileHeadWrapper>
            <ProfileHead />
          </ProfileHeadWrapper>
          <ProfileWrapper>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </ProfileWrapper>
        </ProfileLayoutWrapper>
      </BackgroundContainer>
    </UserLayout>
  )
}

export default ProfileLayout
