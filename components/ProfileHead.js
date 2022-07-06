import React from 'react'
import styled, {css} from 'styled-components'
import {FONTS} from '../styles/fonts'
import {COLORS} from '../styles/colors'
import {SPACING} from '../styles/spacing'
import {useSelector} from 'react-redux'
import Link from 'next/link'
import {useRouter} from 'next/router'
import BookWorm from '../public/static/images/bookworm.png'
import Image from 'next/image'

const UserProfile = styled.div`
  width: 100%;
  display: flex;
  gap: ${SPACING.MD};
  padding: ${SPACING.SM};
  border-radius: ${SPACING.MD};
`

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`

const UserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${FONTS.SARABUN};
  overflow: hidden;
`

const UserName = styled.h2`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 22px;
  font-weight: 800;
`

const NavActive = css`
  background-color: ${COLORS.PURPLE_2};
  color: ${COLORS.WHITE};
`

const NavMenu = styled.ul`
  display: flex;
  background-color: ${COLORS.GRAY_LIGHT_2};
  width: 100%;
  border-radius: ${SPACING.MD};
  gap: ${SPACING.LG};
  padding: ${SPACING.MD};
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: ${SPACING.SM};
  }

  &::-webkit-scrollbar {
    background-color: ${COLORS.GRAY_LIGHT};
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.GRAY_DARK};
    border-radius: 5px;

    &:hover {
      background: ${COLORS.GRAY_DARK_1};
    }
  }
`

const NavItem = styled.li`
  flex-shrink: 0;
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
        <Circle>
          <Image
            src={BookWorm.src}
            alt="bookworm icon"
            objectFit="contain"
            layout="fill"
          ></Image>
        </Circle>
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
        <Link href="/profile/bookrequest" passHref>
          <NavItem isActive={router.pathname === '/profile/bookrequest'}>
            หนังสือที่จะได้รับ
          </NavItem>
        </Link>
        <Link href="/profile/borrowing" passHref>
          <NavItem isActive={router.pathname === '/profile/borrowing'}>
            หนังสือที่กำลังยืม
          </NavItem>
        </Link>
        <Link href="/profile/forwarding" passHref>
          <NavItem isActive={router.pathname === '/profile/forwarding'}>
            หนังสือที่ต้องส่งต่อ
          </NavItem>
        </Link>
        <Link href="/profile/mydonation" passHref>
          <NavItem isActive={router.pathname === '/profile/mydonation'}>
            ประวัติการบริจาค
          </NavItem>
        </Link>
        <Link href="/profile/borrowhistory" passHref>
          <NavItem isActive={router.pathname === '/profile/borrowhistory'}>
            ประวัติการยืม
          </NavItem>
        </Link>
        <Link href="/profile/info" passHref>
          <NavItem isActive={router.pathname === '/profile/info'}>
            แก้ไขข้อมูล
          </NavItem>
        </Link>
      </NavMenu>
    </>
  )
}

export default ProfileHead
