import React from 'react'
import styled, {css} from 'styled-components'
import {COLORS} from '../styles/colors'
import Icon from './Icon'
import {ICONS, ICON_SIZE} from '../config/icon'
import {SPACING} from '../styles/spacing'
import {useRouter} from 'next/router'

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

  return (
    <NavigationBarStyled>
      <ContentWrapper>
        <MenuIcon
          onClick={() => router.push('/')}
          isActive={router.pathname === '/'}
        >
          <Icon name={ICONS.faHome} size={ICON_SIZE.lg} />
          <span>หน้าหลัก</span>
        </MenuIcon>

        <MenuIcon
          onClick={() => router.push('/donatebook')}
          isActive={router.pathname === '/donatebook'}
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
      </ContentWrapper>
    </NavigationBarStyled>
  )
}

export default NavigationBar
