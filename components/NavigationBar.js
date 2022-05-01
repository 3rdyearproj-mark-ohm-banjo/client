import React from 'react'
import styled from 'styled-components'
import {COLORS} from '../styles/colors'
import {FONTS, FONT_SIZE} from '../styles/fonts'
import Icon from './Icon'
import {ICONS} from '../config/icon'

const NavigationBarStyled = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${COLORS.WHITE};
  height: 50px;
  box-shadow: 0 5px 30px ${COLORS.GRAY_LIGHT};
  z-index: 1000;
`

const NavigationBar = () => {
  return (
    <NavigationBarStyled>
      <Icon name={ICONS.faBars} />
    </NavigationBarStyled>
  )
}

export default NavigationBar
