import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {COLORS} from '../styles/colors'
import {SPACING} from '../styles/spacing'

const DividerStyled = styled.div`
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    ${(props) => props.lineColor ?? COLORS.GRAY_DARK} 0,
    ${(props) => props.lineColor ?? COLORS.GRAY_DARK}
      ${(props) => props.lineLength ?? SPACING.SM},
    transparent ${(props) => props.lineLength ?? SPACING.SM},
    transparent ${(props) => props.spacing ?? SPACING.MD}
  );
  ${(props) => props.lineMargin && `margin: ${props.lineMargin};`}
`

const Divider = (props) => {
  return <DividerStyled {...props}></DividerStyled>
}

Divider.propTypes = {
  lineColor: PropTypes.string,
  lineLength: PropTypes.string,
  spacing: PropTypes.string,
  lineMargin: PropTypes.string,
}

export default Divider
