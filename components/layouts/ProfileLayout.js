import React from 'react'
import BackgroundContainer from '../BackgroundContainer'
import {ContentWrapper} from '../Layout'
import UserLayout from './UserLayout'
import Background from '../../public/static/images/background-default.png'
import ProfileHead from '../ProfileHead'

const ProfileLayout = ({children}) => {
  return (
    <UserLayout>
      <BackgroundContainer link={Background.src}>
        <ContentWrapper>
          <ProfileHead />
          {children}
        </ContentWrapper>
      </BackgroundContainer>
    </UserLayout>
  )
}

export default ProfileLayout
