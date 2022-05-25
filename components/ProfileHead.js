import React from 'react'
import {ICONS} from '../config/icon'
import styled, {css} from 'styled-components'
import Icon from './Icon'
import {FONTS} from '../styles/fonts'
import {COLORS} from '../styles/colors'
import {SPACING} from '../styles/spacing'
import {useSelector} from 'react-redux'
import Link from 'next/link'
import {useRouter} from 'next/router'

const UserProfile = styled.div`
  padding: ${SPACING.SM};
  border-radius: ${SPACING.MD};
  display: flex;
  gap: ${SPACING.MD};
  width: 100%;
`

const Circle = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${COLORS.PRIMARY};
  border-radius: 50%;
`

const UserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${FONTS.SARABUN};
`

const UserName = styled.h2`
  font-size: 22px;
  font-weight: 800;
`

const NavActive = css`
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
`

const NavMenu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  background-color: ${COLORS.GRAY_LIGHT_2};
  width: 100%;
  border-radius: ${SPACING.MD};
  gap: ${SPACING.LG};
  padding: ${SPACING.MD};
`

const NavItem = styled.li`
  ${(props) => props.isActive && NavActive}
  padding: ${SPACING.SM} ${SPACING.LG};
  border-radius: ${SPACING.MD};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    ${NavActive}
  }
`

const ProfileHead = () => {
  const user = useSelector((state) => state.user.user)
  const router = useRouter()

  return (
    <>
      <UserProfile>
        <Circle></Circle>
        <UserNameContainer>
          <span>สวัสดี, คุณ</span>
          <UserName>{user?.username}</UserName>
        </UserNameContainer>
      </UserProfile>
      <NavMenu>
        <Link href="/profile" passHref>
          <NavItem isActive={router.pathname === '/profile'}>
            ข้อมูลโดยรวม
          </NavItem>
        </Link>
        <NavItem isActive={router.pathname === '/profile/myborrowing'}>
          หนังสือที่กำลังยืมอยู่
        </NavItem>
        <Link href="/profile/mydonation" passHref>
          <NavItem isActive={router.pathname === '/profile/mydonation'}>
            หนังสือที่บริจาค
          </NavItem>
        </Link>
        <NavItem isActive={router.pathname === '/profile/borrowhistory'}>
          ประวัติการยืม
        </NavItem>
        <NavItem isActive={router.pathname === '/profile/setting'}>
          ตั้งค่าบัญชี
        </NavItem>
      </NavMenu>
    </>
  )
}

export default ProfileHead
