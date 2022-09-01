import React, {useRef, useState} from 'react'
import styled, {css} from 'styled-components'
import {COLORS} from '../styles/colors'
import Icon from './Icon'
import {ICONS, ICON_SIZE} from '../config/icon'
import {SPACING} from '../styles/spacing'
import {useRouter} from 'next/router'
import AuthModal from './AuthModal'
import {useDispatch, useSelector} from 'react-redux'
import userService from '../api/request/userService'
import {clearUser} from '../redux/feature/UserSlice'
import {Hidden} from './Layout'
import {useOutsideAlerter} from '../hooks/useOutsideAlerter'
import toast from 'react-hot-toast'
import {FONTS} from '../styles/fonts'
import Link from 'next/link'
import Drawer from './Drawer'

const NavigationBarStyled = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${COLORS.WHITE};
  height: 60px;
  box-shadow: 0 5px 30px ${COLORS.GRAY_LIGHT};
  z-index: 1000;
  padding: 5px ${SPACING.MD};
`

const ContentWrapper = styled.ul`
  margin: auto;
  max-width: 900px;
  height: 100%;
  display: none;

  @media (min-width: 768px) {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const ActiveStyled = css`
  color: ${COLORS.PRIMARY};
  font-weight: 650;
`

const MenuIcon = styled.li`
  height: 45px;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.XS};
  justify-content: space-between;
  font-size: 14px;
  transition: 0.2s;
  color: ${COLORS.GRAY_DARK};
  position: relative;
  ${(props) => props.isActive && ActiveStyled}

  > * {
    user-select: none;
  }

  svg {
    height: 18px;
  }

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
    background-color: ${COLORS.GRAY_DARK_5};
    color: ${COLORS.WHITE};
  }
`

const NotificationDropdown = styled.ul`
  width: 97vw;
  padding: ${SPACING.SM};
  position: fixed;
  right: 0;
  background-color: ${COLORS.GRAY_LIGHT_1};
  border-radius: ${SPACING.MD};
  box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.SM};

  @media (min-width: 700px) {
    width: 350px;
    position: absolute;
    right: -50%;
  }
`

const NotificationItem = styled.li`
  padding: ${SPACING.SM};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.XS};
  font-family: ${FONTS.SARABUN};
  color: ${COLORS.GRAY_DARK};
  border: 1px solid ${COLORS.GRAY_LIGHT};
  border-width: 0 0 1px;
  transition: 0.2s;

  > div > svg {
    margin-right: ${SPACING.SM};
  }

  &:last-of-type {
    border: 0;
  }

  &:hover {
    color: ${COLORS.GRAY_DARK_5};
  }
`

const ViewMoreNotification = styled.div`
  font-weight: 600;
  color: ${COLORS.PURPLE_1};
`

const ViewAllNotification = styled.div`
  text-align: center;
  font-weight: 600;
  color: ${COLORS.GRAY_DARK_5};

  &:hover {
    text-decoration: underline;
  }
`

const NotiIconControl = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const DrawerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const UserName = styled.div`
  font-size: 16px;
`

const NavigationBar = () => {
  const router = useRouter()
  const isAuth = useSelector((state) => state.user.isAuth)
  const userName = useSelector((state) => state.user.user.username)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotificationMenu, setShowNotificationMenu] = useState(false)
  const dispatch = useDispatch()
  const profileRef = useRef()
  useOutsideAlerter(setShowProfileMenu, profileRef, 'mouseover')
  const notificationRef = useRef()
  const notificationIconRef = useRef()
  const menuList = [{icon: ICONS.faHome, text: 'หน้าแรก', link: '/'}]

  const notificationHandler = (bool, event) => {
    if (!isAuth) {
      return
    }

    if (
      showNotificationMenu &&
      notificationIconRef?.current?.contains(event.target)
    ) {
      return setShowNotificationMenu(false)
    }

    setShowNotificationMenu(bool)
  }

  useOutsideAlerter(notificationHandler, notificationRef)

  const logoutHandler = async () => {
    const getResult = async () => await userService.logout()
    setShowProfileMenu(false)
    return getResult()
      .then(() => {
        dispatch(clearUser())
        toast.success('ออกจากระบบสำเร็จ')
        if (router.pathname.includes('profile')) {
          router.push('/')
        }
      })
      .catch(() => {
        toast.success('ออกจากระบบสำเร็จ')
        dispatch(clearUser())
        return router.push('/')
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
            หน้าหลัก
          </MenuIcon>

          {isAuth ? (
            <>
              <MenuIcon
                onClick={() => router.push('/profile/donatebook')}
                isActive={router.pathname === '/profile/donatebook'}
              >
                <Icon name={ICONS.faHandHoldingHand} size={ICON_SIZE.lg} />
                บริจาคหนังสือ
              </MenuIcon>

              <MenuIcon ref={notificationRef} isActive={showNotificationMenu}>
                <NotiIconControl ref={notificationIconRef}>
                  <Icon name={ICONS.faBell} size={ICON_SIZE.lg} />
                  การแจ้งเตือน
                </NotiIconControl>
                {showNotificationMenu && (
                  <NotificationDropdown>
                    <NotificationItem>
                      <div>
                        <Icon name={ICONS.faHandHoldingHand} />
                        <span>
                          มีคำขอยืมหนังสือ ติวเข้ม PAT1 พิชิตข้อสอบเต็ม 100%
                          ภายใน 5 วัน ที่คุณถืออยู่ จากคุณ thanasit
                        </span>
                      </div>
                      <ViewMoreNotification>ดูรายละเอียด</ViewMoreNotification>
                    </NotificationItem>
                    <NotificationItem>
                      <div>
                        <Icon name={ICONS.faBook} />
                        <span>
                          หนังสือ ติวเข้ม PAT1 พิชิตข้อสอบเต็ม 100% ภายใน 5 วัน
                          ที่คุณได้ทำการยืมถูกจัดส่งแล้ว
                        </span>
                      </div>
                      <ViewMoreNotification>ดูรายละเอียด</ViewMoreNotification>
                    </NotificationItem>
                    <NotificationItem>
                      <div>
                        <Icon name={ICONS.faBook} />
                        <span>
                          หนังสือ ติวเข้ม PAT1 พิชิตข้อสอบเต็ม 100% ภายใน 5 วัน
                          ที่คุณได้ทำการยืมถูกจัดส่งแล้ว
                        </span>
                      </div>
                      <ViewMoreNotification>ดูรายละเอียด</ViewMoreNotification>
                    </NotificationItem>

                    <NotificationItem>
                      <Link href="/profile/notification" passHref>
                        <ViewAllNotification>
                          <Icon name={ICONS.faBell} />
                          ดูการแจ้งเตือนทั้งหมด
                        </ViewAllNotification>
                      </Link>
                    </NotificationItem>
                  </NotificationDropdown>
                )}
              </MenuIcon>

              <MenuIcon
                isActive={router.pathname === '/profile'}
                ref={profileRef}
              >
                <Icon name={ICONS.faUser} size={ICON_SIZE.lg} />
                <UserName>{userName}</UserName>
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

        <DrawerWrapper>
          <Drawer itemList={menuList}></Drawer>
        </DrawerWrapper>
      </NavigationBarStyled>
    </>
  )
}

export default NavigationBar
