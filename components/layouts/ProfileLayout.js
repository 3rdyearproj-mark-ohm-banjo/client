import React from 'react'
import BackgroundContainer from '../BackgroundContainer'
import UserLayout from './UserLayout'
import Background from '../../public/static/images/background-default.png'
import ProfileHead from '../ProfileHead'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import {ContentWrapper} from '../Layout'

const ProfileWrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${SPACING.MD};
  background-color: ${COLORS.GRAY_LIGHT_3};
  border-radius: ${SPACING.MD};
  box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
  gap: ${SPACING['3X']};
`
const ProfileHeadWrapper = styled.section`
  display: flex;
  max-width: 200px;
  width: 100%;
  flex-direction: column;
  flex-shrink: 0;
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
        <ProfileWrapper>
          <ProfileHeadWrapper>
            <ProfileHead />
          </ProfileHeadWrapper>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </ProfileWrapper>
      </BackgroundContainer>
    </UserLayout>
  )
}

export default ProfileLayout
