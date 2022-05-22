import React, {useState} from 'react'
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
  margin: 0 auto;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
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
  ${(props) => props.isActive && ActiveStyled}

  &:hover {
    cursor: pointer;
    ${ActiveStyled}
  }
`

const NavigationBar = () => {
  const router = useRouter()
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const logoutHandler = () => {
    logout()
    dispatch(clearUser())
    if (router.pathname.includes('profile')) {
      router.push('/')
    }
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
            <span>หน้าหลัก</span>
          </MenuIcon>

          {isAuth ? (
            <>
              <MenuIcon
                onClick={() => router.push('/profile/donatebook')}
                isActive={router.pathname === '/profile/donatebook'}
              >
                <Icon name={ICONS.faHandHoldingHand} size={ICON_SIZE.lg} />
                <span>บริจาคหนังสือ</span>
              </MenuIcon>

              <MenuIcon>
                <Icon name={ICONS.faBell} size={ICON_SIZE.lg} />
                <span>การแจ้งเตือน</span>
              </MenuIcon>

              <MenuIcon
                onClick={() => router.push('/profile')}
                isActive={router.pathname === '/profile'}
              >
                <Icon name={ICONS.faUser} size={ICON_SIZE.lg} />
                <span>ข้อมูลของฉัน</span>
              </MenuIcon>
              <MenuIcon onClick={logoutHandler}>
                <Icon name={ICONS.faSignOut} size={ICON_SIZE.lg} />
                <span>ออกจากระบบ</span>
              </MenuIcon>
            </>
          ) : (
            <MenuIcon onClick={() => setShowAuthModal(true)}>
              <Icon name={ICONS.faSignIn} size={ICON_SIZE.lg} />
              <span>เข้าสู่ระบบ</span>
            </MenuIcon>
          )}
        </ContentWrapper>
      </NavigationBarStyled>
    </>
  )
}

export default NavigationBar
