import React from 'react'
import Icon from './Icon'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import {COLORS} from '../styles/colors'
import {SPACING} from '../styles/spacing'

const ActiveStyled = css`
  cursor: pointer;
  transition: 0.3s;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.PRIMARY};
`

const DisabledStyled = css`
  color: ${COLORS.WHITE};
  background-color: ${COLORS.GRAY_LIGHT};
`

const mdSize = css`
  width: 40px;
  height: 40px;
`

const IconButtonStyled = styled.button`
  color: ${COLORS.PRIMARY};
  background-color: ${COLORS.GRAY_LIGHT_1};
  box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
  border: none;
  padding: ${SPACING.SM};
  ${(props) => props.borderRadius && `border-radius:${props.borderRadius};`}
  ${(props) => props.isActive && ActiveStyled}  
  ${(props) => props.isDisabled && DisabledStyled}  
  ${(props) => props.btnSize === 'md' && mdSize}  

  &:hover {
    ${(props) => !props.isDisabled && ActiveStyled}
  }
`

const IconButton = ({
  name,
  onClick,
  borderRadius,
  isActive,
  isDisabled,
  btnSize,
}) => {
  return (
    <IconButtonStyled
      onClick={() => !isDisabled && onClick()}
      borderRadius={borderRadius}
      isActive={isActive}
      isDisabled={isDisabled}
      btnSize={btnSize}
    >
      <Icon name={name} />
    </IconButtonStyled>
  )
}

IconButton.propTypes = {
  name: PropTypes.object,
  onClick: PropTypes.func,
  borderRadius: PropTypes.string,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  btnSize: PropTypes.oneOf(['sm', 'md', 'lg']),
}

IconButton.defaultProps = {
  btnSize: 'md',
}

export default IconButton
