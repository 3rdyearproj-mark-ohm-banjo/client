import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {SPACING} from '../styles/spacing'

const LayoutStyled = styled.section`
  ${(props) => props.display && `display: ${props.display};`}
  ${(props) => props.flexDirection && `flex-direction: ${props.flexDirection};`}
  ${(props) => props.alignItems && `align-items: ${props.alignItems};`}
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent};`}
  padding: ${(props) => props.padding ?? SPACING.LG};
  margin: ${(props) => props.margin ?? '0'};
  ${(props) => props.bgColor && `background-color: ${props.bgColor};`}
  ${(props) => props.textColor && `color: ${props.textColor};`}
  ${(props) => props.textAlign && `text-align: ${props.textAlign};`}
  ${(props) => props.boxShadow && `box-shadow: ${props.boxShadow};`}
   max-width: ${(props) => props.maxWidth ?? '1050px'};
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius};`}
`

const Layout = ({
  display,
  flexDirection,
  alignItems,
  justifyContent,
  padding,
  margin,
  bgColor,
  textColor,
  textAlign,
  boxShadow,
  children,
  maxWidth,
  borderRadius,
}) => {
  return (
    <LayoutStyled
      display={display}
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      padding={padding}
      margin={margin}
      bgColor={bgColor}
      textColor={textColor}
      textAlign={textAlign}
      boxShadow={boxShadow}
      maxWidth={maxWidth}
      borderRadius={borderRadius}
    >
      {children}
    </LayoutStyled>
  )
}

Layout.propTypes = {
  display: PropTypes.string,
  flexDirection: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  textAlign: PropTypes.string,
  boxShadow: PropTypes.string,
  children: PropTypes.node,
  borderRadius: PropTypes.string,
}

export default Layout
