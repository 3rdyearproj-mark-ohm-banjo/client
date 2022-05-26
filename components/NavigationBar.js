import React, {useRef, useState} from 'react'
import styled, {css} from 'styled-components'
import {COLORS} from '../styles/colors'
import Icon from './Icon'
import {ICONS, ICON_SIZE} from '../config/icon'
import {SPACING} from '../styles/spacing'
import {useRouter} from 'next/router'
import AuthModal from './AuthModal'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../api/request/userService'
import {clearUser} from '../redux/feature/UserSlice'
import {Hidden} from './Layout'
import {useOutsideAlerter} from '../hooks/useOutsideAlerter'

const NavigationBarStyled = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${COLORS.WHITE};
  height: 60px;
  box-shadow: 0 5px 30px ${COLORS.GRAY_LIGHT};
  z-index: 1000;
  padding: ${SPACING.MD};
`

const ContentWrapper = styled.ul`
  margin: 10px auto;
  max-width: 900px;
  display: flex;
  justify-content: space-between;

  @media (min-width: 450px) {
    margin: 0 auto;
  }
`

const ActiveStyled = css`
  color: ${COLORS.PRIMARY};
  font-weight: 650;
`

const MenuIcon = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.XS};
  font-size: 14px;
  transition: 0.2s;
  color: ${COLORS.GRAY_DARK};
  position: relative;
  ${(props) => props.isActive && ActiveStyled}

  &:hover {
    cursor: pointer;
    ${ActiveStyled}
  }
`

const MenuDropdown = styled.ul`
  position: absolute;
  background-color: ${COLORS.GRAY_LIGHT_1};
  padding: ${SPACING.SM};
  width: 220px;
  border-radius: ${SPACING.MD};
  box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.SM};
  right: 0;
`

const MenuItem = styled.li`
  padding: ${SPACING.SM} ${SPACING.MD};
  width: 100%;
  border-radius: ${SPACING.MD};
  transition: 0.2s;

  &:hover {
    background-color: ${COLORS.PURPLE_3};
    color: ${COLORS.WHITE};
  }
`

const NavigationBar = () => {
  const router = useRouter()
  const isAuth = useSelector((state) => state.user.isAuth)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const dispatch = useDispatch()
  const profileRef = useRef()
  useOutsideAlerter(setShowProfileMenu, profileRef,'mouseover')

  const logoutHandler = async () => {
    const getResult = async () => await logout()
    setShowProfileMenu(false)
    return getResult()
      .then(() => {
        dispatch(clearUser())
        if (router.pathname.includes('profile')) {
          router.push('/')
        }
      })
      .catch((res) => {
        if (res.response.status !== 200) {
          dispatch(clearUser())
          return router.push('/')
        }
      })
  }

  return (
    <>
      <AuthModal show={showAuthModal} setShow={setShowAuthModal} />
      <NavigationBarStyled>
        <ContentWrapper>
          <MenuIcon
            onClick={() => router.push('/')}
            isActive={router.pathname === '/'}
          >
            <Icon name={ICONS.faHome} size={ICON_SIZE.lg} />
            <Hidden breakPoint="450px">หน้าหลัก</Hidden>
          </MenuIcon>

          {isAuth ? (
            <>
              <MenuIcon
                onClick={() => router.push('/profile/donatebook')}
                isActive={router.pathname === '/profile/donatebook'}
              >
                <Icon name={ICONS.faHandHoldingHand} size={ICON_SIZE.lg} />
                <Hidden breakPoint="450px">บริจาคหนังสือ</Hidden>
              </MenuIcon>

              <MenuIcon>
                <Icon name={ICONS.faBell} size={ICON_SIZE.lg} />
                <Hidden breakPoint="450px">การแจ้งเตือน</Hidden>
              </MenuIcon>

              <MenuIcon
                isActive={router.pathname === '/profile'}
                ref={profileRef}
              >
                <Icon name={ICONS.faUser} size={ICON_SIZE.lg} />
                <Hidden breakPoint="450px">ข้อมูลของฉัน</Hidden>
                {showProfileMenu && (
                  <MenuDropdown>
                    <MenuItem
                      onClick={() => {
                        setShowProfileMenu(false)
                        router.push('/profile')
                      }}
                    >
                      ข้อมูลของฉัน
                    </MenuItem>
                    <MenuItem onClick={logoutHandler}>ออกจากระบบ</MenuItem>
                  </MenuDropdown>
                )}
              </MenuIcon>
            </>
          ) : (
            <MenuIcon onClick={() => setShowAuthModal(true)}>
              <Icon name={ICONS.faSignIn} size={ICON_SIZE.lg} />
              <Hidden breakPoint="450px">เข้าสู่ระบบ</Hidden>
            </MenuIcon>
          )}
        </ContentWrapper>
      </NavigationBarStyled>
    </>
  )
}

export default NavigationBar
